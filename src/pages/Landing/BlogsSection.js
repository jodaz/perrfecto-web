import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation } from 'swiper';
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

const initialState = [null, null, null, null];

const BlogsSection = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [blogs, setBlogs] = React.useState(initialState)

    const fetchBlogs = async () => {
        try {
            const res = await apiProvider.get('api/blog/blogs')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data: { data } } } = res;

                setBlogs(data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffectOnce(() => { fetchBlogs() }, []);

    return (
        <Box sx={{
            backgroundColor: theme => theme.palette.secondary.main,
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 6
        }}>
            <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary.main"
                fontSize='1.5rem'
                lineHeight={isSmall ? '28px' : '40px'}
                textAlign='left'
                maxWidth='800px'
                gutterBottom
            >
                Mantente informado sobre los cuidados de tu mascota y descubre consejos valiosos.
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { sm: '320px', md: '310px' }
            }}>
                {(blogs.length) ? (
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
                        {blogs.map((post, i) => (
                            <SwiperSlideStyled key={i}>
                                <BlogCard {...post} />
                            </SwiperSlideStyled>
                        ))}
                    </SwiperStyled>
                ) : (
                    <Typography variant="subtitle1">
                        Aún no tenemos blogs destacados
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default BlogsSection
