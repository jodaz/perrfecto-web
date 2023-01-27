import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Phone, MapPin, Edit, ArrowRight, Star } from 'lucide-react'
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../../components/Modals/ShowCard/PhotoGallery';
import Menu from '../../components/Menu';
import SettingsLayout from '../../layouts/SettingsLayout';
import FeatureBusiness from '../../components/Modals/FeatureBusiness';
import ShowBusinessLocation from './ShowBusinessLocation';
import LinkBehavior from '../../components/LinkBehavior';
import { useAuth } from '../../context/AuthContext'

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const ShowBusiness = ({ close, ...item }) => {
    const { state: { user } } = useAuth()
    const [featureBusiness, setFeatureBusiness] = React.useState(false)
    const {
        facebook,
        instagram,
        whatsApp,
        web_site,
        AnnMultimedia,
        name,
        province,
        city,
        description,
        business_name,
    } = item
    const [showBusinessLocation, setShowBusinessLocation] = React.useState(false)

    const handleOpenShowBusinessLocation = async () => {
        setShowBusinessLocation(true);
    }

    const handleCloseShowBusinessLocation = () => {
        setShowBusinessLocation(false)
    }

   const toggleFeatureBusiness = () => setFeatureBusiness(!featureBusiness)

    const renderMenu = () => (
        <Menu>
            <Box onClick={toggleFeatureBusiness}
                sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'unset',
                textDecoration: 'none',
            }}>
                <Star />
                <Box sx={{ paddingLeft: '0.5rem' }}>
                    Destacar negocio
                </Box>
            </Box>
            <Box component={LinkBehavior}
                sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'unset',
                textDecoration: 'none',
            }} to='/businesses/edit'>
                <Edit />
                <Box sx={{ paddingLeft: '0.5rem' }}>
                    Editar negocio
                </Box>
            </Box>
        </Menu>
    )

    if (showBusinessLocation) {
        return (
            <ShowBusinessLocation
                close={handleCloseShowBusinessLocation}
                {...item}
            />
        )
    }

    return (
        <SettingsLayout
            title={business_name}
            handleGoBack={close}
            rightIconComponent={renderMenu()}
        >
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
                    <PhotoGallery images={getImages(AnnMultimedia.map(item => item.name))} />
                </Box>
                <Box sx={{
                    borderRadius: '24px 24px 0px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    justifyContent: 'space-between'
                }}>
                    {(user.featured) && (
                        <Box sx={{ margin: '10px 10px 0 0', alignSelf: 'end' }}>
                            <Tooltip title="Debe esperar 24 horas para que su negocio deje de ser destacado.">
                                <Star color='#F59E0B' />
                            </Tooltip>
                        </Box>
                    )}
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
                            onClick={handleOpenShowBusinessLocation}
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
                            >
                                <Phone size={18} /><Box mr='10px' />  {whatsApp}
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
                                href={web_site}
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
                <FeatureBusiness
                    open={featureBusiness}
                    handleClose={toggleFeatureBusiness}
                    closeBusiness={close}
                    item={item}
                />
            </Box>
        </SettingsLayout>
    )
};

export default ShowBusiness
