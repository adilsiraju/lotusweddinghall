import React, { useState, useEffect } from 'react';
import { usePackages } from '@/hooks/usePackages';
import { useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { 
  PlusCircle, FileText, Trash2, Edit, 
  ChevronRight, Package, Star, Check, X, Utensils, Plus,
  ChevronUp, ChevronDown, Move
} from 'lucide-react';

const AdminPackages = () => {
  const { data: packages = [], isLoading, refetch } = usePackages({ includeInactive: true });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Form state for package
  const [isEditingPackage, setIsEditingPackage] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [packageTitle, setPackageTitle] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [packagePrice, setPackagePrice] = useState('');
  const [packageNote, setPackageNote] = useState('');
  const [isPopular, setIsPopular] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state for menu category
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryPackageId, setCategoryPackageId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  
  // Form state for menu item
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);
  const [menuItemCategoryId, setMenuItemCategoryId] = useState('');
  const [menuItemName, setMenuItemName] = useState('');
  const [isHeading, setIsHeading] = useState(false);
  const [parentItemId, setParentItemId] = useState<string | null>(null);
  const [selectedCategoryForItem, setSelectedCategoryForItem] = useState<any | null>(null);
  const [stayInItemForm, setStayInItemForm] = useState(false);
  
  // Category navigation
  const [activePackageId, setActivePackageId] = useState<string | null>(null);
  
  // Reset form functions - keep these as they are
  const resetPackageForm = () => {
    setSelectedPackage(null);
    setPackageTitle('');
    setPackageDescription('');
    setPackagePrice('');
    setPackageNote('');
    setIsPopular(false);
    setIsEditingPackage(false);
  };
  
  const resetCategoryForm = () => {
    setCategoryPackageId('');
    setCategoryName('');
    setIsAddingCategory(false);
  };
  
  const resetMenuItemForm = (completeReset = true) => {
    if (completeReset) {
      setMenuItemCategoryId('');
      setSelectedCategoryForItem(null);
    }
    setMenuItemName('');
    setIsHeading(false);
    setParentItemId(null);
    if (!stayInItemForm) {
      setIsAddingMenuItem(false);
    }
  };

  // Form submission handlers - keep these as they are
  const handleSubmitPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const packageData = {
        title: packageTitle,
        description: packageDescription,
        price: packagePrice,
        note: packageNote || null,
        popular: isPopular,
        active: true
      };
      
      if (isEditingPackage && selectedPackage) {
        // Update existing package
        const { error } = await supabase
          .from('packages')
          .update({
            ...packageData,
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedPackage.id);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Package updated successfully",
        });
      } else {
        // Create new package - find the highest order_index and add 1
        const { data: maxOrderData } = await supabase
          .from('packages')
          .select('order_index')
          .order('order_index', { ascending: false })
          .limit(1);
          
        const nextOrderIndex = maxOrderData && maxOrderData.length > 0 
          ? (maxOrderData[0].order_index + 1) 
          : 0;
        
        // Create new package with the next order index
        const { error } = await supabase
          .from('packages')
          .insert({
            ...packageData,
            order_index: nextOrderIndex
          });
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Package created successfully",
        });
      }
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      refetch();
      resetPackageForm();
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

  // Other handler functions - keep these as they are
  const handleEditPackage = (pkg: any) => {
    setSelectedPackage(pkg);
    setPackageTitle(pkg.title);
    setPackageDescription(pkg.description);
    setPackagePrice(pkg.price);
    setPackageNote(pkg.note || '');
    setIsPopular(pkg.popular);
    setIsEditingPackage(true);
  };

  const handleTogglePackageActive = async (pkg: any) => {
    try {
      const { error } = await supabase
        .from('packages')
        .update({ active: !pkg.active, updated_at: new Date().toISOString() })
        .eq('id', pkg.id);
        
      if (error) throw error;
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      refetch();
      
      toast({
        title: "Success",
        description: `Package ${pkg.active ? 'hidden' : 'activated'} successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeletePackage = async (pkg: any) => {
    if (!window.confirm("Are you sure you want to delete this package? This will also delete all categories and menu items associated with it.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', pkg.id);
        
      if (error) throw error;
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      refetch();
      
      toast({
        title: "Success",
        description: "Package deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Keep all other handlers as they are
  const handleMovePackage = async (packageId: string, direction: 'up' | 'down') => {
    try {
      // Find the current package and its index
      const currentIndex = packages.findIndex(p => p.id === packageId);
      if (currentIndex === -1) return;
      
      // Calculate the target index
      const targetIndex = direction === 'up' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(packages.length - 1, currentIndex + 1);
        
      // If there's no change in position, return
      if (targetIndex === currentIndex) return;
      
      // Get the target package
      const targetPackage = packages[targetIndex];
      
      // Swap order indexes
      const currentOrderIndex = packages[currentIndex].order_index;
      const targetOrderIndex = targetPackage.order_index;
      
      // Update both packages with new order indexes
      const updates = [
        supabase.from('packages')
          .update({ order_index: targetOrderIndex })
          .eq('id', packageId),
          
        supabase.from('packages')
          .update({ order_index: currentOrderIndex })
          .eq('id', targetPackage.id)
      ];
      
      await Promise.all(updates);
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      refetch();
      
      toast({
        title: "Success",
        description: `Package moved ${direction}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('menu_categories')
        .insert({
          package_id: categoryPackageId,
          name: categoryName,
          order_index: 0 // Default order
        })
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Menu category added successfully",
      });
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      refetch();
      resetCategoryForm();
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

  const handleDeleteCategory = async (category: any) => {
    if (!window.confirm("Are you sure you want to delete this category? This will also delete all menu items in this category.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('menu_categories')
        .delete()
        .eq('id', category.id);
        
      if (error) throw error;
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      refetch();
      
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSubmitMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get the highest order_index for this category
      const { data: existingItems } = await supabase
        .from('menu_items')
        .select('order_index')
        .eq('category_id', menuItemCategoryId)
        .order('order_index', { ascending: false })
        .limit(1);
        
      const nextOrderIndex = existingItems && existingItems.length > 0 
        ? existingItems[0].order_index + 1
        : 0;
        
      const { error } = await supabase
        .from('menu_items')
        .insert({
          category_id: menuItemCategoryId,
          name: menuItemName,
          is_heading: isHeading,
          parent_item_id: parentItemId,
          order_index: nextOrderIndex
        });
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Menu item added successfully",
      });
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      refetch();
      resetMenuItemForm(false); // Only reset the form fields, not the category
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

  const handleDeleteMenuItem = async (item: any) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', item.id);
        
      if (error) throw error;
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      refetch();
      
      toast({
        title: "Success",
        description: "Menu item deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Set the selected category data when the ID changes
  useEffect(() => {
    if (menuItemCategoryId) {
      const category = packages.flatMap(p => p.categories || [])
        .find(c => c.id === menuItemCategoryId);
      
      if (category) {
        setSelectedCategoryForItem(category);
      }
    }
  }, [menuItemCategoryId, packages]);

  // Set active package ID if not set and packages are available
  useEffect(() => {
    if (packages.length > 0 && !activePackageId) {
      setActivePackageId(packages[0].id);
    }
  }, [packages, activePackageId]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">
      <div className="animate-spin h-10 w-10 border-4 border-lotus-navy border-t-transparent rounded-full"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">Packages Management</h1>
        
        <div className="flex flex-wrap gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-lotus-navy">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Package
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  {isEditingPackage ? 'Edit Package' : 'Add New Package'}
                </SheetTitle>
              </SheetHeader>
              
              <form onSubmit={handleSubmitPackage} className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Package Title</Label>
                  <Input
                    id="title"
                    value={packageTitle}
                    onChange={(e) => setPackageTitle(e.target.value)}
                    placeholder="Enter package title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={packageDescription}
                    onChange={(e) => setPackageDescription(e.target.value)}
                    placeholder="Enter package description"
                    required
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={packagePrice}
                    onChange={(e) => setPackagePrice(e.target.value)}
                    placeholder="Enter package price (e.g., $50 per person)"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Textarea
                    id="note"
                    value={packageNote}
                    onChange={(e) => setPackageNote(e.target.value)}
                    placeholder="Enter any additional notes"
                    rows={2}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isPopular}
                    onCheckedChange={setIsPopular}
                    id="popular"
                  />
                  <Label htmlFor="popular">Mark as Popular</Label>
                </div>
                
                <SheetFooter className="pt-4 flex flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetPackageForm}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-lotus-navy w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Saving..."
                      : isEditingPackage
                        ? "Update Package"
                        : "Add Package"
                    }
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Menu Category</SheetTitle>
              </SheetHeader>
              
              <form onSubmit={handleSubmitCategory} className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="package">Select Package</Label>
                  <select
                    id="package"
                    value={categoryPackageId}
                    onChange={(e) => setCategoryPackageId(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="" disabled>Select a package</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                    required
                  />
                </div>
                
                <SheetFooter className="pt-4 flex flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetCategoryForm}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-lotus-navy w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add Category"}
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
          
          <Sheet open={isAddingMenuItem} onOpenChange={setIsAddingMenuItem}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Utensils className="mr-2 h-4 w-4" />
                Add Menu Item
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Menu Item</SheetTitle>
              </SheetHeader>
              
              <form onSubmit={handleSubmitMenuItem} className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="menu-category">Select Category</Label>
                  <div className="max-h-36 overflow-y-auto border rounded-md p-2">
                    <Tabs defaultValue={activePackageId || ''} onValueChange={(value) => setActivePackageId(value)}>
                      <TabsList className="w-full h-auto flex flex-wrap">
                        {packages.map(pkg => (
                          <TabsTrigger key={pkg.id} value={pkg.id} className="flex-grow max-w-[50%] text-xs sm:text-sm">
                            {pkg.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {packages.map(pkg => (
                        <TabsContent key={pkg.id} value={pkg.id}>
                          <div className="space-y-2 mt-2">
                            {pkg.categories?.length ? (
                              pkg.categories.map(category => (
                                <div 
                                  key={category.id} 
                                  className={`p-2 border rounded-md cursor-pointer hover:bg-gray-50 ${menuItemCategoryId === category.id ? 'bg-lotus-navy/10 border-lotus-navy' : ''}`}
                                  onClick={() => setMenuItemCategoryId(category.id)}
                                >
                                  {category.name}
                                </div>
                              ))
                            ) : (
                              <div className="text-center text-gray-500 py-4">No categories in this package</div>
                            )}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                  
                  {selectedCategoryForItem && (
                    <div className="flex items-center p-2 bg-lotus-navy/5 rounded-md">
                      <span className="font-medium">Selected: </span>
                      <span className="ml-1">{selectedCategoryForItem.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    value={menuItemName}
                    onChange={(e) => setMenuItemName(e.target.value)}
                    placeholder="Enter menu item name"
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isHeading}
                    onCheckedChange={setIsHeading}
                    id="is-heading"
                  />
                  <Label htmlFor="is-heading">This is a section heading</Label>
                </div>
                
                {menuItemCategoryId && !isHeading && (
                  <div className="space-y-2">
                    <Label htmlFor="parent-item">Parent Item (Optional)</Label>
                    <select
                      id="parent-item"
                      value={parentItemId || ''}
                      onChange={(e) => setParentItemId(e.target.value || null)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">None (Top-level item)</option>
                      {packages
                        .flatMap(pkg => pkg.categories?.filter(c => c.id === menuItemCategoryId))
                        .flatMap(category => 
                          category?.items?.filter(item => item.is_heading).map(item => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))
                        )}
                    </select>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={stayInItemForm}
                    onCheckedChange={setStayInItemForm}
                    id="stay-in-form"
                  />
                  <Label htmlFor="stay-in-form">Stay in form to add multiple items</Label>
                </div>
                
                <SheetFooter className="pt-4 flex flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => resetMenuItemForm(true)}
                    className="w-full sm:w-auto order-1 sm:order-none"
                  >
                    Cancel
                  </Button>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      type="submit"
                      className="bg-lotus-navy flex-1"
                      disabled={isSubmitting || !menuItemCategoryId}
                    >
                      {isSubmitting ? "Adding..." : "Add Item"}
                    </Button>
                    
                    {stayInItemForm && (
                      <Button
                        type="submit"
                        className="bg-lotus-gold"
                        disabled={isSubmitting || !menuItemCategoryId}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <Card className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
          <h2 className="text-lg font-medium">All Packages</h2>
          <div className="text-xs md:text-sm text-gray-500">
            Tap arrows to reorder packages
          </div>
        </div>
        
        {packages.length === 0 ? (
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">No packages have been created yet.</p>
            <Button 
              className="mt-4 bg-lotus-navy"
              onClick={() => document.querySelector('[data-state="closed"]')?.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
              )}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Package
            </Button>
          </div>
        ) : (
          <Accordion type="multiple" className="w-full">
            {packages.map((pkg, index) => (
              <AccordionItem value={pkg.id} key={pkg.id}>
                <div className="flex items-center">
                  <div className="flex flex-col items-center mr-2 space-y-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => handleMovePackage(pkg.id, 'up')}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => handleMovePackage(pkg.id, 'down')}
                      disabled={index === packages.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-grow">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center">
                          {pkg.popular && (
                            <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
                          )}
                          <span className="font-medium truncate max-w-[150px] sm:max-w-none">{pkg.title}</span>
                          {!pkg.active && (
                            <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                              Hidden
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-normal text-right">
                          <div className="font-medium text-lotus-navy">{pkg.price}</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                  </div>
                </div>
                
                <AccordionContent>
                  <div className="space-y-4 pl-2 md:pl-4 py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-semibold mb-1">Description</h3>
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                        
                        {pkg.note && (
                          <div className="mt-2">
                            <h3 className="text-sm font-semibold mb-1">Note</h3>
                            <p className="text-sm text-gray-600">{pkg.note}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Switch 
                              checked={pkg.active} 
                              onCheckedChange={() => handleTogglePackageActive(pkg)}
                              className="mr-2"
                            />
                            <span className="text-sm">
                              {pkg.active ? 'Active' : 'Hidden'}
                            </span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditPackage(pkg)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeletePackage(pkg)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Categories and Menu Items */}
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold mb-2">Menu Categories</h3>
                      
                      {(!pkg.categories || pkg.categories.length === 0) ? (
                        <div className="text-sm text-gray-600">
                          No categories added yet.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {pkg.categories?.map((category) => (
                            <div key={category.id} className="bg-gray-50 p-3 rounded-md">
                              <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                                <h4 className="font-medium">{category.name}</h4>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-2"
                                    onClick={() => {
                                      setMenuItemCategoryId(category.id);
                                      setIsAddingMenuItem(true);
                                    }}
                                  >
                                    <Plus className="h-3.5 w-3.5 text-lotus-navy" />
                                    <span className="ml-1">Add Item</span>
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteCategory(category)}
                                    className="h-7 px-2"
                                  >
                                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                              
                              {(!category.items || category.items.length === 0) ? (
                                <div className="text-sm text-gray-500">
                                  No items in this category.
                                </div>
                              ) : (
                                <ul className="space-y-1 pl-2 md:pl-4">
                                  {category.items?.filter(item => !item.parent_item_id).map((item) => (
                                    <li key={item.id}>
                                      <div className="flex justify-between items-center">
                                        <div className="flex items-center flex-wrap">
                                          {item.is_heading && (
                                            <span className="text-xs bg-lotus-navy text-white px-1.5 py-0.5 rounded mr-2 mb-1">
                                              Heading
                                            </span>
                                          )}
                                          <span 
                                            className={item.is_heading ? 'font-medium' : ''}
                                          >
                                            {item.name}
                                          </span>
                                        </div>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => handleDeleteMenuItem(item)}
                                          className="h-6 px-2"
                                        >
                                          <Trash2 className="h-3 w-3 text-red-500" />
                                        </Button>
                                      </div>
                                      
                                      {/* Sub-items */}
                                      {
