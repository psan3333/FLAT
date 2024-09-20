import getCurrentUser from "@/app/actions/getCurrentUser";
import getLisitngById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import AdminClient from "./AdminClient";
import Container from "../components/Container";
import getNonVerifiedListings from "../actions/getNonVerifiedListings";
import { SafeListing } from "../types";
import ListingCard from "../components/listings/ListingCard";

const UserPage = async () => {

    const currentUser = await getCurrentUser();
    const listings = await getNonVerifiedListings();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <Container>
                <div
                    className="
                        pt-24
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        2xl:grid-cols-6
                        gap-8
                    "
                >
                    {listings.map((listing: SafeListing) => {
                        return (
                            <ListingCard
                                currentUser={currentUser}
                                key={listing.id}
                                data={listing}
                                actionLabel="Checked"
                                isAdmin={currentUser.role === "ADMIN"}
                            />
                        );
                    })}
                </div>
            </Container>
        </ClientOnly>
    );
}

export default UserPage;