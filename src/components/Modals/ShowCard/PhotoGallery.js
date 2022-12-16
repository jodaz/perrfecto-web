import React from 'react'
import CardMedia from '@mui/material/CardMedia'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';

// const useStyles = akeStyles({
//     media: {
//         height: 0,
//         paddingTop: '100%',
//     },
//     swiperContainer: {
//         paddingBottom: '3rem',
//         '& .swiper-pagination-bullet': {
//             background: 'blue',
//         },
//         '& .swiper-button-next:after': {
//             fontSize: '2rem !important',
//         },
//         '& .swiper-button-prev:after': {
//             fontSize: '2rem !important',
//         },
//     },
// })

const PhotoGallery = ({ images }) => {
    // const { media, swiperContainer } = useStyles()

    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <CardMedia
                        image={image}
                        sx={{
                            height: 0,
                            paddingTop: '100%'
                        }}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default PhotoGallery
