"use client";
// Components
import { Container, ListingHead, ListingInfo } from "@/app/components";
// Category Data
import { categories } from "@/app/components/navbar/categories";
import { SafeListing, SafeUser } from "@/app/types"
// Prisma
import { Reservation } from "@prisma/client"
// React Module
import { useMemo } from "react";

interface ListingClientProps {
    reservations?: Reservation[]
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser
}) => {

    // Match the category label
    // If match, able to get the category icon & desc
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category])

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                        "
                    >
                        <ListingInfo 
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient