import ReservationForm from "../reservations/(common)/reservation-form";

const CreateReservation = () => {
  return (
    <div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <ReservationForm />
      </div>
    </div>
  );
};

export default CreateReservation;
