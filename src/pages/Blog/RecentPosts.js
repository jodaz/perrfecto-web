import * as React from 'react';
import LinkBehavior from '../../components/LinkBehavior'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RecentPostCard from './RecentPostCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation } from 'swiper';
import styled from '@emotion/styled';

const SwiperStyled = styled(Swiper)(() => ({
    height: 'inherit',
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    width: '100%',
    '& .swiper-wrapper': {
        marginBottom: '1rem'
    },
}))

const SwiperSlideStyled = styled(SwiperSlide)(() => ({
    height: '100%',
    width: '100% !important',
    textAlign: 'center',
    width: 'auto'
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
        <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
        }}>
            <Typography
                variant="h5"
                fontWeight={500}
            >
                Recientes
            </Typography>
            <Button
                component={LinkBehavior}
                variant="outlined"
                to='/blogs/me'
                size='small'
                sx={{
                    fontSize: '0.9rem',
                    padding: '0.4rem 0.7rem',
                    fontWeight: 500
                }}
            >
                Ver mis blogs
            </Button>
        </Box>
        <SwiperStyled
            slidesPerView={1}
            scrollbar={{
                draggable: true
            }}
            grabCursor={true}
            modules={[Scrollbar, Navigation]}
            spaceBetween={5}
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
