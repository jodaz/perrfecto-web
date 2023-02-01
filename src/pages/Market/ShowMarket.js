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
import ContactBusiness from '../../components/Modals/ContactBusiness';
import { ReactComponent as RocketIcon } from '../../assets/icons/Rocket.svg'
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce';
import { useParams } from 'react-router-dom';
import LinkBehavior from '../../components/LinkBehavior';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const ShowMarketLayout = item => {
    const [openContactDialog, setOpenContactDialog] = React.useState(false)

    const toggleOpenContactDialog = () => setOpenContactDialog(!openContactDialog)

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
                        <IconButton
                            component={LinkBehavior}
                            to={-1}
                        >
                            <ChevronLeft color="#fff" />
                        </IconButton>
                    </Box>
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
                            handleClose={toggleOpenContactDialog}
                        />
                    )}
                </Box>
            </Box>
        </Slide>
    )
}

const ShowMarket = () => {
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

    if (!data) return <></>

    return <ShowMarketLayout {...data} />
}

export default ShowMarket
