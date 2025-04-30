import React, { useState, useEffect } from 'react';
import { useVenueAreas } from '@/hooks/useVenueAreas';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle, Trash2, Upload, ImageIcon, Star } from 'lucide-react';
import VenueAreaForm from '@/components/VenueAreaForm';
import VideoManagementSection from '@/components/VideoManagementSection';
import { VenueArea } from '@/types/database';

const AdminGallery = () => {
  const { data: venueAreas = [], isLoading: isLoadingAreas, refetch: refetchAreas } = useVenueAreas();
  const { data: galleryImages = [], isLoading: isLoadingImages, refetch: refetchImages } = useGalleryImages({ includeInactive: true });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('images');

  // Filter by venue area
  const [selectedVenueAreaId, setSelectedVenueAreaId] = useState<string>('all');
  
  // Form for adding/editing images
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [imageTitle, setImageTitle] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedAreaId, setSelectedAreaId] = useState<string>('');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Reset form values
  const resetForm = () => {
    setSelectedImage(null);
    setIsEditMode(false);
    setImageTitle('');
    setImageDescription('');
    setImageFile(null);
    setSelectedAreaId(venueAreas.length > 0 ? venueAreas[0].id : '');
    setIsActive(true);
    setIsFeatured(false);
    setImagePreview(null);
  };
  
  // Set initial venue area selection
  useEffect(() => {
    if (venueAreas.length > 0 && selectedAreaId === '') {
      setSelectedAreaId(venueAreas[0].id);
    }
  }, [venueAreas, selectedAreaId]);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    
    const file = e.target.files[0];
    setImageFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle image title change - auto-update alt text (now handled in state)
  const handleImageTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setImageTitle(newTitle);
    // Alt text is the same as title
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      if (!selectedAreaId) {
        throw new Error("Please select a venue area");
      }
      
      // For edit mode without a new file
      if (isEditMode && !imageFile) {
        const { error } = await supabase
          .from('gallery_images')
          .update({
            venue_area_id: selectedAreaId,
            title: imageTitle,
            alt_text: imageTitle, // Alt text is the same as title
            description: imageDescription || null,
            active: isActive,
            featured: isFeatured,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedImage.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Image updated successfully",
        });
        
        queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
        queryClient.invalidateQueries({ queryKey: ['featured-gallery-images'] });
        resetForm();
        setIsDialogOpen(false);
        return;
      }
      
      // Check if we have a file to upload
      if (!imageFile) {
        throw new Error("Please select an image");
      }
      
      let imagePath;
      if (isEditMode) {
        // Delete old file if updating
        imagePath = selectedImage.image_url.split('/').pop();
      } else {
        // Generate unique filename for new upload
        const fileExt = imageFile.name.split('.').pop();
        imagePath = `${Date.now()}-${Math.floor(Math.random() * 10000)}.${fileExt}`;
      }
      
      // Upload the image file
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(imagePath, imageFile, { upsert: isEditMode });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('gallery')
        .getPublicUrl(imagePath);
        
      const publicUrl = publicUrlData.publicUrl;
      
      if (isEditMode) {
        // Update existing record
        const { error } = await supabase
          .from('gallery_images')
          .update({
            venue_area_id: selectedAreaId,
            title: imageTitle,
            alt_text: imageTitle, // Alt text is the same as title
            description: imageDescription || null,
            image_url: publicUrl,
            active: isActive,
            featured: isFeatured,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedImage.id);
          
        if (error) throw error;
      } else {
        // Get the highest order index for the venue area
        const { data: existingImages } = await supabase
          .from('gallery_images')
          .select('order_index')
          .eq('venue_area_id', selectedAreaId)
          .order('order_index', { ascending: false })
          .limit(1);
          
        const nextOrderIndex = existingImages && existingImages.length > 0 ? 
          existingImages[0].order_index + 1 : 0;
          
        // Insert new record
        const { error } = await supabase
          .from('gallery_images')
          .insert({
            venue_area_id: selectedAreaId,
            title: imageTitle,
            alt_text: imageTitle, // Alt text is the same as title
            description: imageDescription || null,
            image_url: publicUrl,
            active: isActive,
            featured: isFeatured,
            order_index: nextOrderIndex,
          });
          
        if (error) throw error;
      }
      
      toast({
        title: "Success",
        description: `Image ${isEditMode ? 'updated' : 'uploaded'} successfully`,
      });
      
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
      queryClient.invalidateQueries({ queryKey: ['featured-gallery-images'] });
      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle edit image
  const handleEditImage = (image: any) => {
    setSelectedImage(image);
    setIsEditMode(true);
    setImageTitle(image.title);
    setImageDescription(image.description || '');
    setSelectedAreaId(image.venue_area_id);
    setIsActive(image.active);
    setIsFeatured(image.featured);
    setImagePreview(image.image_url);
    setIsDialogOpen(true);
  };
  
  // Toggle featured status
  const handleToggleFeatured = async (image: any) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({
          featured: !image.featured,
          updated_at: new Date().toISOString(),
        })
        .eq('id', image.id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Image ${!image.featured ? 'added to' : 'removed from'} featured images`,
      });
      
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
      queryClient.invalidateQueries({ queryKey: ['featured-gallery-images'] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  // Handle delete image
  const handleDeleteImage = async (image: any) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }
    
    try {
      // Extract filename from URL
      const imagePath = image.image_url.split('/').pop();
      
      // Delete the image record from the database
      const { error: dbError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', image.id);
        
      if (dbError) throw dbError;
      
      // Delete the image from storage
      const { error: storageError } = await supabase.storage
        .from('gallery')
        .remove([imagePath]);
        
      if (storageError) {
        console.error('Failed to delete image file:', storageError);
        // Continue even if file deletion fails
      }
      
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
      
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
      queryClient.invalidateQueries({ queryKey: ['featured-gallery-images'] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  // Filter images by selected venue area
  const filteredImages = selectedVenueAreaId === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.venue_area_id === selectedVenueAreaId);
  
  if (isLoadingAreas || isLoadingImages) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-10 w-10 border-4 border-lotus-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Gallery Management</h1>
        <div className="flex gap-2">
          <VenueAreaForm 
            parentAreas={venueAreas}
            onSuccess={() => refetchAreas()}
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-64 mb-4">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="images" className="mt-0">
          <div className="flex justify-end mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-lotus-navy" onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
              </DialogTrigger>
              
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{isEditMode ? 'Edit Image' : 'Add New Image'}</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="venue-area">Venue Area</Label>
                    <Select 
                      value={selectedAreaId} 
                      onValueChange={setSelectedAreaId}
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="image-title">Image Title</Label>
                    <Input
                      id="image-title"
                      value={imageTitle}
                      onChange={handleImageTitleChange}
                      placeholder="Enter image title"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This will also be used as the alt text for accessibility
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image-description">Description (Optional)</Label>
                    <Textarea
                      id="image-description"
                      value={imageDescription}
                      onChange={(e) => setImageDescription(e.target.value)}
                      placeholder="Enter image description"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image-file">Select Image</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="image-file"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={isEditMode ? "" : "required:border-red-500"}
                        required={!isEditMode}
                      />
                    </div>
                  </div>
                  
                  {imagePreview && (
                    <div className="mt-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-48 max-w-full object-contain border rounded" 
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="image-active"
                      checked={isActive}
                      onCheckedChange={(checked) => setIsActive(checked as boolean)}
                    />
                    <Label htmlFor="image-active">Active (visible on website)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="image-featured"
                      checked={isFeatured}
                      onCheckedChange={(checked) => setIsFeatured(checked as boolean)}
                    />
                    <Label htmlFor="image-featured">Featured (show on homepage)</Label>
                  </div>
                  
                  <DialogFooter className="pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-lotus-navy"
                      disabled={isUploading}
                    >
                      {isUploading ? 'Uploading...' : isEditMode ? 'Update Image' : 'Upload Image'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
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
              
              {filteredImages.length === 0 ? (
                <div className="text-center py-10">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-gray-500">No images found. Add your first image.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredImages.map((image) => {
                    const venueArea = venueAreas.find(area => area.id === image.venue_area_id);
                    
                    return (
                      <div 
                        key={image.id} 
                        className={`border rounded-md overflow-hidden ${!image.active ? 'opacity-60' : ''}`}
                      >
                        <div className="relative h-48">
                          <img 
                            src={image.image_url} 
                            alt={image.alt_text} 
                            className="w-full h-full object-cover"
                          />
                          {!image.active && (
                            <div className="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded">
                              Hidden
                            </div>
                          )}
                          {image.featured && (
                            <div className="absolute top-2 left-2 bg-lotus-gold text-white text-xs px-2 py-1 rounded flex items-center">
                              <Star className="h-3 w-3 mr-1" /> Featured
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium truncate">{image.title}</h3>
                          <p className="text-sm text-gray-500">{venueArea?.name || 'Unknown area'}</p>
                          
                          <div className="mt-3 flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleToggleFeatured(image)}
                              className={image.featured ? "bg-lotus-gold/10" : ""}
                            >
                              <Star className={`h-4 w-4 ${image.featured ? "fill-lotus-gold text-lotus-gold" : ""}`} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditImage(image)}
                            >
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDeleteImage(image)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          <VideoManagementSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminGallery;
