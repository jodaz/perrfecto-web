import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import styled from '@emotion/styled';
import SuscriptionCard from './SuscriptionCard'

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

const SubscriptionsCarousel = ({ plans }) =>  (
    <SwiperStyled
        slidesPerView={1}
        grabCursor={true}
        modules={[Navigation]}
        spaceBetween={5}
    >
        {plans.map((plan, i) => (
            <SwiperSlideStyled key={i}>
                <SuscriptionCard {...plan} />
            </SwiperSlideStyled>
        ))}
    </SwiperStyled>
);

export default SubscriptionsCarousel
