import * as React from 'react';
import Box from '@mui/material/Box';
import PlanCard from './PlanCard';
import { useParams } from 'react-router-dom';
import { apiProvider } from '../../api'
import SettingsLayout from '../../layouts/SettingsLayout';
import useEffectOnce from '../../utils/useEffectOnce';
import LoadingIndicator from '../../components/LoadingIndicator'
import { useForm } from 'react-hook-form';
import Checkbox from '../../components/Forms/Checkbox';
import PaymentMethods from './PaymentMethods'

const PlanShow = ({ location }) => {
    const { control } = useForm()
    const { id } = useParams()
    const [item, setItem] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchPlan = async () => {
        try {
            const res = await apiProvider.get(`/api/pack/${id}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setItem(data)
                setIsLoading(false)
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
            setIsLoading(false)
            setItem(location.state)
        } else {
            // Fetch plan
        }
    }, [location.state])

    return (
        <SettingsLayout title={item ? item.name : ''}>
            {isLoading ? (
                <LoadingIndicator height='100%' />
            ) : (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    height: '100%',
                    p: 2,
                    flexDirection: 'column'
                }}>
                    <PlanCard {...item} />
                    <Checkbox
                        name="autorenovation"
                        defaultValue={true}
                        label='Renovación automática'
                        control={control}
                    />
                    <PaymentMethods />
                </Box>
            )}
        </SettingsLayout>
    );
}

export default PlanShow
