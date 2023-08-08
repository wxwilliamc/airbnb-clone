// Components
import EmptyState from "@/app/components/EmptyState";
import TripsClient from "./components/TripsClient";
// Server Actions
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"

const TripsPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="Please Login"
            />
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    });

    if(reservations.length === 0){
        <EmptyState 
            title="No trips found"
            subtitle="Looks like you have not create any reservations for trips yet."
        />
    }

    return (
        <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default TripsPage