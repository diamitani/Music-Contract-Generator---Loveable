export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      "All Courses": {
        Row: {
          chapter_title: string | null
          Course: string | null
          exact_text: string | null
          module_id: number | null
          module_title: string
        }
        Insert: {
          chapter_title?: string | null
          Course?: string | null
          exact_text?: string | null
          module_id?: number | null
          module_title: string
        }
        Update: {
          chapter_title?: string | null
          Course?: string | null
          exact_text?: string | null
          module_id?: number | null
          module_title?: string
        }
        Relationships: []
      }
      blogs_hiphop: {
        Row: {
          "BLOG NAME": string
          "COUNTRY / LOCATION": string | null
          "DESCRIPTION / AUTHORS WORDS": string | null
          EMAIL: string | null
          "FIRST NAME": string | null
          GENRE: string | null
          "LAST NAME": string | null
          TWITTER: string | null
          WEBSITE: string | null
        }
        Insert: {
          "BLOG NAME": string
          "COUNTRY / LOCATION"?: string | null
          "DESCRIPTION / AUTHORS WORDS"?: string | null
          EMAIL?: string | null
          "FIRST NAME"?: string | null
          GENRE?: string | null
          "LAST NAME"?: string | null
          TWITTER?: string | null
          WEBSITE?: string | null
        }
        Update: {
          "BLOG NAME"?: string
          "COUNTRY / LOCATION"?: string | null
          "DESCRIPTION / AUTHORS WORDS"?: string | null
          EMAIL?: string | null
          "FIRST NAME"?: string | null
          GENRE?: string | null
          "LAST NAME"?: string | null
          TWITTER?: string | null
          WEBSITE?: string | null
        }
        Relationships: []
      }
      Courses: {
        Row: {
          chapter_title: string | null
          Course: string
          exact_text: string | null
          module_id: number | null
          module_title: string | null
        }
        Insert: {
          chapter_title?: string | null
          Course: string
          exact_text?: string | null
          module_id?: number | null
          module_title?: string | null
        }
        Update: {
          chapter_title?: string | null
          Course?: string
          exact_text?: string | null
          module_id?: number | null
          module_title?: string | null
        }
        Relationships: []
      }
      directory_venues: {
        Row: {
          "About/Description": string | null
          Address: string | null
          Email: string | null
          "FB/Website": string | null
          "Image URL": string | null
          Phone: string | null
          State: string | null
          Street: string | null
          Venue: string
          Website: string | null
          ZIP: number | null
        }
        Insert: {
          "About/Description"?: string | null
          Address?: string | null
          Email?: string | null
          "FB/Website"?: string | null
          "Image URL"?: string | null
          Phone?: string | null
          State?: string | null
          Street?: string | null
          Venue: string
          Website?: string | null
          ZIP?: number | null
        }
        Update: {
          "About/Description"?: string | null
          Address?: string | null
          Email?: string | null
          "FB/Website"?: string | null
          "Image URL"?: string | null
          Phone?: string | null
          State?: string | null
          Street?: string | null
          Venue?: string
          Website?: string | null
          ZIP?: number | null
        }
        Relationships: []
      }
      hiphopblogs: {
        Row: {
          "BLOG NAME": string | null
          "COUNTRY / LOCATION": string | null
          "DESCRIPTION / AUTHORS WORDS": string | null
          EMAIL: string | null
          "FIRST NAME": string | null
          GENRE: string | null
          "LAST NAME": string | null
          TWITTER: string | null
          WEBSITE: string | null
        }
        Insert: {
          "BLOG NAME"?: string | null
          "COUNTRY / LOCATION"?: string | null
          "DESCRIPTION / AUTHORS WORDS"?: string | null
          EMAIL?: string | null
          "FIRST NAME"?: string | null
          GENRE?: string | null
          "LAST NAME"?: string | null
          TWITTER?: string | null
          WEBSITE?: string | null
        }
        Update: {
          "BLOG NAME"?: string | null
          "COUNTRY / LOCATION"?: string | null
          "DESCRIPTION / AUTHORS WORDS"?: string | null
          EMAIL?: string | null
          "FIRST NAME"?: string | null
          GENRE?: string | null
          "LAST NAME"?: string | null
          TWITTER?: string | null
          WEBSITE?: string | null
        }
        Relationships: []
      }
      "How to Register with a P.R.O.": {
        Row: {
          chapter_title: string | null
          exact_text: string | null
          module_id: number
          module_title: string | null
        }
        Insert: {
          chapter_title?: string | null
          exact_text?: string | null
          module_id: number
          module_title?: string | null
        }
        Update: {
          chapter_title?: string | null
          exact_text?: string | null
          module_id?: number
          module_title?: string | null
        }
        Relationships: []
      }
      "How to TradeMark Your Brand": {
        Row: {
          chapter_title: string | null
          exact_text: string | null
          module_id: number
          module_title: string | null
        }
        Insert: {
          chapter_title?: string | null
          exact_text?: string | null
          module_id: number
          module_title?: string | null
        }
        Update: {
          chapter_title?: string | null
          exact_text?: string | null
          module_id?: number
          module_title?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string | null
          from_email: string
          from_name: string
          id: string
          is_read: boolean | null
          message: string
          to_username: string
        }
        Insert: {
          created_at?: string | null
          from_email: string
          from_name: string
          id?: string
          is_read?: boolean | null
          message: string
          to_username: string
        }
        Update: {
          created_at?: string | null
          from_email?: string
          from_name?: string
          id?: string
          is_read?: boolean | null
          message?: string
          to_username?: string
        }
        Relationships: []
      }
      playlist_hiphop: {
        Row: {
          "# Of Songs": string | null
          "Curator Contact": string | null
          Description: string | null
          Email: string | null
          Facebook: string | null
          Followers: string | null
          Genres: string | null
          Instagram: string | null
          Location: string | null
          "Playlist Link": string | null
          "Playlist Name": string
          Twitter: string | null
          Website: string | null
          Youtube: string | null
        }
        Insert: {
          "# Of Songs"?: string | null
          "Curator Contact"?: string | null
          Description?: string | null
          Email?: string | null
          Facebook?: string | null
          Followers?: string | null
          Genres?: string | null
          Instagram?: string | null
          Location?: string | null
          "Playlist Link"?: string | null
          "Playlist Name": string
          Twitter?: string | null
          Website?: string | null
          Youtube?: string | null
        }
        Update: {
          "# Of Songs"?: string | null
          "Curator Contact"?: string | null
          Description?: string | null
          Email?: string | null
          Facebook?: string | null
          Followers?: string | null
          Genres?: string | null
          Instagram?: string | null
          Location?: string | null
          "Playlist Link"?: string | null
          "Playlist Name"?: string
          Twitter?: string | null
          Website?: string | null
          Youtube?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          artist_type: string | null
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          genre: string | null
          id: string
          instagram: string | null
          location: string | null
          profile_completed: boolean | null
          soundcloud: string | null
          spotify: string | null
          subscription: string | null
          twitter: string | null
          updated_at: string | null
          user_id: string
          username: string
          website: string | null
          youtube: string | null
        }
        Insert: {
          artist_type?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          genre?: string | null
          id?: string
          instagram?: string | null
          location?: string | null
          profile_completed?: boolean | null
          soundcloud?: string | null
          spotify?: string | null
          subscription?: string | null
          twitter?: string | null
          updated_at?: string | null
          user_id: string
          username: string
          website?: string | null
          youtube?: string | null
        }
        Update: {
          artist_type?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          genre?: string | null
          id?: string
          instagram?: string | null
          location?: string | null
          profile_completed?: boolean | null
          soundcloud?: string | null
          spotify?: string | null
          subscription?: string | null
          twitter?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string
          website?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
