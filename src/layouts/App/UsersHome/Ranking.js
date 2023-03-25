import * as React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import Card from '../../../components/Cards/Card';
import { apiProvider } from '../../../api';
import useEffectOnce from '../../../utils/useEffectOnce';

const Ranking = ({
    handleSelect,
    isSmall
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [pubWeek, setPubWeek] = React.useState(null);
    const [pubMonth, setPubMonth] = React.useState(null);

    const fetchWeek = async () => {
        setIsLoading(true);
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
            width: isSmall ? '100%' : '50%',
            margin: '0 auto',
            height: '100%',
            zIndex: 100
        }}>
            {(!isLoading) ? (
                <></>
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
