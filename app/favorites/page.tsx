import { EmptyState, FavoritesClient } from "../components"
// Actions
import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings"

const FavoritesPage = async () => {

    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length === 0){
        return (
            <EmptyState 
                title="No favorites found"
                subtitle="Looks like you have no favorite listings here. Go add some."
            />
        )
    }

    if(!currentUser){
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    return (
        <>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />            
        </>
    )

  
}

export default FavoritesPage