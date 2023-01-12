import * as React from 'react'
import {
    MapContainer,
    TileLayer,
    Popup,
    Marker
} from 'react-leaflet'
import TextInput from './TextInput'
import { getMarkerPosition } from '../../utils/getMarkerPosition';

const MapInput = ({ control, watch, setValue }) => {
    const markerPosition = getMarkerPosition(watch)
    const markerRef = React.useRef(null)
    const eventHandlers = React.useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current

                if (marker != null) {
                    const { lat, lng } = marker.getLatLng()

                    setValue('lat', lat)
                    setValue('lng', lng)
                }
            },
        }),
        [],
    )

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
                name="lng"
                sx={{
                    display: 'none'
                }}
            />
            <MapContainer center={markerPosition} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
