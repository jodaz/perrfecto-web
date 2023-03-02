import * as React from 'react';
import Box from '@mui/material/Box';
import PlanCard from './PlanCard';
import { apiProvider } from '../../api'
import SettingsLayout from '../../layouts/SettingsLayout';
import useEffectOnce from '../../utils/useEffectOnce';
import LoadingIndicator from '../../components/LoadingIndicator'

const Plans = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [plans, setPlans] = React.useState([]);

    const fetchPlans = async () => {
        setIsLoading(true)
        try {
            const res = await apiProvider.get('/api/pack/get-packs')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setPlans(data)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.log("error ", error)
        }
    }

    useEffectOnce(() => { fetchPlans() }, [])

    return (
        <SettingsLayout title='Pack de anuncios'>
            {isLoading ? (
                <LoadingIndicator height='100%' />
            ) : (
                <Box sx={{
                    display: 'flex',
                    p: 1,
                    height: '100%',
                }}>
                    {plans.map(plan => <PlanCard {...plan} />)}
                </Box>
            )}
        </SettingsLayout>
    );
}

export default Plans
