import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ReservationsClient from "./components/ReservationsClient";

const ReservationPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if(reservations.length === 0){
        <EmptyState 
            title="No reservations found"
            subtitle="No reservations have been made for this property."
        />
    }
  return (
    <>
        <ReservationsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    </>
  )
}

export default ReservationPage