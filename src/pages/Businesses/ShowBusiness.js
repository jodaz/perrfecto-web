import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { Phone, MapPin, Edit, ArrowRight, Star } from 'lucide-react'
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../../components/Modals/ShowCard/PhotoGallery';
import Menu from '../../components/Menu';
import SettingsLayout from '../../layouts/SettingsLayout';
import FeatureBusiness from '../../components/Modals/FeatureBusiness';
import { ReactComponent as RocketIcon } from '../../assets/icons/Rocket.svg'
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce';
import { useParams } from 'react-router-dom';
import LinkBehavior from '../../components/LinkBehavior';
import LoadingIndicator from '../../components/LoadingIndicator';
import ContactBusiness from '../../components/Modals/ContactBusiness';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const ShowBusinessLayout = item => {
    const [featureBusiness, setFeatureBusiness] = React.useState(false)
    const [openContactDialog, setOpenContactDialog] = React.useState(false)

    const toggleOpenContactDialog = () => setOpenContactDialog(!openContactDialog)

    const toggleFeatureBusiness = () => setFeatureBusiness(!featureBusiness)

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

    const renderMenu = () => (
        <Menu>
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'unset',
                textDecoration: 'none',
            }} onClick={toggleFeatureBusiness}>
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

    return (
        <SettingsLayout
            title={business_name}
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
                    position: 'relative',
                    justifyContent: 'center',
                    display: 'flex'
                }}>
                    {AnnMultimedia.length ? (
                        <Box sx={{
                            flex: 1,
                            height: '100%',
                            width: '100%'
                        }}>
                            <PhotoGallery
                                images={getImages(AnnMultimedia.map(item => item.name))}
                            />
                        </Box>
                    ) : <RocketIcon />}
                </Box>
                <Box sx={{
                    borderRadius: '24px 24px 0px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ margin: '10px 10px 0 0', alignSelf: 'end' }}>
                        <Tooltip title="Debe esperar 24 horas para que su negocio deje de ser destacado.">
                            <Star color='#F59E0B' />
                        </Tooltip>
                    </Box>
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
                            component={LinkBehavior}
                            to={`location`}
                            state={item}
                        >
                            <MapPin size={18} /> {city}, {province}
                        </Button>
                        {whatsApp && (
                            <Typography
                                variant="subtitle1"
                                color="info.main"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={toggleOpenContactDialog}
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
                </Box>
                <FeatureBusiness
                    open={featureBusiness}
                    handleClose={toggleFeatureBusiness}
                    item={item}
                />
                {openContactDialog && (
                    <ContactBusiness
                        {...item}
                        open={openContactDialog}
                        handleClose={toggleOpenContactDialog}
                    />
                )}
            </Box>
        </SettingsLayout>
    )
};

const ShowBusiness = () => {
    const [data, setData] = React.useState(null)
    const { id } = useParams()

    const fetchBusiness = async () => {
        try {
            const res = await apiProvider.get(`/api/business-ann/business/${id}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setData(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    useEffectOnce(() => { fetchBusiness() }, [])

    if (!data) return <LoadingIndicator />

    return <ShowBusinessLayout {...data} />
}

export default ShowBusiness
