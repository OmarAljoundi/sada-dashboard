import ReservationForm from "../reservations/(common)/reservation-form";

const CreateReservation = () => {
  return (
    <div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Create New Reservation
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s you can create a new reservation
            </p>
          </div>
        </div>
        <ReservationForm />
      </div>
    </div>
  );
};

export default CreateReservation;
