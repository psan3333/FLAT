"use client";

import { YMaps, Map, Placemark, SearchControl } from '@pbe/react-yandex-maps';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ymaps, { GeocodeResult } from 'yandex-maps';

interface ChooseAddressMapProps {
    modules: string;
    value: [number, number];
    onChange: (coords: [number, number]) => void;
}

const ChooseAddressMap: React.FC<ChooseAddressMapProps> = ({
    modules,
    value,
    onChange
}) => {

    const mapRef = useRef<typeof ymaps | null>(null);
    const [addressString, setAddressString] = useState('');

    const getLocation = useCallback((e: ymaps.IEvent<MouseEvent, {}>) => {
        const coords = e.get('coords');
        onChange(coords);

        // try {
            
        // }
        // catch (e) {
        //     console.log(e);
        // }
    }, [onChange]);

    const getAddress = useCallback((api: typeof ymaps) => {
        const response = api.geocode(value);
        response?.then((resp) => {
            const result = (resp.geoObjects.get(0) as GeocodeResult).getAddressLine();
            console.log(result);
            setAddressString(result);
        });
    }, [value]);

    useEffect(() => {
        setAddressString(addressString);
    }, [addressString]);

    return (
        <>
            {modules && (
                <YMaps
                    query={{
                        apikey: process.env.YANDEX_MAPS_API_KEY,
                        suggest_apikey: process.env.YANDEX_MAPS_SUGGEST_API_KEY,
                        ns: "use-load-option",
                        lang: "ru_RU",
                        load: modules,
                    }}
                >
                    <Map
                        state={{
                            center: value,
                            zoom: 9,
                        }}
                        width={'100%'}
                        height={500}
                        onClick={getLocation}
                        modules={["control.ZoomControl", "control.FullscreenControl", "control.SearchControl"]}
                        onLoad={(api: typeof ymaps) => getAddress(api)}
                    >
                        <Placemark
                            geometry={value}
                            properties={{
                                balloonContentBody: `Адрес: ${addressString}` // тут надо будет сделать отдельное крвсивое окошко для отображения ссылки
                            }}
                        />
                        <SearchControl
                            options={{
                                provider: 'yandex#map',
                            }}
                        />
                    </Map>
                </YMaps>
            )}
        </>
    );
}

export default ChooseAddressMap;
