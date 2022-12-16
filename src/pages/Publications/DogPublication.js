import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import ShowCard from '../../components/Modals/ShowCard';
import { useParams } from 'react-router-dom';
import { apiProvider } from '../../api';

const DogPublication = () => {
    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const { id } = useParams();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const years = new Date().getUTCFullYear() - data.dogAge

    const fetchPublication = async () => {
        setOpen(true)
        try {
            const res = await apiProvider.get('api/publication/publications')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data: { data } } } = res;

                setData(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    React.useEffect(() => { fetchPublication() }, [id]);

    return (
        <ShowCard open={open} handleClose={() => setOpen(false)}>
            <Box sx={{
                flex: 1,
                p: 2
            }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1">
                        Pupi
                    </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                    {/** Raza */}
                    <Typography color="text.secondary">
                        {data.Dog.breed}
                    </Typography>
                    <Box>.</Box>
                    <Typography color="text.secondary">
                        {years} años
                    </Typography>
                    <Box>.</Box>
                    {/** Edad */}
                    <Typography color="text.secondary">
                        España
                    </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1">
                        {data.description}
                    </Typography>
                </Box>
            </Box>
        </ShowCard>
    );
}

export default DogPublication
