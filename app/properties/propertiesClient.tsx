"use client";

import { SafeListing, SafeUser } from "../types";
import axios from "axios";
import { useCallback, useState } from "react";
import Container from "@/app/components/Container"
import Heading from "@/app/components/Heading"
import ListingCard from "@/app/components/listings/listingCard"
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface PropertiesClientProps {
  listings: SafeListing[]
  currentUser: SafeUser | null
}

const PropertiesClient = ({
  listings,
  currentUser
}: PropertiesClientProps) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Property Deleted!')
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong!')
      })
      .finally(() => {
        setDeletingId('');
      })
  },[router])

  return (
    <>
      <Container>
        <Heading 
          title="Properties"
          subtitle="List on your properties"
        />

        <div className="
          mt-10
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
          {listings.map((listing) => (
            <ListingCard 
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete Property"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  )
}

export default PropertiesClient