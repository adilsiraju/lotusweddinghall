
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Package, MenuCategory, MenuItem } from '@/types/database';

interface UsePackagesOptions {
  includeInactive?: boolean;
  withFullDetails?: boolean;
}

export const usePackages = (options?: UsePackagesOptions) => {
  const { includeInactive = false, withFullDetails = true } = options || {};
  
  return useQuery({
    queryKey: ['packages', includeInactive, withFullDetails],
    queryFn: async () => {
      // First fetch packages
      let query = supabase.from('packages')
        .select('*');
      
      if (!includeInactive) {
        query = query.eq('active', true);
      }

      // Order by order_index to respect custom ordering
      query = query.order('order_index');

      const { data: packagesData, error: packagesError } = await query;
      if (packagesError) throw packagesError;
      
      const packages = packagesData as Package[];
      
      // If full details aren't needed, return just the packages
      if (!withFullDetails) return packages;

      // For each package, fetch its categories and items
      const packagesWithDetails = await Promise.all(packages.map(async (pkg) => {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('menu_categories')
          .select('*')
          .eq('package_id', pkg.id)
          .order('order_index');
          
        if (categoriesError) throw categoriesError;
        const categories = categoriesData as MenuCategory[];
        
        // For each category, fetch its items
        const categoriesWithItems = await Promise.all(categories.map(async (category) => {
          const { data: itemsData, error: itemsError } = await supabase
            .from('menu_items')
            .select('*')
            .eq('category_id', category.id)
            .order('order_index');
            
          if (itemsError) throw itemsError;
          const items = itemsData as MenuItem[];
          
          // Build hierarchical structure for menu items
          const itemMap = new Map<string, MenuItem>();
          const rootItems: MenuItem[] = [];
          
          items.forEach(item => {
            itemMap.set(item.id, { ...item, children: [] });
          });
          
          items.forEach(item => {
            const mappedItem = itemMap.get(item.id)!;
            
            if (item.parent_item_id && itemMap.has(item.parent_item_id)) {
              const parent = itemMap.get(item.parent_item_id)!;
              parent.children!.push(mappedItem);
            } else {
              rootItems.push(mappedItem);
            }
          });
          
          return { ...category, items: rootItems };
        }));
        
        return { ...pkg, categories: categoriesWithItems };
      }));
      
      return packagesWithDetails;
    }
  });
};
