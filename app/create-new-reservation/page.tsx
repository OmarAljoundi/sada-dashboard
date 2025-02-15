import { supabaseClient } from "@/lib/supabaseClient";
import ReservationForm from "../reservations/(common)/reservation-form";

const CreateReservation = async () => {
  const { data, error } = await supabaseClient
    .from("reservations")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  return (
    <div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <ReservationForm nextReservation={data?.[0]?.id} />
      </div>
    </div>
  );
};

export default CreateReservation;
