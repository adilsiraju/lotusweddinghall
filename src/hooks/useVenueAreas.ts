
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { VenueArea } from '@/types/database';
import { useMemo } from 'react';

// Convert flat venue areas to hierarchical structure
const buildVenueAreaHierarchy = (areas: VenueArea[]): VenueArea[] => {
  const areaMap = new Map<string, VenueArea>();
  const rootAreas: VenueArea[] = [];

  // First pass: map each area by its ID
  areas.forEach(area => {
    areaMap.set(area.id, { ...area, childAreas: [] });
  });

  // Second pass: build the hierarchy
  areas.forEach(area => {
    const mappedArea = areaMap.get(area.id)!;
    
    if (area.parent_area_id && areaMap.has(area.parent_area_id)) {
      const parent = areaMap.get(area.parent_area_id)!;
      parent.childAreas!.push(mappedArea);
    } else {
      rootAreas.push(mappedArea);
    }
  });

  // Sort root areas and children by order_index
  rootAreas.sort((a, b) => a.order_index - b.order_index);
  rootAreas.forEach(area => {
    if (area.childAreas?.length) {
      area.childAreas.sort((a, b) => a.order_index - b.order_index);
    }
  });

  return rootAreas;
};

export const useVenueAreas = (options?: { hierarchical?: boolean }) => {
  const { hierarchical = true } = options || {};
  
  const query = useQuery({
    queryKey: ['venue-areas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('venue_areas')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data as VenueArea[];
    }
  });

  const hierarchicalAreas = useMemo(() => {
    if (!query.data || !hierarchical) return query.data;
    return buildVenueAreaHierarchy(query.data);
  }, [query.data, hierarchical]);

  return {
    ...query,
    data: hierarchical ? hierarchicalAreas : query.data
  };
};
