import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ShowCard from '../../components/Modals/ShowCard';
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../Modals/ShowCard/PhotoGallery';
import PublicationDescription from './PublicationDescription';
import FavouriteButton from '../Buttons/FavouriteButton'
import LikeButton from '../Buttons/LikeButton'
import ShowVaccines from '../../pages/Vaccines/ShowVaccines';
import ListCertificates from '../../pages/certificates/ListCertificates';
import MessageButton from '../Buttons/MessageButton';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const DogPublication = ({ open, data, handleClose, handleOpenOwnerCard }) => {
    const multimedia = getImages(JSON.parse(data.multimedia))
    const userPhoto = data.publi.Owner.img_profile ? getUserPhoto(JSON.parse(data.publi.Owner.img_profile)[0]) : '/images/Avatar.svg'

    if (!open) return null

    return (
        <ShowCard
            open={open}
            handleClose={handleClose}
            photo={userPhoto}
            name={data.publi.Owner.name}
            handleOpen={handleOpenOwnerCard}
        >
            <Box sx={{
                flex: 1,
                height: 400,
                width: 400,
                borderTopLeftRadius: '16px',
                borderBottomLeftRadius: '16px'
            }}>
                <PhotoGallery images={multimedia} />
            </Box>
            <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <Box flex={1} p={2}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h5" color="text.secondary" fontWeight={500}>
                            {data.publi.name}
                        </Typography>
                        <PublicationDescription
                            color='info.main'
                            dotColor='info'
                            age={data.publi.dogAge}
                            breed={data.publi.breed}
                            province={data.publi.Owner.province}
                            city={data.publi.Owner.city}
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            {data.description}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', p: 1 }}>
                        <Box sx={{ p: 1 }}>
                            <ShowVaccines
                                {...data.publi.Owner}
                                dog={{...data.publi}}
                            />
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <ListCertificates
                                {...data.publi.Owner}
                                dog={{...data.publi}}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', mb: 2, ml: 2 }}>
                    <Box sx={{ p: 1 }}>
                        <FavouriteButton item={data} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <LikeButton item={data} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <MessageButton />
                    </Box>
                </Box>
            </Box>
        </ShowCard>
    );
}

export default DogPublication
