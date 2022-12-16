import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import ShowCard from '../../components/Modals/ShowCard';
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../Modals/ShowCard/PhotoGallery';
import CircleIcon from '@mui/icons-material/FiberManualRecord';
import PublicationDescription from './PublicationDescription';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const DogPublication = ({ data, handleClose }) => {
    const multimedia = getImages(JSON.parse(data.multimedia))
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <ShowCard open={true} handleClose={handleClose}>
            <Box sx={{ flex: 1 }}>
                <PhotoGallery images={multimedia} />
            </Box>
            <Box sx={{
                flex: 1,
                p: 2
            }}>
                <Box sx={{
                    flex: 1,
                    p: 2
                }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h5" color="text.secondary" fontWeight={500}>
                            {data.Dog.name}
                        </Typography>
                    </Box>
                    <PublicationDescription
                        color='info.main'
                        dotColor='info'
                        dogAge={data.dogAge}
                        breed={data.Dog.breed}
                        province={'España'}
                        city={'Madrid'}
                    />
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1">
                            {data.description}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ShowCard>
    );
}

export default DogPublication
