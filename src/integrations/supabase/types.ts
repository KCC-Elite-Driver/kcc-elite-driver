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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          amount_charged: number | null
          amount_display: number | null
          client_id: string | null
          created_at: string
          currency_charged: string | null
          currency_display: string | null
          date: string
          driver_id: string | null
          dropoff: string
          email: string
          firstname: string
          flight_number: string | null
          fx_rate: number | null
          id: string
          lastname: string
          luggage: number | null
          meet_greet: boolean | null
          notes: string | null
          passengers: number | null
          payment_intent_id: string | null
          payment_method: string | null
          payment_order_id: string | null
          payment_provider: string | null
          payment_status: string
          payment_transaction_id: string | null
          phone: string
          pickup: string
          provider_id: string | null
          service_type: string | null
          status: Database["public"]["Enums"]["booking_status"]
          time: string
          updated_at: string
          vehicle: string | null
        }
        Insert: {
          amount_charged?: number | null
          amount_display?: number | null
          client_id?: string | null
          created_at?: string
          currency_charged?: string | null
          currency_display?: string | null
          date: string
          driver_id?: string | null
          dropoff: string
          email: string
          firstname: string
          flight_number?: string | null
          fx_rate?: number | null
          id?: string
          lastname: string
          luggage?: number | null
          meet_greet?: boolean | null
          notes?: string | null
          passengers?: number | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_order_id?: string | null
          payment_provider?: string | null
          payment_status?: string
          payment_transaction_id?: string | null
          phone: string
          pickup: string
          provider_id?: string | null
          service_type?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          time: string
          updated_at?: string
          vehicle?: string | null
        }
        Update: {
          amount_charged?: number | null
          amount_display?: number | null
          client_id?: string | null
          created_at?: string
          currency_charged?: string | null
          currency_display?: string | null
          date?: string
          driver_id?: string | null
          dropoff?: string
          email?: string
          firstname?: string
          flight_number?: string | null
          fx_rate?: number | null
          id?: string
          lastname?: string
          luggage?: number | null
          meet_greet?: boolean | null
          notes?: string | null
          passengers?: number | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_order_id?: string | null
          payment_provider?: string | null
          payment_status?: string
          payment_transaction_id?: string | null
          phone?: string
          pickup?: string
          provider_id?: string | null
          service_type?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          time?: string
          updated_at?: string
          vehicle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          created_at: string
          email: string | null
          firstname: string
          id: string
          lastname: string
          phone: string | null
          provider_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          firstname: string
          id?: string
          lastname: string
          phone?: string | null
          provider_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          firstname?: string
          id?: string
          lastname?: string
          phone?: string | null
          provider_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drivers_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      payment_events: {
        Row: {
          amount: number | null
          booking_id: string | null
          created_at: string
          currency: string | null
          event_type: string
          hmac_valid: boolean | null
          id: string
          intent_id: string | null
          order_id: string | null
          provider: string
          raw_payload: Json
          success: boolean | null
          transaction_id: string | null
        }
        Insert: {
          amount?: number | null
          booking_id?: string | null
          created_at?: string
          currency?: string | null
          event_type: string
          hmac_valid?: boolean | null
          id?: string
          intent_id?: string | null
          order_id?: string | null
          provider: string
          raw_payload: Json
          success?: boolean | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number | null
          booking_id?: string | null
          created_at?: string
          currency?: string | null
          event_type?: string
          hmac_valid?: boolean | null
          id?: string
          intent_id?: string | null
          order_id?: string | null
          provider?: string
          raw_payload?: Json
          success?: boolean | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_events_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          country: string
          id: string
          new_values: Json | null
          old_values: Json | null
          rule_id: string | null
          service_type: string
          vehicle: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          country: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          rule_id?: string | null
          service_type: string
          vehicle: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          country?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          rule_id?: string | null
          service_type?: string
          vehicle?: string
        }
        Relationships: [
          {
            foreignKeyName: "pricing_history_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "pricing_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_rules: {
        Row: {
          base_price: number | null
          country: string
          created_at: string
          currency: string
          currency_symbol: string
          hourly_rate: number | null
          id: string
          per_km_over_threshold: number | null
          quote_only: boolean
          service_type: string
          sphinx_surcharge: number | null
          threshold_km: number | null
          updated_at: string
          vehicle: string
        }
        Insert: {
          base_price?: number | null
          country: string
          created_at?: string
          currency: string
          currency_symbol: string
          hourly_rate?: number | null
          id?: string
          per_km_over_threshold?: number | null
          quote_only?: boolean
          service_type: string
          sphinx_surcharge?: number | null
          threshold_km?: number | null
          updated_at?: string
          vehicle: string
        }
        Update: {
          base_price?: number | null
          country?: string
          created_at?: string
          currency?: string
          currency_symbol?: string
          hourly_rate?: number | null
          id?: string
          per_km_over_threshold?: number | null
          quote_only?: boolean
          service_type?: string
          sphinx_surcharge?: number | null
          threshold_km?: number | null
          updated_at?: string
          vehicle?: string
        }
        Relationships: []
      }
      providers: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user"
      booking_status: "pending" | "confirmed" | "completed" | "cancelled"
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
    Enums: {
      app_role: ["admin", "user"],
      booking_status: ["pending", "confirmed", "completed", "cancelled"],
    },
  },
} as const
