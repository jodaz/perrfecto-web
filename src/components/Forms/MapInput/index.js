import * as React from 'react'
import {
    MapContainer,
    TileLayer
} from 'react-leaflet'
import TextInput from '../TextInput'
import { getMarkerPosition } from '../../../utils/getMarkerPosition';
import LeafletControlGeocoder from './Geocoder';

const MapInput = ({ control, watch, setValue }) => {
    const markerPosition = getMarkerPosition(watch)
    const province = watch('province')
    const city = watch('city')

    const markerRef = React.useRef(null)
    const eventHandlers = React.useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current

                if (marker != null) {
                    const { lat, lng } = marker.getLatLng()

                    setValue('lat', lat)
                    setValue('leng', lng)
                }
            },
        }),
        [],
    )

    console.log(province, city)

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
            <MapContainer center={markerPosition} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LeafletControlGeocoder
                    province={province.nombre}
                    city={city.nombre}
                />
            </MapContainer>
        </>
    )
}

export default MapInput;
