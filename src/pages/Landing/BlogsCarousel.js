import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import BlogCard from './BlogCard';
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

const BlogsCarousel = ({ blogs }) => (
    <SwiperStyled
        slidesPerView={1}
        grabCursor={true}
        modules={[Navigation]}
        spaceBetween={5}
    >
        {blogs.map((post, i) => (
            <SwiperSlideStyled key={i}>
                <BlogCard {...post} />
            </SwiperSlideStyled>
        ))}
    </SwiperStyled>
)

export default BlogsCarousel
