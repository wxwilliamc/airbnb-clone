// Actions
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
// Components
import { EmptyState, ListingClient } from "@/app/components";

interface IParams {
    listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

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
            />
        </div>
    )
}

export default ListingPage