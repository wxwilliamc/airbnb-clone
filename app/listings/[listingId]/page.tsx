// Actions
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
import getReservations from "@/app/actions/getReservations";
// Components
import { EmptyState, ListingClient } from "@/app/components";

interface IParams {
    listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params);

    if(!listing){
        return (
            <EmptyState />
        )
    }

    return (
        <div>
            <ListingClient 
                listing={listing}
                currentUser={currentUser}
                reservations={reservations}
            />
        </div>
    )
}

export default ListingPage