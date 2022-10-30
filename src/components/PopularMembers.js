import React, { useRef, useCallback } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

const puppies = [
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    }
]

const PopularMembers = () => {
    return (
        <Box>
            <Box sx={{
                marginBottom: '1rem',
                color: theme => theme.palette.text.secondary
            }}>
                Miembros populares
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                marginBottom: '2rem',
                zIndex: 1000
            }}>
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={15}
                    slidesPerView={5}
                    navigation
                >
                    {puppies.map((user, i) => (
                        <SwiperSlide key={i}>
                            <Box sx={{
                                textAlign: 'center',
                                width: 'fit-content',
                                cursor: 'pointer',
                            }}>
                                <Avatar sx={{
                                    border: '1.5px solid #F59E0B',
                                    height: '68px',
                                    width: '68px'
                                }}
                                    src={`/images/samples/${user.picture}`}
                                />
                                <Box>
                                    {user.name}
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    )
}

export default PopularMembers
