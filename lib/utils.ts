import { Reservations } from "@/db_types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabaseClient } from "./supabaseClient";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getRemaining(reservations:Reservations){
const x = reservations.reservation_bills?.reduce(
                  (accumulator, currentItem) =>
                    accumulator + (currentItem?.bill_amount ?? 0),
                  0
                )
  return reservations.sales_price! - x!
}
export function getProfit(reservations:Reservations){
  const x = reservations.reservation_costs?.reduce(
                  (accumulator, currentItem) =>
                    accumulator + (currentItem?.amount_omr ?? 0),
                  0
                )
  return reservations.sales_price! - x!
}