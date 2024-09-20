import prisma from '@/app/libs/prismadb';

export default async function getNonVerifiedListings() {
    try{
        const listings = await prisma.listing.findMany({
            where: {
                checkedByAdmin: "NOTCHECKED" 
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }));

        return safeListings;
    }
    catch (error: any){
        throw new Error(error);
    }
}