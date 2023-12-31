export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
            referencedRelation: "currency"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          }
        ]
      }
      reservation_costs: {
        Row: {
          amount: number | null
          amount_omr: number | null
          client_id: number | null
          created_at: string
          id: number
          invoice_number: number | null
          notes: string | null
          reservation_id: number | null
        }
        Insert: {
          amount?: number | null
          amount_omr?: number | null
          client_id?: number | null
          created_at?: string
          id?: number
          invoice_number?: number | null
          notes?: string | null
          reservation_id?: number | null
        }
        Update: {
          amount?: number | null
          amount_omr?: number | null
          client_id?: number | null
          created_at?: string
          id?: number
          invoice_number?: number | null
          notes?: string | null
          reservation_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reservation_costs_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_costs_reservation_id_fkey"
            columns: ["reservation_id"]
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
