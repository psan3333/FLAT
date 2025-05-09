"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import useRentModal from "@/app/hooks/useRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

interface UserMenuProps{
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser){
            return loginModal.onOpen();
        }

        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    return ( 
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        bg-neutral-100
                        hover:bg-neutral-200
                        transition
                        cursor-pointer
                    "
                >
                    Добавить объявление
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    ">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                {currentUser.role === "ADMIN" &&
                                    <MenuItem
                                        onClick={() => router.push('/admin')}
                                        label="Средства администрирования"
                                    />
                                }
                                {/* <MenuItem
                                    onClick={() => router.push('/trips')}
                                    label="My trips"
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label="My favorites"
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label="My reservations"
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label="My properties"
                                />
                                <MenuItem
                                    onClick={rentModal.onOpen}
                                    label="AirBNB my home"
                                /> */}
                                <hr/>
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Выйти из аккаунта"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Войти"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Зарегестрироваться"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default UserMenu;