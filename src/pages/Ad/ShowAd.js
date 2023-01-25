import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { ChevronLeft, MoreVertical } from 'lucide-react'
import LinkBehavior from '../../components/LinkBehavior';
import MessageIconButton from '../../components/Buttons/MessageButton/MessageIconButton';
import ListCertificates from '../certificates/ListCertificates'
import ShowVaccines from '../Vaccines/ShowVaccines';
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../../components/Modals/ShowCard/PhotoGallery';
import { useAuth } from '../../context/AuthContext';
import LikeIconButton from '../../components/Buttons/LikeButton/LikeIconButton';
import DogInformation from './DogInformation';
import AdOptionsDrawer from './AdOptionsDrawer';
import Menu from '../../components/Menu';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const ShowAd = () => {
    const [openMenu, setOpenMenu] = React.useState(false)
    const { state: { user: { publication, dog, ...restUser } } } = useAuth()
    const {
        multimedia,
        description,
        LikesCount
    } = publication;
    const adPictures = getImages(JSON.parse(multimedia))

    const toggleMenu = () => setOpenMenu(!openMenu)

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                height: '660px',
                width: '350px',
                maxWidth: '350px',
                backgroundColor: '#fff',
                borderRadius: '9px'
            }}  id='showAd-drawer-container'>
                <Box sx={{
                    flex: 1,
                    height: 300,
                    width: '100%',
                    position: 'relative',
                    borderRadius: '9px 9px 0 0'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        zIndex: 100,
                        bgcolor: 'rgba(0, 0, 0, 0.36)',
                        borderRadius: '100px',
                        left: 20,
                        top: 20
                    }}>
                        <IconButton component={LinkBehavior} to='/profile'>
                            <ChevronLeft color="#fff" />
                        </IconButton>
                    </Box>
                    <PhotoGallery images={adPictures} />
                </Box>
                <Box sx={{
                    borderRadius: '24px 24px 0px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '320px',
                    p: 4
                }}>
                    <Box sx={{
                        display: 'flex',
                        width: '100%'
                    }}>
                        <Box sx={{
                            flex: 1
                        }}>
                            <DogInformation hideTitle />
                        </Box>
                        <Box>
                            {/* <IconButton onClick={toggleMenu}>
                                <MoreVertical />
                            </IconButton> */}
                            <Menu icon={<MoreVertical />}>
                                <Box
                                    component={LinkBehavior}
                                    to={`/profile/ads/${publication.id}/edit`}
                                    width='inherit'
                                    sx={{ textDecoration: 'none', color: 'unset' }}
                                >
                                    Editar anuncio
                                </Box>
                            </Menu>
                        </Box>
                    </Box>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        mt={2}
                    >
                        {description}
                    </Typography>
                    <Stack spacing={2} direction="row" mt={2}>
                        {!!dog.Vaccines.length && (
                            <Box sx={{ p: 1 }}>
                                <ShowVaccines
                                    name={restUser.name}
                                    lastName={restUser.lastName}
                                    img_profile={restUser.img_profile}
                                    dog={dog}
                                />
                            </Box>
                        )}
                        {!!dog.Certificates.length && (
                            <Box sx={{ p: 1 }}>
                                <ListCertificates
                                    name={restUser.name}
                                    lastName={restUser.lastName}
                                    img_profile={restUser.img_profile}
                                    dog={dog}
                                />
                            </Box>
                        )}
                    </Stack>
                    <Stack spacing={2} direction="row" mt={2}>
                        <LikeIconButton likes={LikesCount} />
                        <MessageIconButton active={true} />
                    </Stack>
                </Box>
                {/* <AdOptionsDrawer
                    open={openMenu}
                    handleClose={toggleMenu}
                    publication={publication}
                /> */}
            </Box>
        </Slide>
    )
};

export default ShowAd
