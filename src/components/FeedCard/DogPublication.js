import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InstagramModal from '../../components/Modals/InstagramModal';
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../Modals/ShowCard/PhotoGallery';
import PublicationDescription from './PublicationDescription';
import FavouriteButton from '../Buttons/FavouriteButton'
import LikeButton from '../Buttons/LikeButton'
import Avatar from '@mui/material/Avatar';
import { useMediaQuery } from '@mui/material';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const DogPublication = ({ open, data, handleClose }) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const multimedia = getImages(JSON.parse(data.multimedia))
    const ownerPhoto = getUserPhoto(data.Dog.Owner.img_profile);

    if (!open) return null

    return (
        <InstagramModal
            open={open}
            handleClose={() => handleClose()}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                top: isSmall ? '-40px' : '-50px',
                left: 0,
                zIndex: 1000
            }}>
                <Avatar sx={{
                    width: isSmall ? '50px' : '70px',
                    height: isSmall ? '50px' : '70px',
                    marginRight: '1rem',
                    border: '2px solid #F59E0B'
                }} src={ownerPhoto} />
                <Typography gutterBottom variant={isSmall ? 'body1' : "h5"} fontWeight={500}>
                    {data.Dog.Owner.name}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                minWidth: !isSmall ? 800 : '280px',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 4,
                marginRight: '1rem'
            }}>
                <Box sx={{ flex: 1 }}>
                    <PhotoGallery images={multimedia} />
                </Box>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between'
                }}>
                    <Box>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h5" color="text.secondary" fontWeight={500}>
                                {data.Dog.name}
                            </Typography>
                            <PublicationDescription
                                color='info.main'
                                dotColor='info'
                                dogAge={data.dogAge}
                                breed={data.Dog.breed}
                                province={data.Dog.Owner.province}
                                city={data.Dog.Owner.city}
                            />
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                {data.description}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                        <Box sx={{ p: 1 }}>
                            <FavouriteButton />
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <LikeButton likes={data.LikesCount} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </InstagramModal>
    );
}

export default DogPublication
