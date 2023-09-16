export type User = {
  id: number;
  created_at: string;
  user_id: string;
  name: string;
};

export type Reservations = {
  id?: number;
  check_in?: string | null;
  check_out?: string | null;
  countries?: string[] | null;
  created_at?: string;
  created_by?: string | null;
  modified_at?: string | null;
  modified_by?: string | null;
  notes?: string | null | null;
  number_of_adults?: number | null;
  number_of_kids?: number | null;
  remaining_amount?: number | null;
  sales_price?: number | null;
  sold_by?: string | null;
  clients?: Clients | null;
  client_id?: number | null;
  user?: User | null;
  reservation_bills?: ReservationBills[];
  reservation_costs?: ReservationCosts[];
};

export type ReservationBills = {
  bill_amount?: number | null;
  bill_date?: string | null;
  created_at?: string;
  id?: number;
  payment_method?: string | null;
  reservation_id?: number | null;
};

export type ReservationCosts = {
  id?: number;
  reservation_id?: number | null;
  amount?: number | null;
  amount_omr?: number | null;
  invoice_number?: number | null;
  clients?: Clients | null;
  client_id?: number | null;
  notes?: string | null;
  created_at?: string;
};

export type Currency = {
  id?: number | null;
  symbol?: string | null;
  created_at?: string;
};

export type Clients = {
  id?: number;
  currency?: Currency | null;
  created_at?: string;
  currency_id: number;
  email?: string | null;
  name?: string | null;
  phone_number?: string | null;
  type?: string;
  reservations?: Reservations[] | null;
};

export type SignInForm = {
  email: string;
  password: string;
};
