
import React, { useState, useRef } from 'react';
import { useVenueAreas } from '@/hooks/useVenueAreas';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { 
  ImagePlus, Trash2, Edit, Eye, 
  ImageOff, UploadCloud, Check, X 
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const AdminGallery = () => {
  // State and hooks
  const { data: areas = [], isLoading: areasLoading } = useVenueAreas();
  const { data: images = [], isLoading: imagesLoading, refetch } = useGalleryImages({ includeInactive: true });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [selectedAreaId, setSelectedAreaId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [altText, setAltText] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const resetForm = () => {
    setSelectedAreaId('');
    setTitle('');
    setAltText('');
    setDescription('');
    setFile(null);
    setPreview(null);
    setSelectedImage(null);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      if (isEditing && selectedImage) {
        // Update existing image
        const { error } = await supabase
          .from('gallery_images')
          .update({
            title,
            alt_text: altText,
            description,
            venue_area_id: selectedAreaId,
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedImage.id);

        if (error) throw error;

        // If there's a new file, update the image as well
        if (file) {
          // First delete the old file
          const oldPath = selectedImage.image_url.split('/').pop();
          if (oldPath) {
            await supabase.storage.from('gallery').remove([oldPath]);
          }

          // Upload the new file
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('gallery')
            .upload(fileName, file);
            
          if (uploadError) throw uploadError;
          
          // Get the public URL
          const { data: publicUrlData } = supabase.storage
            .from('gallery')
            .getPublicUrl(fileName);
            
          // Update the image_url
          const { error: updateError } = await supabase
            .from('gallery_images')
            .update({
              image_url: publicUrlData.publicUrl
            })
            .eq('id', selectedImage.id);
            
          if (updateError) throw updateError;
        }
        
        toast({
          title: "Success",
          description: "Image updated successfully",
        });
      } else {
        // Create new image
        if (!file) {
          toast({
            title: "Error",
            description: "Please select an image to upload",
            variant: "destructive"
          });
          setIsUploading(false);
          return;
        }
        
        // Upload the file to storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;
        
        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from('gallery')
          .getPublicUrl(fileName);
          
        // Insert new gallery image
        const { error: insertError } = await supabase
          .from('gallery_images')
          .insert({
            title,
            alt_text: altText,
            description,
            venue_area_id: selectedAreaId,
            image_url: publicUrlData.publicUrl,
            order_index: images.length, // Add to the end
            active: true
          });
          
        if (insertError) throw insertError;
        
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      }
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
      refetch();
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditImage = (image: any) => {
    setSelectedImage(image);
    setTitle(image.title);
    setAltText(image.alt_text);
    setDescription(image.description || '');
    setSelectedAreaId(image.venue_area_id);
    setPreview(image.image_url);
    setIsEditing(true);
  };

  const handleToggleActive = async (image: any) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({ active: !image.active })
        .eq('id', image.id);
        
      if (error) throw error;
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
      refetch();
      
      toast({
        title: "Success",
        description: `Image ${image.active ? 'hidden' : 'shown'} successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteImage = async (image: any) => {
    if (!window.confirm("Are you sure you want to delete this image? This action cannot be undone.")) {
      return;
    }
    
    try {
      // Delete the file from storage
      const fileName = image.image_url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('gallery')
          .remove([fileName]);
      }
      
      // Delete the record from the database
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', image.id);
        
      if (error) throw error;
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
      refetch();
      
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (areasLoading || imagesLoading) {
    return <div className="flex items-center justify-center h-full">
      <div className="animate-spin h-10 w-10 border-4 border-lotus-navy border-t-transparent rounded-full"></div>
    </div>;
  }

  const getAreaName = (areaId: string) => {
    const area = areas.find(area => area.id === areaId);
    return area ? area.name : 'Unknown Area';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Gallery Management</h1>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-lotus-navy">
              <ImagePlus className="mr-2 h-4 w-4" />
              Add New Image
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{isEditing ? 'Edit Image' : 'Upload New Image'}</SheetTitle>
            </SheetHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="venue-area">Venue Area</Label>
                <Select value={selectedAreaId} onValueChange={setSelectedAreaId} required>
                  <SelectTrigger id="venue-area">
                    <SelectValue placeholder="Select venue area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Image Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter image title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alt-text">Alt Text</Label>
                <Input
                  id="alt-text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Enter alternative text"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter image description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <div className="flex flex-col items-center border-2 border-dashed rounded-md p-4 hover:border-gray-400 transition-colors">
                  {preview ? (
                    <div className="relative w-full">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setFile(null);
                          setPreview(isEditing ? selectedImage.image_url : null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Select Image
                    </Button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={!isEditing}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {isEditing ? "Upload a new image or keep the existing one" : "Upload a JPG, PNG, or GIF image"}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-lotus-navy"
                  disabled={isUploading || (isEditing ? false : !file)}
                >
                  {isUploading ? 
                    "Uploading..." : 
                    isEditing ? "Update Image" : "Upload Image"
                  }
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Gallery Images</h2>
        
        {images.length === 0 ? (
          <div className="text-center py-8">
            <ImageOff className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">No images have been uploaded yet.</p>
            <Button 
              className="mt-4 bg-lotus-navy"
              onClick={() => document.querySelector('[data-state="closed"]')?.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
              )}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Add Your First Image
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <img 
                      src={image.image_url} 
                      alt={image.alt_text} 
                      className="h-16 w-24 object-cover rounded-md" 
                    />
                  </TableCell>
                  <TableCell className="font-medium">{image.title}</TableCell>
                  <TableCell>{getAreaName(image.venue_area_id)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={image.active} 
                        onCheckedChange={() => handleToggleActive(image)}
                      />
                      <span>{image.active ? 'Active' : 'Hidden'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditImage(image)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(image.image_url, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteImage(image)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default AdminGallery;
