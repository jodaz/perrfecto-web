import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RecentPostCard from './RecentPostCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation } from 'swiper';
import styled from '@emotion/styled';
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce';
import LoadingIndicator from '../../components/LoadingIndicator';

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

const RecentPosts = () =>  {
    const [loading, setLoading] = React.useState(true)
    const [blogs, setBlogs] = React.useState([])

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const res = await apiProvider.get('api/blog/blogs')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data: { data } } } = res;

                setBlogs(data)
                setLoading(false)
            }
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }

    useEffectOnce(() => { fetchBlogs() }, []);

    if (loading) return <LoadingIndicator />

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { sm: '320px', md: '320px' }
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
                            <RecentPostCard {...post} />
                        </SwiperSlideStyled>
                    ))}
                </SwiperStyled>
            ) : (
                <Typography variant="subtitle1">
                    Aún no tenemos blogs destacados
                </Typography>
            )}
        </Box>
    );
}

export default RecentPosts
