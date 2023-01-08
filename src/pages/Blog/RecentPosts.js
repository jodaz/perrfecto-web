import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RecentPostCard from './RecentPostCard';
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
    height: '100%',
    width: '100% !important'
}))

const posts = [
    {
        title: 'Cómo afecta la muda del pelo canino',
        image: '/images/samples/sad-pupi.png',
        img_profile: '/images/samples/sad-pupi.png',
        published_at: new Date(),
        name: 'Mason',
        lastName: 'Eduard'
    },
    {
        title: 'Cómo afecta la muda del pelo canino',
        image: '/images/samples/sad-pupi.png',
        img_profile: '/images/samples/sad-pupi.png',
        published_at: new Date(),
        name: 'Mason',
        lastName: 'Eduard'
    },
    {
        title: 'Cómo afecta la muda del pelo canino',
        image: '/images/samples/sad-pupi.png',
        published_at: new Date(),
        img_profile: '/images/samples/sad-pupi.png',
        name: 'Mason',
        lastName: 'Eduard'
    }
]

const RecentPosts = ({ openPost }) =>  (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
            variant="subtitle1"
            fontWeight={500}
            fontSize='1.2rem'
            mb={2}
        >
            Recientes
        </Typography>
        <SwiperStyled
            slidesPerView={1}
            scrollbar={{
                draggable: true
            }}
            grabCursor={true}
            modules={[Scrollbar, Navigation]}
            navigation
        >
            {posts.map((post, i) => (
                <SwiperSlideStyled key={i}>
                    <RecentPostCard {...post} handleClick={openPost} />
                </SwiperSlideStyled>
            ))}
        </SwiperStyled>
    </Box>
);

export default RecentPosts
