import * as React from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';

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
        <Box height='fit-content'>
            <Box sx={{
                marginBottom: '1rem',
                color: theme => theme.palette.text.secondary
            }}>
                Miembros populares
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                zIndex: 1,
                height: 'fit-content'
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
