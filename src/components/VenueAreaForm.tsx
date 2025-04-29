
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { VenueArea } from '@/types/database';

interface VenueAreaFormProps {
  parentAreas?: VenueArea[];
  onSuccess?: () => void;
}

const VenueAreaForm = ({ parentAreas = [], onSuccess }: VenueAreaFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parentAreaId, setParentAreaId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const resetForm = () => {
    setName('');
    setDescription('');
    setParentAreaId(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get the highest order_index for venue areas
      const { data: existingAreas } = await supabase
        .from('venue_areas')
        .select('order_index')
        .order('order_index', { ascending: false })
        .limit(1);
      
      const nextOrderIndex = existingAreas && existingAreas.length > 0 
        ? existingAreas[0].order_index + 1 
        : 0;
      
      const { error } = await supabase
        .from('venue_areas')
        .insert({
          name,
          description: description || null,
          parent_area_id: parentAreaId || null,
          order_index: nextOrderIndex
        });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Venue area created successfully",
      });
      
      queryClient.invalidateQueries({ queryKey: ['venue-areas'] });
      resetForm();
      setIsOpen(false);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Venue Area
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Venue Area</SheetTitle>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="venue-name">Area Name</Label>
            <Input
              id="venue-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter venue area name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="venue-description">Description (Optional)</Label>
            <Textarea
              id="venue-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter venue area description"
              rows={3}
            />
          </div>
          
          {parentAreas.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="parent-area">Parent Area (Optional)</Label>
              <select
                id="parent-area"
                value={parentAreaId || ''}
                onChange={(e) => setParentAreaId(e.target.value || null)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">None (Top-level area)</option>
                {parentAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <SheetFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-lotus-navy"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Venue Area"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default VenueAreaForm;
