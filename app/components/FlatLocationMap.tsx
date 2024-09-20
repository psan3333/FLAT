"use client";

import { YMaps, Map, Placemark, SearchControl } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';
import ymaps, { GeocodeResult } from 'yandex-maps';

interface FlatLocationMapProps {
    location: [number, number];
    modules: string;
}

const FlatLocationMap: React.FC<FlatLocationMapProps> = ({
    location,
    modules
}) => {
    const [addressString, setAddressString] = useState("");
    const [maps, setMaps] = useState<typeof ymaps>();
    const response = maps?.geocode(location);
    response?.then((resp) => {
        setAddressString((resp.geoObjects.get(0) as GeocodeResult).getAddressLine());
    });

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
                        load: modules,
                    }}
                >
                    <Map
                        defaultState={{
                            center: location,
                            zoom: 9,
                        }}
                        width={'100%'}
                        height={500}
                        onLoad={ymaps => setMaps(ymaps)}
                    >
                        <Placemark
                            geometry={location}
                            properties={{
                                balloonContentBody: `Адрес: ${addressString}` // тут надо будет сделать отдельное крвсивое окошко для отображения ссылки
                            }}
                        />
                    </Map>
                </YMaps>
            )}
        </>
    );
}

export default FlatLocationMap;