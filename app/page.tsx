import getCurrentUser from "./actions/getCurrentUser";
import getVerifiedListings from "./actions/getVerifiedListings";

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import OfferBanner from "./components/OfferBanner";
import { SafeListing } from "./types";

export default async function Home() {
  const listings = await getVerifiedListings();
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <OfferBanner />
      <Container>
        {listings.length > 0 && (<div
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
              />
            );
          })}
        </div>)}
      </Container>
    </ClientOnly>
  );
}
