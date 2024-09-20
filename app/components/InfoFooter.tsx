"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const InfoFooter = () => {

    const router = useRouter();

    return (
        <div className="
            bg-yellow-500/50
            mt-10 
            w-full 
            lg:h-[300px] 
            md:h-auto
            flex 
            lg:flex-row 
            sm:flex-col
            lg:justify-between
            sm:justify-center
            p-10 
            gap-10
        ">
            <Image
                onClick={() => router.push('/')}
                alt="Logo"
                className='
                    h-150 
                    w-auto 
                    hidden 
                    md:block 
                    cursor-pointer
                '
                width={0}
                height={0}
                sizes="100vw"
                src='/images/flat_logo.png'
            />
            <div className="flex lg:flex-col md:flex-row justify-center gap-4">
                <a target="_blank" href="https://vk.com/flat_corporation">
                    <Image
                        src="/images/vk96x96.png"
                        alt="VK"
                        height={60}
                        width={60}
                    />
                </a>
                <a target="_blank" href="https://t.me/flatacadem">
                    <Image
                        src="/images/telegram96x96.png"
                        alt="Telegram"
                        height={60}
                        width={60}
                    />
                </a>
            </div>
        </div>
    );
}
export default InfoFooter;