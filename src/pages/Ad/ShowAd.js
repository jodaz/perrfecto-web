import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PublicationDescription from '../../components/FeedCard/PublicationDescription';
import { Mail, Phone, ChevronLeft } from 'lucide-react'
import LinkBehavior from '../../components/LinkBehavior';
import MessageIconButton from '../../components/Buttons/MessageButton/MessageIconButton';
import ListCertificates from '../certificates/ListCertificates'
import ShowVaccines from '../Vaccines/ShowVaccines';
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../../components/Modals/ShowCard/PhotoGallery';
import { useAuth } from '../../context/AuthContext';
import LikeIconButton from '../../components/Buttons/LikeButton/LikeIconButton';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const ShowAd = () => {
    const { state: { user: { publication, dog, ...restUser } } } = useAuth()
    const {
        multimedia,
        interests,
        permission_tlf,
        description,
        LikesCount
    } = publication;
    const adPictures = getImages(JSON.parse(multimedia))

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                height: '100%',
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: '9px'
            }}>
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
                    flexDirection: 'column'
                }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h5" color="text.secondary" fontWeight={500}>
                            {dog.name}
                        </Typography>
                        <PublicationDescription
                            color='info.main'
                            dotColor='info'
                            age={dog.dogAge}
                            breed={dog.breed}
                            province={restUser.province}
                            city={restUser.city}
                        />
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <Mail size={20} />
                                <Box marginRight='1rem' />
                                {restUser.email}
                            </Typography>
                            {(restUser.phone && permission_tlf) && (
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    gutterBottom
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <Box>
                                        <Phone size={20} />
                                    </Box>
                                    <Box marginRight='1rem' />
                                    +{restUser.code_phone} {restUser.phone}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            {description}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', p: 1 }}>
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
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Stack spacing={2} direction="row" mt={2}>
                            <LikeIconButton likes={LikesCount} />
                            <MessageIconButton active={true} />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Slide>
    )
};

export default ShowAd
