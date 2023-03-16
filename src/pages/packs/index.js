import * as React from 'react';
import Stack from '@mui/material/Stack';
import PlanCard from './PackCard';
import { apiProvider } from '../../api'
import SettingsLayout from '../../layouts/SettingsLayout';
import useEffectOnce from '../../utils/useEffectOnce';
import LoadingIndicator from '../../components/LoadingIndicator'

const Packs = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [packs, setPacks] = React.useState([]);

    const fetchPlans = async () => {
        setIsLoading(true)
        try {
            const res = await apiProvider.get('/api/pack/get-packs')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setPacks(data)
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
                <Stack
                    spacing={2}
                    sx={{
                        height: '100%',
                        maxWidth: '300px',
                        padding: 1,
                        margin: '0 auto',
                        alignItems: 'center'
                    }}
                >
                    {packs.map(plan => <PlanCard {...plan} />)}
                </Stack>
            )}
        </SettingsLayout>
    );
}

export default Packs
