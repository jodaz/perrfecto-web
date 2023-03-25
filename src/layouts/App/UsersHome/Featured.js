import * as React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import Card from '../../../components/Cards/Card'
import { apiProvider } from '../../../api';
import useEffectOnce from '../../../utils/useEffectOnce';

const Featured = ({
    handleSelect,
    isSmall
}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState(null);

    const fetchData = async () => {
        try {
            const res = await apiProvider.get('/api/ranking/ranking-day')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setData(data.Publication)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffectOnce(() => { fetchData() });

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
                <Card
                    data={data}
                    drag={true}
                    onClick={() => handleSelect(data)}
                />
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

export default Featured;
