import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Phone, MapPin, Trash2, Edit, ArrowRight } from 'lucide-react'
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../../components/Modals/ShowCard/PhotoGallery';
import Menu from '../../components/Menu';
import SettingsLayout from '../../layouts/SettingsLayout';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const ShowBusiness = ({ deleteBusiness, close, ...item }) => {
    const {
        phone,
        facebook,
        instagram,
        website,
        images,
        name,
        province,
        city,
        description
    } = item

    const renderMenu = () => (
        <Menu iconColor='#fff'>
            <Box sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Edit />
                <Box sx={{ paddingLeft: '0.5rem' }}>
                    Editar negocio
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center'
            }} onClick={() => {
                deleteBusiness(item)
            }}>
                <Trash2 />
                <Box sx={{ paddingLeft: '0.5rem' }}>
                    Eliminar negocio
                </Box>
            </Box>
        </Menu>
    )

    return (
        <SettingsLayout title='Negocio' handleGoBack={close}>
            <Box sx={{
                height: '100%',
                width: '100%'
            }}>
                <Box sx={{
                    flex: 1,
                    height: 300,
                    width: '100%',
                    position: 'relative'
                }}>
                    <PhotoGallery images={JSON.parse(images)} />
                </Box>
                <Box sx={{
                    borderRadius: '24px 24px 0px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    justifyContent: 'space-between'
                }}>
                    <Stack
                        orientation='vertical'
                        spacing={1}
                        sx={{ p: 2 }}
                    >
                        <Typography
                            variant="h5"
                            color="text.primary"
                            fontWeight={500}
                        >
                            {name}
                        </Typography>
                        <Button
                            color="info"
                            sx={{
                                padding: 0,
                                margin: 0,
                                justifyContent: 'start'
                            }}
                        >
                            <MapPin size={18} /> {city}, {province}
                        </Button>
                        <Typography
                            variant="subtitle1"
                            color="info.main"
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Phone size={18} /><Box mr='10px' />  {phone}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                        >
                            {description}
                        </Typography>
                    </Stack>
                    <Stack
                        orientation='vertical'
                        spacing={1}
                        sx={{ p: 2, width: 'fit-content' }}
                    >
                        {website && (
                            <Button
                                color="primary"
                                variant="contained"
                                target='_blank'
                                href={website}
                            >
                                Ir a la página
                                <ArrowRight />
                            </Button>
                        )}
                        {facebook && (
                            <Button
                                color="info"
                                variant="contained"
                                target='_blank'
                                href={facebook}
                            >
                                Ir a facebook
                                <ArrowRight />
                            </Button>
                        )}
                        {instagram && (
                            <Button
                                color="success"
                                variant="contained"
                                target='_blank'
                                href={instagram}
                            >
                                Ir a instagram
                                <ArrowRight />
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Box>
        </SettingsLayout>
    )
};

export default ShowBusiness
