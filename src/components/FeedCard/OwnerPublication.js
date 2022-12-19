import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ShowCard from '../../components/Modals/ShowCard';
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../Modals/ShowCard/PhotoGallery';
import PublicationDescription from './PublicationDescription';
import { useMediaQuery } from '@mui/material';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const OwnerPublication = ({ open, data, handleClose }) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const multimedia = [getUserPhoto(data.Dog.Owner.img_profile)]
    const dogPhoto = getUserPhoto(JSON.parse(data.multimedia)[0]);
    console.log(data)
    if (!open) return null

    return (
        <ShowCard
            open={open}
            handleClose={handleClose}
            photo={dogPhoto}
            name={data.Dog.name}
        >
            <Box sx={{ flex: 1, height: 400, width: 400 }}>
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
                            {data.Dog.Owner.name}
                        </Typography>
                        <PublicationDescription
                            color='info.main'
                            dotColor='info'
                            age={'2022'}
                            province={data.Dog.Owner.province}
                            city={data.Dog.Owner.city}
                        />
                    </Box>
                </Box>
                <Box flex={1} p={2}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h5" color="text.secondary" fontWeight={500}>
                            {data.name}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ShowCard>
    );
}

export default OwnerPublication
