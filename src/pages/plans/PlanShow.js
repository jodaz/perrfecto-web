import * as React from 'react';
import Box from '@mui/material/Box';
import PlanCard from './PlanCard';
import { useParams } from 'react-router-dom';
import { apiProvider } from '../../api'
import SettingsLayout from '../../layouts/SettingsLayout';
import useEffectOnce from '../../utils/useEffectOnce';
import LoadingIndicator from '../../components/LoadingIndicator'

const PlanShow = ({ location }) => {
    const { id } = useParams()
    const [item, setItem] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false);

    const fetchPlan = async () => {
        try {
            const res = await apiProvider.get(`/api/pack/${id}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setItem(data)
            }
        } catch (error) {
            setIsLoading(false)
            console.log("error ", error)
        }
    }

    // useEffectOnce(() => {
    //     if (item) { fetchPlan() }
    // }, [])

    React.useEffect(() => {
        if (location.state) {
            setItem(location.state)
        } else {
            // Fetch plan
        }
    }, [location.state])

    return (
        <SettingsLayout title={item ? item.title : ''}>
            {item ? (
                <LoadingIndicator height='100%' />
            ) : (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <PlanCard
                        price={10}
                        name={'Carousel'}
                        number_photos={10}
                        number_videos={10}
                    />

                </Box>
            )}
        </SettingsLayout>
    );
}

export default PlanShow
