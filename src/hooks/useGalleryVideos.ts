
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface UseGalleryVideosOptions {
  venueAreaId?: string;
  includeInactive?: boolean;
  featured?: boolean;
}

export const useGalleryVideos = (options: UseGalleryVideosOptions = {}) => {
  const { venueAreaId, includeInactive = false, featured } = options;
  
  return useQuery({
    queryKey: ['gallery-videos', venueAreaId, includeInactive, featured],
    queryFn: async () => {
      let query = supabase
        .from('gallery_videos')
        .select('*')
        .order('order_index', { ascending: true });
        
      // Filter by venue area if specified
      if (venueAreaId) {
        query = query.eq('venue_area_id', venueAreaId);
      }
      
      // Filter active/inactive videos
      if (!includeInactive) {
        query = query.eq('active', true);
      }
      
      // Filter featured videos if specified
      if (featured !== undefined) {
        query = query.eq('featured', featured);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching gallery videos:', error);
        throw new Error('Failed to fetch gallery videos');
      }
      
      return data || [];
    }
  });
};
