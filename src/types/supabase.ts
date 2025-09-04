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
      behavior_entries: {
        Row: {
          activity: string
          biases_detected: string[]
          confidence: number
          created_at: string
          id: number
          notes: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          activity: string
          biases_detected: string[]
          confidence: number
          created_at?: string
          id?: number
          notes?: string | null
          timestamp: string
          user_id: string
        }
        Update: {
          activity?: string
          biases_detected?: string[]
          confidence?: number
          created_at?: string
          id?: number
          notes?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "behavior_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bias_metrics: {
        Row: {
          created_at: string
          id: number
          trend: Database["public"]["Enums"]["trend_type"]
          type: Database["public"]["Enums"]["bias_type"]
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: number
          trend: Database["public"]["Enums"]["trend_type"]
          type: Database["public"]["Enums"]["bias_type"]
          user_id: string
          value: number
        }
        Update: {
          created_at?: string
          id?: number
          trend?: Database["public"]["Enums"]["trend_type"]
          type?: Database["public"]["Enums"]["bias_type"]
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "bias_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          completed: boolean
          created_at: string
          description: string | null
          id: number
          progress: number
          reward: string | null
          target: number
          title: string
          type: Database["public"]["Enums"]["challenge_type"]
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          description?: string | null
          id?: number
          progress?: number
          reward?: string | null
          target?: number
          title: string
          type: Database["public"]["Enums"]["challenge_type"]
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          description?: string | null
          id?: number
          progress?: number
          reward?: string | null
          target?: number
          title?: string
          type?: Database["public"]["Enums"]["challenge_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news_sources: {
        Row: {
          articles_read: number
          bias_score: number
          category: Database["public"]["Enums"]["news_category_type"]
          created_at: string
          id: number
          name: string
          reliability: number
          user_id: string
        }
        Insert: {
          articles_read?: number
          bias_score: number
          category: Database["public"]["Enums"]["news_category_type"]
          created_at?: string
          id?: number
          name: string
          reliability: number
          user_id: string
        }
        Update: {
          articles_read?: number
          bias_score?: number
          category?: Database["public"]["Enums"]["news_category_type"]
          created_at?: string
          id?: number
          name?: string
          reliability?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_sources_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          settings: Json | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          settings?: Json | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          settings?: Json | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_patterns: {
        Row: {
          amount: number
          bias_type: string
          category: string
          created_at: string
          id: number
          impulse: boolean
          purchase_date: string
          user_id: string
        }
        Insert: {
          amount: number
          bias_type: string
          category: string
          created_at?: string
          id?: number
          impulse?: boolean
          purchase_date: string
          user_id: string
        }
        Update: {
          amount?: number
          bias_type?: string
          category?: string
          created_at?: string
          id?: number
          impulse?: boolean
          purchase_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_patterns_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
    }
    Enums: {
      bias_type:
        | "confirmation"
        | "availability"
        | "anchoring"
        | "representativeness"
        | "optimism"
        | "loss_aversion"
      challenge_type: "daily" | "weekly" | "monthly"
      news_category_type: "left" | "center" | "right"
      trend_type: "up" | "down" | "stable"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
