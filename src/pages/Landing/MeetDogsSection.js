import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';
import EllipseImage from '../../components/EllipseImage';
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce'
import Card from '../../components/Cards/Card'
import DogSectionPawprints from './DogSectionPawprints';

const MeetDogsSection = () => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [publications, setPublications] = React.useState([])

    const fetchPublications = async () => {
        try {
            const res = await apiProvider.get('api/publication/publications')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setPublications(data)
                setIsLoaded(true)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffectOnce(() => { fetchPublications() }, []);

    if (!isLoaded) return null;

    return (
        <Box sx={{
            width: { sm: '80%', xs: '80%', md: '30%', lg: '30%' },
            margin: 'auto 0',
            backgroundColor: '#FFF',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '4rem 0',
            height: isSmall ? '400px' : '500px',
            position: 'relative'
        }}>
            <Typography
                variant="subtitle1"
                textAlign='center'
                fontWeight={700}
                color="primary.main"
                fontSize='1.5rem'
                lineHeight={isSmall ? '28px' : '36px'}
                maxWidth='600px'
                gutterBottom
            >
                Conoce las mascotas que obtuvieron más likes de la semana, día y mes
            </Typography>
            {!isSmall && <DogSectionPawprints />}
        </Box>
    )
}

export default MeetDogsSection
