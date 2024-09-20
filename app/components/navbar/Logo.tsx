"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push('/')}
            alt="Logo"
            className='h-[100px] w-auto hidden md:block cursor-pointer'
            width={0}
            height={0}
            sizes="100vw"
            src='/images/flat_logo.png'
        />
    );
}

export default Logo;
