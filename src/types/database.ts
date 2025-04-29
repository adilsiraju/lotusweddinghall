
export interface VenueArea {
  id: string;
  name: string;
  description: string | null;
  order_index: number;
  parent_area_id: string | null;
  created_at: string;
  updated_at: string;
  childAreas?: VenueArea[]; // For hierarchical structure
}

export interface GalleryImage {
  id: string;
  venue_area_id: string;
  title: string;
  alt_text: string;
  description: string | null;
  image_url: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  price: string;
  popular: boolean;
  note: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  order_index: number | null;
  categories?: MenuCategory[];
}

export interface MenuCategory {
  id: string;
  package_id: string;
  name: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  items?: MenuItem[];
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  is_heading: boolean;
  parent_item_id: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
  children?: MenuItem[]; // For hierarchical structure
}
