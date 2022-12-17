import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ShowCard from '../../components/Modals/ShowCard';
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../Modals/ShowCard/PhotoGallery';
import PublicationDescription from './PublicationDescription';
import FavouriteButton from '../Buttons/FavouriteButton'
import LikeButton from '../Buttons/LikeButton'

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const DogPublication = ({ data, handleClose }) => {
    const multimedia = getImages(JSON.parse(data.multimedia))
    const ownerPhoto = getUserPhoto(data.Dog.Owner.img_profile);

    return (
        <ShowCard
            open={data}
            handleClose={handleClose}
            photo={ownerPhoto}
            name={data.Dog.Owner.name}
        >
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
        </ShowCard>
    );
}

export default DogPublication
