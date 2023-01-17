import * as React from 'react';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MapPinIcon } from '../../assets/icons/MapPin.svg'
import { useGeolocated } from "react-geolocated";

export default function DetectLocation({ location }) {
    const navigate = useNavigate()
    const { coords, isGeolocationAvailable, getPosition, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            }
        }
    );

    React.useEffect(() => {
        if (coords) {
            navigate('/market')
        }
    }, [coords])

    return (
        <Dialog open={location.pathname == '/detect-location'}>
            <Box sx={{
                m: 1,
                display: 'flex',
                width: '350px',
                height: '350px',
                p: 3,
                color: theme => theme.palette.text.secondary,
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <Box component='h2' margin='0 0 1rem 0' color="text.primary">
                        Detectar ubicación
                    </Box>
                    <Box margin='0 auto' width='75%' textAlign='center'>
                        <MapPinIcon height='100px' width='100px' />
                        {(isGeolocationAvailable && isGeolocationEnabled) ? (
                            <Box>
                                Hemos detectado tu ubicación. Quieres activarla?
                            </Box>
                        ) : (
                            <Box>
                                Tu navegador no soporta la geolocalización o los permisos para la app no han sido actualizados.
                            </Box>
                        )}
                    </Box>
                    <Box>
                        <Box sx={{ p: 1 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                disabled={!isGeolocationAvailable || !isGeolocationEnabled}
                                onClick={getPosition}
                            >
                                Activar
                            </Button>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Button variant="contained" fullWidth sx={{
                                backgroundColor: '#ccc',
                                '&:hover': {
                                    color: '#fff',
                                    backgroundColor: alpha(`#000`, 0.3)
                                }
                            }} onClick={() => navigate('/home')}>
                                No por el momento
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
