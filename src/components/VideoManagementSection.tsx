
import React, { useState, useEffect } from 'react';
import { useGalleryVideos } from '@/hooks/useGalleryVideos';
import { useVenueAreas } from '@/hooks/useVenueAreas';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { VideoPlatform, getEmbedUrl, isValidVideoUrl, getPlatformDisplayName } from '@/utils/videoUtils';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AlertCircle, Pencil, Star, Trash2, Video } from 'lucide-react';

interface VideoFormData {
  id?: string;
  title: string;
  description: string;
  embed_url: string;
  platform: VideoPlatform;
  venue_area_id: string;
  active: boolean;
  featured: boolean;
}

const VideoManagementSection = () => {
  const { data: videos = [], isLoading, refetch } = useGalleryVideos({ includeInactive: true });
  const { data: venueAreas = [] } = useVenueAreas();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Filter by venue area
  const [selectedVenueAreaId, setSelectedVenueAreaId] = useState<string>('all');
  
  // Video form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<VideoFormData>({
    title: '',
    description: '',
    embed_url: '',
    platform: 'youtube',
    venue_area_id: '',
    active: true,
    featured: false
  });
  
  // Video preview state
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  
  // Initialize form with default venue area
  useEffect(() => {
    if (venueAreas.length > 0 && formData.venue_area_id === '') {
      setFormData(prev => ({ ...prev, venue_area_id: venueAreas[0].id }));
    }
  }, [venueAreas, formData.venue_area_id]);
  
  // Reset form values
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      embed_url: '',
      platform: 'youtube',
      venue_area_id: venueAreas.length > 0 ? venueAreas[0].id : '',
      active: true,
      featured: false
    });
    setIsEditMode(false);
    setVideoPreviewUrl(null);
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update preview if URL changes
    if (name === 'embed_url') {
      updateVideoPreview(value, formData.platform);
    }
  };
  
  // Handle platform change
  const handlePlatformChange = (platform: VideoPlatform) => {
    setFormData(prev => ({ ...prev, platform }));
    updateVideoPreview(formData.embed_url, platform);
  };
  
  // Update video preview based on URL and platform
  const updateVideoPreview = (url: string, platform: VideoPlatform) => {
    if (!url.trim()) {
      setVideoPreviewUrl(null);
      return;
    }
    
    if (isValidVideoUrl(url, platform)) {
      const embedUrl = getEmbedUrl(url, platform);
      setVideoPreviewUrl(embedUrl);
    } else {
      setVideoPreviewUrl(null);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (!formData.venue_area_id) {
        throw new Error('Please select a venue area');
      }
      
      if (!formData.title.trim()) {
        throw new Error('Please enter a video title');
      }
      
      if (!formData.embed_url.trim() || !isValidVideoUrl(formData.embed_url, formData.platform)) {
        throw new Error('Please enter a valid video URL for the selected platform');
      }
      
      // Convert to embed URL if necessary
      const embedUrl = getEmbedUrl(formData.embed_url, formData.platform);
      
      if (isEditMode && formData.id) {
        // Update existing video
        const { error } = await supabase
          .from('gallery_videos')
          .update({
            title: formData.title,
            description: formData.description || null,
            embed_url: embedUrl,
            platform: formData.platform,
            venue_area_id: formData.venue_area_id,
            active: formData.active,
            featured: formData.featured,
            updated_at: new Date().toISOString()
          })
          .eq('id', formData.id);
          
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Video updated successfully'
        });
      } else {
        // Get the highest order index for the venue area
        const { data: existingVideos } = await supabase
          .from('gallery_videos')
          .select('order_index')
          .eq('venue_area_id', formData.venue_area_id)
          .order('order_index', { ascending: false })
          .limit(1);
          
        const nextOrderIndex = existingVideos && existingVideos.length > 0 ? 
          existingVideos[0].order_index + 1 : 0;
        
        // Insert new video
        const { error } = await supabase
          .from('gallery_videos')
          .insert({
            title: formData.title,
            description: formData.description || null,
            embed_url: embedUrl,
            platform: formData.platform,
            venue_area_id: formData.venue_area_id,
            active: formData.active,
            featured: formData.featured,
            order_index: nextOrderIndex
          });
          
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Video added successfully'
        });
      }
      
      queryClient.invalidateQueries({ queryKey: ['gallery-videos'] });
      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle editing video
  const handleEditVideo = (video: any) => {
    setFormData({
      id: video.id,
      title: video.title,
      description: video.description || '',
      embed_url: video.embed_url,
      platform: video.platform,
      venue_area_id: video.venue_area_id,
      active: video.active,
      featured: video.featured
    });
    setIsEditMode(true);
    setVideoPreviewUrl(video.embed_url);
    setIsDialogOpen(true);
  };
  
  // Handle deleting video
  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('gallery_videos')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Video deleted successfully'
      });
      
      queryClient.invalidateQueries({ queryKey: ['gallery-videos'] });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  
  // Toggle featured status
  const handleToggleFeatured = async (video: any) => {
    try {
      const { error } = await supabase
        .from('gallery_videos')
        .update({
          featured: !video.featured,
          updated_at: new Date().toISOString()
        })
        .eq('id', video.id);
        
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: `Video ${!video.featured ? 'added to' : 'removed from'} featured videos`
      });
      
      queryClient.invalidateQueries({ queryKey: ['gallery-videos'] });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  
  // Filter videos by selected venue area
  const filteredVideos = selectedVenueAreaId === 'all' 
    ? videos 
    : videos.filter(video => video.venue_area_id === selectedVenueAreaId);
  
  // Render a video preview
  const renderVideoPreview = (embedUrl: string, platform: VideoPlatform) => {
    switch (platform) {
      case 'youtube':
      case 'vimeo':
        return (
          <iframe
            src={embedUrl}
            className="w-full h-full rounded"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      case 'instagram':
        return (
          <iframe
            src={embedUrl}
            className="w-full h-full rounded"
            frameBorder="0"
            scrolling="no"
            allowTransparency
          />
        );
      case 'facebook':
        return (
          <iframe
            src={embedUrl}
            className="w-full h-full rounded"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        );
      default:
        return (
          <div className="flex items-center justify-center bg-gray-100 h-full w-full">
            <Video className="h-10 w-10 text-gray-400" />
          </div>
        );
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-lotus-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-xl font-medium">Video Management</h2>
        <Button 
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="bg-lotus-navy"
        >
          Add New Video
        </Button>
      </div>
      
      {/* Video Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="mb-0">
            <Label htmlFor="filter-area" className="block mb-2">Filter by Venue Area</Label>
            <div className="flex gap-2">
              <Select 
                value={selectedVenueAreaId} 
                onValueChange={setSelectedVenueAreaId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {venueAreas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => {
            const venueArea = venueAreas.find(area => area.id === video.venue_area_id);
            
            return (
              <Card key={video.id} className={!video.active ? 'opacity-60' : ''}>
                <div className="aspect-w-16 aspect-h-9">
                  <AspectRatio ratio={16/9} className="bg-gray-100">
                    {renderVideoPreview(video.embed_url, video.platform as VideoPlatform)}
                  </AspectRatio>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{video.title}</h3>
                    <div className="flex items-center gap-1">
                      {!video.active && (
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                          Hidden
                        </span>
                      )}
                      {video.featured && (
                        <span className="bg-lotus-gold/20 text-lotus-gold text-xs px-2 py-1 rounded flex items-center">
                          <Star className="h-3 w-3 mr-1" /> Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    {getPlatformDisplayName(video.platform as VideoPlatform)}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    {venueArea?.name || 'Unknown area'}
                  </p>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={video.featured ? "bg-lotus-gold/10" : ""}
                      onClick={() => handleToggleFeatured(video)}
                    >
                      <Star className={`h-4 w-4 ${video.featured ? "fill-lotus-gold text-lotus-gold" : ""}`} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditVideo(video)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteVideo(video.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Video className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500">No videos found for the selected filter.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              Add Your First Video
            </Button>
          </div>
        )}
      </div>
      
      {/* Add/Edit Video Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Video' : 'Add New Video'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Video Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter video title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter video description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            
            {/* Platform Selection */}
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select 
                value={formData.platform} 
                onValueChange={(value) => handlePlatformChange(value as VideoPlatform)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="vimeo">Vimeo</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Video URL */}
            <div className="space-y-2">
              <Label htmlFor="embed_url">Video URL</Label>
              <Input
                id="embed_url"
                name="embed_url"
                placeholder={`Enter ${formData.platform} video URL`}
                value={formData.embed_url}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-gray-500">
                {formData.platform === 'youtube' && 'e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                {formData.platform === 'vimeo' && 'e.g., https://vimeo.com/123456789'}
                {formData.platform === 'instagram' && 'Use the embed URL from Instagram'}
                {formData.platform === 'facebook' && 'Use the embed URL from Facebook'}
              </p>
            </div>
            
            {/* Video Preview */}
            {videoPreviewUrl && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="aspect-w-16 aspect-h-9">
                  <AspectRatio ratio={16/9} className="bg-gray-100 border rounded overflow-hidden">
                    {renderVideoPreview(videoPreviewUrl, formData.platform)}
                  </AspectRatio>
                </div>
              </div>
            )}
            
            {/* Venue Area */}
            <div className="space-y-2">
              <Label>Venue Area</Label>
              <Select 
                value={formData.venue_area_id} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, venue_area_id: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select venue area" />
                </SelectTrigger>
                <SelectContent>
                  {venueAreas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Active Status */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="active" 
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: !!checked }))}
              />
              <Label htmlFor="active" className="cursor-pointer">Active (visible on website)</Label>
            </div>
            
            {/* Featured Status */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="featured" 
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: !!checked }))}
              />
              <Label htmlFor="featured" className="cursor-pointer">Featured</Label>
            </div>
            
            {/* Form Actions */}
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-lotus-navy"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : isEditMode ? 'Update Video' : 'Add Video'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoManagementSection;
