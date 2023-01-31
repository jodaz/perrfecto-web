import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Phone, MapPin, ChevronLeft, ArrowRight } from 'lucide-react'
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../../components/Modals/ShowCard/PhotoGallery';
import ShowBusinessLocation from '../Businesses/ShowBusinessLocation';
import ContactBusiness from '../../components/Modals/ContactBusiness';
import { useBusinesses, resetItem } from '../../context/BusinessContext';
import { ReactComponent as RocketIcon } from '../../assets/icons/Rocket.svg'

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const ShowMarket = () => {
    const { state: { selectedItem: { item } }, dispatch } = useBusinesses();
    const [openContactDialog, setOpenContactDialog] = React.useState(false)
    const [showBusinessLocation, setShowBusinessLocation] = React.useState(false)

    const handleOpenShowBusinessLocation = async () => {
        setShowBusinessLocation(true);
    }

    const handleCloseShowBusinessLocation = () => {
        setShowBusinessLocation(false)
    }

    if (showBusinessLocation) {
        return (
            <ShowBusinessLocation
                close={handleCloseShowBusinessLocation}
                {...item}
            />
        )
    }

    const {
        facebook,
        instagram,
        web_site,
        AnnMultimedia,
        business_name,
        province,
        city,
        description,
        whatsApp
    } = item

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                height: '100%',
                width: '100%'
            }}>
                <Box sx={{
                    flex: 1,
                    height: 300,
                    width: '100%',
                    position: 'relative',
                    justifyContent: 'center',
                    display: 'flex'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        zIndex: 100,
                        bgcolor: 'rgba(0, 0, 0, 0.36)',
                        borderRadius: '100px',
                        left: 20,
                        top: 20
                    }}>
                        <IconButton onClick={() => resetItem(dispatch)}>
                            <ChevronLeft color="#fff" />
                        </IconButton>
                    </Box>
                    {AnnMultimedia.length ? (
                        <PhotoGallery images={getImages(AnnMultimedia.map(item => item.name))} />
                    ) : <RocketIcon />}
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
                            onClick={() => handleOpenShowBusinessLocation(item)}
                        >
                            <MapPin size={18} /> {city}, {province}
                        </Button>
                        {whatsApp && (
                            <Typography
                                variant="subtitle1"
                                color="info.main"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                onClick={() => setOpenContactDialog(true)}
                            >
                                <Phone size={18} /><Box mr='10px' />  +{whatsApp}
                            </Typography>
                        )}
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
                        {web_site && (
                            <Button
                                color="primary"
                                variant="contained"
                                target='_blank'
                                href={`//${web_site}`}
                                component={Link}
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
                                href={`//${facebook}`}
                                component={Link}
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
                                href={`//${instagram}`}
                            >
                                Ir a instagram
                                <ArrowRight />
                            </Button>
                        )}
                    </Stack>
                    {openContactDialog && (
                        <ContactBusiness
                            {...item}
                            open={openContactDialog}
                            handleClose={() => setOpenContactDialog(false)}
                        />
                    )}
                </Box>
            </Box>
        </Slide>
    )
}

export default ShowMarket
