import * as React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import Card from '../../../components/Cards/Card';
import { apiProvider } from '../../../api';
import useEffectOnce from '../../../utils/useEffectOnce';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import styled from '@emotion/styled';

const SwiperStyled = styled(Swiper)(() => ({
    height: 'inherit',
    borderRadius: 'inherit',
    width: '100%',
    '& .swiper-pagination-bullet': {
        backgroundColor: '#A167C9',
        width: '8px',
        height: '8px',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.12)'
    }
}))

const Ranking = ({
    handleSelect,
    isSmall
}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [pubWeek, setPubWeek] = React.useState(null);
    const [pubMonth, setPubMonth] = React.useState(null);

    const fetchWeek = async () => {
        try {
            const res = await apiProvider.get('/api/ranking/ranking-week')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setPubWeek(data.Publication)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMonth = async () => {
        try {
            const res = await apiProvider.get('/api/ranking/ranking-month')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setPubMonth(data.Publication)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffectOnce(() => {
        fetchWeek()
        fetchMonth()
    });

    React.useEffect(() => {
        if (pubWeek && pubMonth) {
            setIsLoading(false)
        }
    }, [pubWeek, pubMonth])

    return (
        <Box sx={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            width: '300px',
            margin: '0 auto',
            height: '100%',
            zIndex: 100
        }}>
            {(!isLoading) ? (
                <SwiperStyled
                    pagination={{
                        clickable: true,
                        dynamicBullets: false,
                    }}
                    modules={[Navigation, Pagination]}
                    navigation
                >
                    {[pubWeek, pubMonth].map((item, index) => (
                        <SwiperSlide key={index}>
                            <Card
                                data={item}
                                drag={true}
                                onClick={() => handleSelect(item)}
                            />
                        </SwiperSlide>
                    ))}
                </SwiperStyled>
            ) : (
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress color="primary" />
                </Box>
            )}
        </Box>
    );
}

export default Ranking;
