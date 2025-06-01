// Heavy form components that can be lazy loaded
import React from 'react';

// Lazy load heavy form components only when needed
export const LazySheet = React.lazy(() => import('@/components/ui/sheet').then(module => ({ default: module.Sheet })));
export const LazySheetContent = React.lazy(() => import('@/components/ui/sheet').then(module => ({ default: module.SheetContent })));
export const LazySheetHeader = React.lazy(() => import('@/components/ui/sheet').then(module => ({ default: module.SheetHeader })));
export const LazySheetTitle = React.lazy(() => import('@/components/ui/sheet').then(module => ({ default: module.SheetTitle })));
export const LazySheetTrigger = React.lazy(() => import('@/components/ui/sheet').then(module => ({ default: module.SheetTrigger })));
export const LazySheetFooter = React.lazy(() => import('@/components/ui/sheet').then(module => ({ default: module.SheetFooter })));

export const LazyDialog = React.lazy(() => import('@/components/ui/dialog').then(module => ({ default: module.Dialog })));
export const LazyDialogContent = React.lazy(() => import('@/components/ui/dialog').then(module => ({ default: module.DialogContent })));
export const LazyDialogHeader = React.lazy(() => import('@/components/ui/dialog').then(module => ({ default: module.DialogHeader })));
export const LazyDialogTitle = React.lazy(() => import('@/components/ui/dialog').then(module => ({ default: module.DialogTitle })));
export const LazyDialogFooter = React.lazy(() => import('@/components/ui/dialog').then(module => ({ default: module.DialogFooter })));

export const LazyAccordion = React.lazy(() => import('@/components/ui/accordion').then(module => ({ default: module.Accordion })));
export const LazyAccordionContent = React.lazy(() => import('@/components/ui/accordion').then(module => ({ default: module.AccordionContent })));
export const LazyAccordionItem = React.lazy(() => import('@/components/ui/accordion').then(module => ({ default: module.AccordionItem })));
export const LazyAccordionTrigger = React.lazy(() => import('@/components/ui/accordion').then(module => ({ default: module.AccordionTrigger })));

export const LazyTabs = React.lazy(() => import('@/components/ui/tabs').then(module => ({ default: module.Tabs })));
export const LazyTabsContent = React.lazy(() => import('@/components/ui/tabs').then(module => ({ default: module.TabsContent })));
export const LazyTabsList = React.lazy(() => import('@/components/ui/tabs').then(module => ({ default: module.TabsList })));
export const LazyTabsTrigger = React.lazy(() => import('@/components/ui/tabs').then(module => ({ default: module.TabsTrigger })));

export const LazySelect = React.lazy(() => import('@/components/ui/select').then(module => ({ default: module.Select })));
export const LazySelectContent = React.lazy(() => import('@/components/ui/select').then(module => ({ default: module.SelectContent })));
export const LazySelectItem = React.lazy(() => import('@/components/ui/select').then(module => ({ default: module.SelectItem })));
export const LazySelectTrigger = React.lazy(() => import('@/components/ui/select').then(module => ({ default: module.SelectTrigger })));
export const LazySelectValue = React.lazy(() => import('@/components/ui/select').then(module => ({ default: module.SelectValue })));

// Form suspense wrapper for admin forms
export const FormSuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <React.Suspense 
    fallback={
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    }
  >
    {children}
  </React.Suspense>
);
