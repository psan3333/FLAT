"use client";

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import Heading from "../Heading";
import FlatLocationMap from "../FlatLocationMap";

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    locationValue: [number, number];
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    roomCount,
    bathroomCount,
    locationValue
}) => {

    const bathroomString = bathroomCount === 1 ? 'ванна' : bathroomCount <= 4 ? 'ванны' : 'ванн';
    const roomString = roomCount === 1 ? 'комната' : roomCount <= 4 ? 'комнаты' : 'комнат';

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="
                        text-xl 
                        font-semibold 
                        flex 
                        flex-row 
                        items-center
                        gap-2
                    "
                >
                    <div>Собственник: {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="
                        flex 
                        flex-row 
                        items-center 
                        gap-4 
                        font-light
                        text-neutral-500
                    "
                >
                    <div>
                        {roomCount} {roomString}
                    </div>
                    <div>
                        {bathroomCount} {bathroomString}
                    </div>
                </div>
            </div>
            <hr />
            {/* {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category?.label}
                    description={category?.description}
                />
            )}
            <hr /> */}
            <Heading
                title='Описание'
                subtitle={description}
            />
            <hr />
            <div className="text-2xl font-bold">Положение на карте</div>
            <FlatLocationMap
                location={locationValue}
                modules="Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon,geocode,package.full"
            />
        </div>
    );
}

export default ListingInfo;