"use client";

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";


interface ListingHeadProps {
    title: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    id,
    currentUser
}) => {

    return (
        <>
            <Heading
                title={title}
            />
            <div
                className="
                    w-full
                    h-[50vh]
                    overflow-hidden
                    rounded-xl
                    relative
                "
            >
                <Image
                    alt="Image"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
}
 
export default ListingHead;