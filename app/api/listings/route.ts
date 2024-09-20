import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    } = body;

    // Object.keys(body).forEach((value: any) => {
    //     if (!body[value]) {

    //     }
    // });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            roomCount,
            bathroomCount,
            guestCount,
            latitude: location[0],
            longitude: location[1],
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}
