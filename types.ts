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
      clients: {
        Row: {
          created_at: string
          currency_id: number
          email: string | null
          id: number
          name: string | null
          phone_number: string | null
          type: string
        }
        Insert: {
          created_at?: string
          currency_id: number
          email?: string | null
          id?: number
          name?: string | null
          phone_number?: string | null
          type?: string
        }
        Update: {
          created_at?: string
          currency_id?: number
          email?: string | null
          id?: number
          name?: string | null
          phone_number?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_currency_id_fkey"
            columns: ["currency_id"]
            isOneToOne: false
            referencedRelation: "currency"
            referencedColumns: ["id"]
          },
        ]
      }
      currency: {
        Row: {
          created_at: string
          id: number
          symbol: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          symbol?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          symbol?: string | null
        }
        Relationships: []
      }
      reservation_bills: {
        Row: {
          bill_amount: number | null
          bill_date: string | null
          created_at: string
          id: number
          payment_method: string | null
          reservation_id: number | null
        }
        Insert: {
          bill_amount?: number | null
          bill_date?: string | null
          created_at?: string
          id?: number
          payment_method?: string | null
          reservation_id?: number | null
        }
        Update: {
          bill_amount?: number | null
          bill_date?: string | null
          created_at?: string
          id?: number
          payment_method?: string | null
          reservation_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reservation_bills_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      reservation_costs: {
        Row: {
          amount: number | null
          amount_omr: number | null
          client_id: number | null
          created_at: string
          id: number
          invoice_number: string | null
          notes: string | null
          reservation_id: number | null
        }
        Insert: {
          amount?: number | null
          amount_omr?: number | null
          client_id?: number | null
          created_at?: string
          id?: number
          invoice_number?: string | null
          notes?: string | null
          reservation_id?: number | null
        }
        Update: {
          amount?: number | null
          amount_omr?: number | null
          client_id?: number | null
          created_at?: string
          id?: number
          invoice_number?: string | null
          notes?: string | null
          reservation_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reservation_costs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_costs_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          check_in: string | null
          check_out: string | null
          client_id: number | null
          countries: string[] | null
          created_at: string
          created_by: string | null
          id: number
          modified_at: string | null
          modified_by: string | null
          notes: string | null
          number_of_adults: number | null
          number_of_kids: number | null
          remaining_amount: number | null
          sales_price: number | null
          sold_by: string | null
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          client_id?: number | null
          countries?: string[] | null
          created_at?: string
          created_by?: string | null
          id?: number
          modified_at?: string | null
          modified_by?: string | null
          notes?: string | null
          number_of_adults?: number | null
          number_of_kids?: number | null
          remaining_amount?: number | null
          sales_price?: number | null
          sold_by?: string | null
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          client_id?: number | null
          countries?: string[] | null
          created_at?: string
          created_by?: string | null
          id?: number
          modified_at?: string | null
          modified_by?: string | null
          notes?: string | null
          number_of_adults?: number | null
          number_of_kids?: number | null
          remaining_amount?: number | null
          sales_price?: number | null
          sold_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
