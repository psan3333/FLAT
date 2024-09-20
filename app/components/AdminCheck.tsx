"use client";

import useAdminCheck from "../hooks/useAdminCheck";
import { FaRegTrashCan, FaCheck } from "react-icons/fa6";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface AdminCheckProps {
    listingId: string;
}

const AdminCheck: React.FC<AdminCheckProps> = ({
    listingId
}) => {

    const {
        checkListing,
        deleteListing
    } = useAdminCheck({
        listingId
    });

    return (
        <div className="ml-3 mr-3 flex flex-row justify-between">
            <div
                onClick={checkListing}
                className="
                    relative
                    bg-white
                    hover:opacity-80
                    transition
                    cursor-pointer
                    rounded-md
                    p-[2px]
                "
            >
                <FaCheck
                    size={32}
                />
            </div>
            <div
                onClick={deleteListing}
                className="
                    relative
                    bg-white
                    hover:opacity-80
                    transition
                    cursor-pointer
                    rounded-md
                    p-[2px]
                "
            >
                <FaRegTrashCan
                    size={32}
                />
            </div>
        </div>
    );
}
 
export default AdminCheck;