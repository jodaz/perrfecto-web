import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FeaturedBusinessCard from './FeaturedBusinessCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation } from 'swiper';
import styled from '@emotion/styled';
import useEffectOnce from '../../utils/useEffectOnce';
import { apiProvider } from '../../api';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useBusinesses, selectItem } from '../../context/BusinessContext';

const SwiperStyled = styled(Swiper)(() => ({
    height: 'inherit',
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    '& .swiper-wrapper': {
        marginBottom: '1rem'
    },
}))

const SwiperSlideStyled = styled(SwiperSlide)(() => ({
    textAlign: 'center',
}))

const FeaturedBusiness = () =>  {
    const { dispatch } = useBusinesses();
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])

    const fetchBusinesses = async () => {
        setLoading(true)

        try {
            const res = await apiProvider.get('/api/announcement/featured')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setData(data);
                setLoading(false)
            }
        } catch (error) {
            console.log("error ", error)
            setLoading(false)
        }
    }

    useEffectOnce(() => { fetchBusinesses() }, [])

    if (loading) return <LoadingIndicator />

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {(data.length) ? (
                <SwiperStyled
                    slidesPerView={data.length - 1}
                    scrollbar={data.length > 1 && ({
                        draggable: true
                    })}
                    grabCursor={true}
                    modules={data.length > 1 && [Scrollbar, Navigation]}
                    spaceBetween={data.length > 1 && 5}
                    navigation={data.length > 1}
                >
                    {data.map((business, i) => (
                        <SwiperSlideStyled key={i}>
                            <FeaturedBusinessCard
                                {...business}
                                onClick={() => selectItem(dispatch, { item: business, type: 'business' })}
                            />
                        </SwiperSlideStyled>
                    ))}
                </SwiperStyled>
            ) : (
                <Typography variant="subtitle1">
                    Aún no tenemos negocios destacados
                </Typography>
            )}
        </Box>
    );
}

export default FeaturedBusiness
