import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SettingsLayout from '../../layouts/SettingsLayout';
import {
    MapContainer,
    TileLayer,
    Popup,
    Marker
} from 'react-leaflet'

const ShowBusinessLocation = ({
    business_name,
    lat,
    leng,
    business_dir,
    province,
    city,
    close
}) => (
    <SettingsLayout
        title={business_name}
        handleGoBack={close}
    >
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box p={2}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight={500}
                    gutterBottom
                >
                    Dirección
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight={400}
                    gutterBottom
                >
                    {business_dir}, {province}, {city}
                </Typography>
            </Box>
            <Box p={2}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight={500}
                    gutterBottom
                >
                    Ubicar dentro de mapa
                </Typography>
                <MapContainer center={{ lat: lat, lng: leng }} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={{ lat: lat, lng: leng }}>
                        <Popup minWidth={90} />
                    </Marker>
                </MapContainer>
            </Box>
        </Box>
    </SettingsLayout>
)

export default ShowBusinessLocation
