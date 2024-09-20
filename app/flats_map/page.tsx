"use client";

import { YMaps, Map, Placemark, SearchControl } from '@pbe/react-yandex-maps';
import Container from '../components/Container';
import { useCallback, useEffect, useState } from 'react';

export default function Intro() {

    return (
        <Container>
            <YMaps
                query={{
                    apikey: process.env.YANDEX_MAPS_API_KEY,
                    suggest_apikey: process.env.YANDEX_MAPS_SUGGEST_API_KEY,
                    ns: "use-load-option",
                    load: "Map,Placemark,control.SearchControl,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
                }}
            >
                <Map
                    defaultState={{
                        center: [55.75, 37.57],
                        zoom: 9,
                        controls: ["zoomControl", "fullscreenControl"],
                    }}
                    options={{
                        exitFullscreenByEsc: true
                    }}
                    width={'100%'}
                    height={500}
                >
                    <SearchControl
                        options={{
                            provider: 'yandex#map',
                        }}
                    />
                </Map>
            </YMaps>
        </Container>
    );
}

