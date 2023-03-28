import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce'
import Card from '../../components/Cards/Card'
import DogSectionPawprints from './DogSectionPawprints';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from "swiper";
import styled from '@emotion/styled';

const SwiperStyled = styled(Swiper)(() => ({
    height: 'inherit',
    borderRadius: 'inherit',
    width: '100%',
    '& .swiper-pagination-bullet': {
        marginTop: '15rem',
        backgroundColor: '#A167C9',
        width: '8px',
        height: '8px',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.12)'
    }
}))

const MeetDogsSection = () => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [publications, setPublications] = React.useState([])

    const fetchPublications = async () => {
        try {
            const res = await apiProvider.get('api/publication/publications')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data: { data } } } = res;

                setPublications(data.slice(0, 5))
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
            alignItems: 'center',
            height: isSmall ? '500px' : '600px',
            position: 'relative',
            flexDirection: 'column'
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
            <SwiperStyled
                initialSlide={2}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 10,
                    stretch: 100,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: false,
                }}
                modules={[EffectCoverflow, Pagination]}
            >
                {publications.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Card
                            data={item}
                            drag={true}
                        />
                    </SwiperSlide>
                ))}
            </SwiperStyled>
            {!isSmall && <DogSectionPawprints />}
        </Box>
    )
}

export default MeetDogsSection
