
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { GalleryImage } from '@/types/database';

interface UseGalleryImagesOptions {
  areaId?: string;
  includeInactive?: boolean;
}

export const useGalleryImages = (options?: UseGalleryImagesOptions) => {
  const { areaId, includeInactive = false } = options || {};

  return useQuery({
    queryKey: ['gallery-images', areaId, includeInactive],
    queryFn: async () => {
      let query = supabase.from('gallery_images')
        .select('*')
        .order('order_index');
      
      if (areaId) {
        query = query.eq('venue_area_id', areaId);
      }
      
      if (!includeInactive) {
        query = query.eq('active', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as GalleryImage[];
    }
  });
};
