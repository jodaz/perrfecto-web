import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '../DialogTitle';
import { MapPin, ChevronLeft, X } from 'lucide-react';
import { alpha } from '@mui/material';
import { useGeolocated } from 'react-geolocated';
import { useNavigate } from 'react-router-dom';

const GeolocationDrawer = () => {
    const navigate = useNavigate()
    const { coords, isGeolocationAvailable, getPosition, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            }
        }
    );

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    };

    const list = (anchor) => (
        <Box onKeyDown={toggleDrawer(anchor, false)}>
            <DialogTitle>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <IconButton onClick={toggleDrawer(anchor, false)}>
                        <ChevronLeft />
                    </IconButton>
                    <Typography variant="subtitle1" fontWeight={500}>
                        Activar geolocalización
                    </Typography>
                    <IconButton onClick={toggleDrawer(anchor, false)}>
                        <X />
                    </IconButton>
                </Box>
            </DialogTitle>
            <Box sx={{
                m: 1,
                display: 'flex',
                p: 3,
                color: theme => theme.palette.text.secondary,
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <Box margin='0 auto' width='75%' textAlign='center'>
                        <MapPin size={100} color={'#626B74'} />
                        <Box m={3}>
                            {(isGeolocationAvailable && isGeolocationEnabled) ? (
                                <Typography variant="body2">
                                    Hemos detectado tu ubicación. ¿Quieres activarla?
                                </Typography>
                            ) : (
                                <Typography variant="body2">
                                    Tu navegador no soporta la geolocalización o los permisos para la app no han sido actualizados.
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
                            }} onClick={() => navigate('/market')}>
                                No por el momento
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Drawer
                    anchor={'bottom'}
                    open={true}
                    onClose={toggleDrawer('bottom', false)}
                    sx={{
                        '& .MuiPaper-root': {
                            position: 'absolute',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            width: '99%',
                            bottom: 0
                        },
                    }}
                    PaperProps={{ style: { position: 'absolute' } }}
                    BackdropProps={{ style: { position: 'absolute' } }}
                    ModalProps={{
                        container: document.getElementById('drawer-container'),
                        style: { position: 'absolute' }
                    }}
                >
                    {list('bottom')}
                </Drawer>
            </Box>
        </Box>
    );
}

export default GeolocationDrawer
