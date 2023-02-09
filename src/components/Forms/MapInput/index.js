import * as React from 'react'
import {
    MapContainer,
    TileLayer,
    Popup,
    Marker
} from 'react-leaflet'
import TextInput from '../TextInput'
import { getMarkerPosition } from '../../../utils/getMarkerPosition';
import LeafletControlGeocoder from './Geocoder';

const MapInput = ({ control, watch, setValue }) => {
    const markerPosition = getMarkerPosition(watch)
    const province = watch('province')
    const city = watch('city')
    const markerRef = React.useRef(null)

    const eventHandlers = React.useMemo(() => ({
        dragend() {
            const marker = markerRef.current
            if (marker != null) {
                const { lat, lng } = marker.getLatLng()

                setValue('lat', lat)
                setValue('leng', lng)
            }
        },
    }), [])

    const setMarkerPosition = (coords) => {
        setValue('lat', coords.lat)
        setValue('leng', coords.lng) // HAcer esto me genera un rerender
    }

    return (
        <>
            <TextInput
                control={control}
                name="lat"
                sx={{
                    display: 'none'
                }}
            />
            <TextInput
                control={control}
                name="leng"
                sx={{
                    display: 'none'
                }}
            />
            <MapContainer
                center={markerPosition}
                zoom={16}
                scrollWheelZoom={false}
                key={JSON.stringify(markerPosition)}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LeafletControlGeocoder
                    province={province && province.nombre}
                    city={city && city.nombre}
                    setMarker={setMarkerPosition}
                />
                <Marker
                    draggable={true}
                    eventHandlers={eventHandlers}
                    position={markerPosition}
                    ref={markerRef}
                >
                    <Popup minWidth={90} />
                </Marker>
            </MapContainer>
        </>
    )
}

export default MapInput;
