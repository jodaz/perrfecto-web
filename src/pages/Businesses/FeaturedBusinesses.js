import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FeaturedBusinessCard from './FeaturedBusinessCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation } from 'swiper';
import styled from '@emotion/styled';

const SwiperStyled = styled(Swiper)(() => ({
    height: 'inherit',
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    '& .swiper-wrapper': {
        marginBottom: '1rem'
    },
}))

const SwiperSlideStyled = styled(SwiperSlide)(() => ({
    textAlign: 'center',
}))

const businesses = [
    {
        title: 'Petshop',
        image: '/images/samples/sad-pupi.png',
    },
    {
        title: 'Accesorios para perros',
        image: '/images/samples/sad-pupi.png',
    },
    {
        title: 'Busco un hogar',
        image: '/images/samples/sad-pupi.png',
    }
]

const FeaturedBusiness = () =>  (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
            variant="subtitle1"
            fontWeight={500}
            fontSize='1rem'
            mb={2}
            color="text.secondary"
            textTransform={'uppercase'}
        >
            Negocios destacados
        </Typography>
        <SwiperStyled
            slidesPerView={businesses.length - 1}
            scrollbar={{
                draggable: true
            }}
            grabCursor={true}
            modules={[Scrollbar, Navigation]}
            spaceBetween={5}
            navigation
        >
            {businesses.map((business, i) => (
                <SwiperSlideStyled key={i}>
                    <FeaturedBusinessCard {...business} />
                </SwiperSlideStyled>
            ))}
        </SwiperStyled>
    </Box>
);

export default FeaturedBusiness
