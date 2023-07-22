import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
){
    // Check User Login Status
    const currentUser = await getCurrentUser();

    // Response error if user is not logged in
    if(!currentUser){
        return NextResponse.error();
    }

    // Extracts from params object
    const { listingId } = params;

    // If empty value || not string type, throw error message
    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid ID');
    }

    // Have a copy of user favoriteIds
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    // Add the listingId to user favoriteIds
    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        // Which user to be update
        where: {
            id: currentUser.id
        },
        // Data to be updated
        data: {
            favoriteIds
        }
    });
    
    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
){
    // Check User login status
    const currentUser = await getCurrentUser();

    // User no logged in, response error
    if(!currentUser){
        return NextResponse.error();
    }

    // Extracts from params object
    const { listingId } = params;

    // If empty value || not string type, throw error message
    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid ID');
    }

    // Have a copy of user favoriteIds
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    // Remove listingId
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma?.user.update({
        // Which user to update
        where: {
            id: currentUser.id
        },
        // Data to be updated
        data: {
            favoriteIds
        }
    })

    return NextResponse.json(user);
}