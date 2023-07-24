// Call if enable / disable the favorite (Heart Button)

// Axios
import axios from "axios";
// Next Module
import { useRouter } from "next/navigation";
// React Module
import { useCallback, useMemo } from "react";
// Toaster
import { toast } from "react-hot-toast";
// Types
import { SafeUser } from "../types";
// Hooks
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    // Check current user have any favoriteIds
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId])

    // Call if click on heart button
    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        // Return to login page if try to add to favorite without login
        if(!currentUser){
            return loginModal.onOpen();
        }

        try {
            let request;
            
            if(hasFavorited){
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong.');
        }

    }, [currentUser, hasFavorited, listingId, loginModal, router]);

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;
