import React from 'react'
import CardMedia from '@mui/material/CardMedia'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import styled from '@emotion/styled';

const SwiperStyled = styled(Swiper)(() => ({
    height: 'inherit',
    '& .swiper-pagination-bullet': {
        backgroundColor: '#fff',
        width: '8px',
        height: '8px',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.12)'
    }
}))

const SwiperSlideStyled = styled(SwiperSlide)(() => ({
    height: '100%',
    width: '100% !important'
}))

const PhotoGallery = ({ images }) => (
    <SwiperStyled
        pagination={{
            clickable: true,
            dynamicBullets: true,
        }}
        modules={[Pagination]}
    >
        {images.map((image, index) => (
            <SwiperSlideStyled key={index}>
                <CardMedia
                    image={image}
                    sx={{
                        height: 0,
                        paddingTop: '100%',
                        margin: 0,
                        borderTopLeftRadius: '16px',
                        borderBottomLeftRadius: '16px'
                    }}
                />
            </SwiperSlideStyled>
        ))}
    </SwiperStyled>
)

export default PhotoGallery
