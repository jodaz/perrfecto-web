import * as React from 'react';
import Box from '@mui/material/Box';
import PlanCard from './PlanCard';
import { useNavigate } from 'react-router-dom';
import { apiProvider } from '../../api'
import SettingsLayout from '../../layouts/SettingsLayout';
import useEffectOnce from '../../utils/useEffectOnce';

const Plans = () => {
    const [plans, setPlans] = React.useState([]);
    const navigate = useNavigate();

    const fetchBreeds = async () => {
        try {
            const res = await apiProvider.get('/api/pack/get-packs')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setPlans(data)
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    console.log(plans)

    useEffectOnce(() => { fetchBreeds() }, [])

    return (
        <SettingsLayout title='Pack de anuncios'>
            <Box sx={{
                display: 'flex',
                p: 1,
                height: '100%',

            }}>
                {plans.map(plan => <PlanCard {...plan} />)}
            </Box>
        </SettingsLayout>
    );
}

export default Plans
