import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Phone, MapPin, ChevronLeft, ArrowRight } from 'lucide-react'
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../../components/Modals/ShowCard/PhotoGallery';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const ShowMarket = ({
    phone,
    facebook,
    instagram,
    website,
    AnnMultimedia,
    business_name,
    province,
    city,
    description,
    User,
    close
}) => (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
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
                <Box sx={{
                    position: 'absolute',
                    zIndex: 100,
                    bgcolor: 'rgba(0, 0, 0, 0.36)',
                    borderRadius: '100px',
                    left: 20,
                    top: 20
                }}>
                    <IconButton onClick={close}>
                        <ChevronLeft color="#fff" />
                    </IconButton>
                </Box>
                <PhotoGallery images={getImages(AnnMultimedia.map(item => item.name))} />
            </Box>
            <Box sx={{
                borderRadius: '24px 24px 0px 0px',
                display: 'flex',
                flexDirection: 'column',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
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
                        {business_name}
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
                        <Phone size={18} /><Box mr='10px' />  +{User.code_phone} {User.phone}
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
    </Slide>
)

export default ShowMarket
