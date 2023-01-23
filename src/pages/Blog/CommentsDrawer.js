import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DialogTitle from '../../components/DialogTitle';
import TextInput from '../../components/Forms/TextInput';
import { useForm } from "react-hook-form";
import { alpha } from '@mui/material';
import { useGeolocated } from 'react-geolocated';

const CommentsDrawer = ({ openComments, handleClose }) => {
    const { control, handleSubmit, watch, reset, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
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

        handleClose();
    };

    const resetFilter = () => {}

    const onSubmit = async values => {
        const parsedData = {};

        try {
            let {
                province,
                city,
                distance
            } = values;

            if (province) {
                parsedData.province = province.nombre;
            }
            if (city) {
                parsedData.city = city.nombre;
            }
            if (distance) {
                const { latitude, longitude } = coords

                parsedData.lat = latitude
                parsedData.lon = longitude
                parsedData.km = distance;
            }

            // await fetchBusinesses(dispatch, parsedData)
        } catch (error) {
            console.log(error)
        }
    };

    const list = (anchor) => (
        <Box onKeyDown={toggleDrawer(anchor, false)} component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle onClose={toggleDrawer(anchor, false)}>
                Comentarios
            </DialogTitle>
            <Divider />
            <Box sx={{ p: 3 }}>
                <TextInput
                    name='comment'
                    control={control}
                    placeholder="Escribe un comentario"
                />
            </Box>
        </Box>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Drawer
                    anchor={'bottom'}
                    open={openComments}
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
                        container: document.getElementById('comments-drawer-container'),
                        style: { position: 'absolute' }
                    }}
                >
                    {list('bottom')}
                </Drawer>
            </Box>
        </Box>
    );
}

export default CommentsDrawer
