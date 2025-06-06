export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          active: boolean
          alt_text: string
          created_at: string
          description: string | null
          featured: boolean
          id: string
          image_url: string
          order_index: number
          title: string
          updated_at: string
          venue_area_id: string
        }
        Insert: {
          active?: boolean
          alt_text: string
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url: string
          order_index?: number
          title: string
          updated_at?: string
          venue_area_id: string
        }
        Update: {
          active?: boolean
          alt_text?: string
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url?: string
          order_index?: number
          title?: string
          updated_at?: string
          venue_area_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_venue_area_id_fkey"
            columns: ["venue_area_id"]
            isOneToOne: false
            referencedRelation: "venue_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_videos: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          embed_url: string
          featured: boolean
          id: string
          order_index: number
          platform: string
          title: string
          updated_at: string
          venue_area_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          embed_url: string
          featured?: boolean
          id?: string
          order_index?: number
          platform: string
          title: string
          updated_at?: string
          venue_area_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          embed_url?: string
          featured?: boolean
          id?: string
          order_index?: number
          platform?: string
          title?: string
          updated_at?: string
          venue_area_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_videos_venue_area_id_fkey"
            columns: ["venue_area_id"]
            isOneToOne: false
            referencedRelation: "venue_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          order_index: number
          package_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          order_index?: number
          package_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          order_index?: number
          package_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_categories_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          category_id: string
          created_at: string
          id: string
          is_heading: boolean
          name: string
          order_index: number
          parent_item_id: string | null
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          is_heading?: boolean
          name: string
          order_index?: number
          parent_item_id?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          is_heading?: boolean
          name?: string
          order_index?: number
          parent_item_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "menu_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_items_parent_item_id_fkey"
            columns: ["parent_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          active: boolean
          created_at: string
          description: string
          id: string
          meal_type: Database["public"]["Enums"]["meal_type"]
          note: string | null
          order_index: number | null
          popular: boolean
          price: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description: string
          id?: string
          meal_type?: Database["public"]["Enums"]["meal_type"]
          note?: string | null
          order_index?: number | null
          popular?: boolean
          price: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string
          id?: string
          meal_type?: Database["public"]["Enums"]["meal_type"]
          note?: string | null
          order_index?: number | null
          popular?: boolean
          price?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      venue_areas: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          order_index: number
          parent_area_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          order_index?: number
          parent_area_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          order_index?: number
          parent_area_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_areas_parent_area_id_fkey"
            columns: ["parent_area_id"]
            isOneToOne: false
            referencedRelation: "venue_areas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      meal_type: "lunch" | "dinner" | "both"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      meal_type: ["lunch", "dinner", "both"],
    },
  },
} as const
