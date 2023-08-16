import * as React from 'react';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useAuth, setUserCoords } from '../../context/AuthContext';
import { useGeolocation } from '../../utils/useGeolocation';

export default function DetectLocation({ location }) {
    const navigate = useNavigate()
    const {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        getPosition
    } = useGeolocation()
    const { dispatch } = useAuth()

    React.useEffect(() => {
        if (coords) {
            setUserCoords(dispatch, coords)
            navigate('/market')
        }
    }, [coords])

    return (
        <Dialog open={location.pathname == '/detect-location'}>
            <Box sx={{
                m: 1,
                display: 'flex',
                width: { md: '350px', sm: '320px' },
                height: { md: '350px', sm: 'fit-content' },
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
                        <MapPin size={100} color={'#626B74'} />
                        <Box m={3}>
                            {!isGeolocationAvailable ? (
                                <Typography variant="body2">
                                    Tu navegador no soporta la geolocalización
                                </Typography>
                            ) : isGeolocationEnabled ? (
                                <Typography variant="body2">
                                    Actualiza los permisos de geolocalización de tu navegador.
                                </Typography>
                            ) : coords && (
                                <Typography variant="body2">
                                    La geolocalización está activa.
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{ p: 1 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                disabled={isGeolocationEnabled}
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
                            }} onClick={() => navigate('/market')}>
                                No por el momento
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
