
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { GalleryImage } from '@/types/database';

export const useFeaturedGalleryImages = () => {
  return useQuery({
    queryKey: ['featured-gallery-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('active', true)
        .eq('featured', true)
        .order('order_index');
      
      if (error) throw error;
      return data as GalleryImage[];
    }
  });
};
