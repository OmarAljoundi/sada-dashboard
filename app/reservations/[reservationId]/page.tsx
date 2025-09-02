export const revalidate = 0;
import { FC, Suspense } from "react";
import ReservationForm from "../(common)/reservation-form";
import { notFound } from "next/navigation";
import ReservationBillForm from "../(common)/reservation-bill-form";
import ReservationBillRows from "../(common)/reservation-bill-rows";
import ReservationCostForm from "../(common)/reservation-cost-form";
import ReservationCostRows from "../(common)/reservation-cost-rows";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types";
import { cookies } from "next/headers";

const UpdateReservation: FC<{ params: { reservationId: number } }> = async ({
  params,
}) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("reservations")
    .select(
      "*,reservation_costs(*,clients(*)),reservation_bills(*),clients(*,currency(*))"
    )
    .eq("id", params.reservationId)
    .single();

  if (error) {
    notFound();
  }

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <ReservationForm data={data} />
        <ReservationBillForm
          data={data.reservation_bills}
          reservation_id={data.id}
        />
        <ReservationBillRows data={data.reservation_bills} />

        <ReservationCostForm
          data={data.reservation_costs}
          reservation_id={data.id}
        />
        <ReservationCostRows data={data.reservation_costs} />
      </div>
    </Suspense>
  );
};

export default UpdateReservation;
