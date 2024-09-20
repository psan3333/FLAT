"use client";

import Image from 'next/image';

const OfferBanner = () => {
    return (
        <div
            className="
                relative
                w-full
                h-[900px]
                flex 
                flex-col
                items-center
                overflow-auto
            "
        >
            <div
                className="
                    relative
                    w-full
                    h-full
                    bg-black/50
                    z-10
                    flex 
                    flex-col
                    items-center
                    gap-10
                "
            >
                <div
                    className='
                        relative
                        mt-72
                        w-[60%]
                        text-white
                        text-9xl
                        text-center
                        font-roboto
                    '
                >
                    FLAT
                </div>
                <div
                    className='
                        pt-10
                        relative
                        text-white
                        text-4xl
                        w-[60%]
                        lg:w-[40%]
                        font-roboto
                        text-center
                    '
                >
                    Ваш помощник при съеме квартир
                </div>
            </div>
            <Image
                alt="Banner"
                src="/images/apartament.jpg"
                fill
                className='
                    object-cover
                '
            />
            <Image
                alt="Down Arrow"
                src="/images/down_arrow_white.png"
                className="
                    absolute
                    z-20
                    bottom-10
                "
                height={80}
                width={80}
            />
        </div>
    );
}

export default OfferBanner;