// Convert Date data types to String
// The reason doing this is when we retrieve something from server side and pass to client side,
// will caught some data types error

import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    'createdAt'
> & {
    createdAt: string
}

export type SafeReservation = Omit<
    Reservation,
    'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
    createdAt: string
    startDate: string
    endDate: string
    listing: SafeListing
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
};