
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { GalleryImage } from '@/types/database';
import { normalizeStoragePublicUrl } from '@/lib/supabase-storage';

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
      return (data as GalleryImage[]).map((image) => ({
        ...image,
        image_url: normalizeStoragePublicUrl(image.image_url, 'gallery'),
      }));
    }
  });
};
