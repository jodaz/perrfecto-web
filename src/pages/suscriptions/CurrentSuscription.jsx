import * as React from 'react';
import {
    Stack,
    Box,
    Typography,
    Button
} from '@mui/material';
import SuscriptionCard from '../Landing/SuscriptionCard';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useAuth } from '../../context/AuthContext';
import LinkBehavior from '../../components/LinkBehavior';

const CurrentSuscription = () => {
    const { state: { userPlan } } = useAuth()

    return (
        <SettingsLayout title='Mi plan actual'>
            <Box sx={{
                width: '100%',
                height: '100%',
                paddingTop: '1rem'
            }}>
                    <Stack spacing={2} sx={{
                        height: '100%',
                        maxWidth: '300px',
                        padding: 0,
                        margin: '0 auto',
                        alignItems: 'start'
                    }}>
                        {userPlan ? (
                            <SuscriptionCard
                                data={userPlan.Subscription}
                                selectable
                            />
                        ) : (
                            <>
                                <Typography
                                    variant="subtitle1"
                                >
                                    Actualmente no tienes ningún plan.
                                </Typography>
                                <Button
                                    component={LinkBehavior}
                                    to='/business/suscriptions'
                                    variant="contained"
                                >
                                    Ver suscripciones
                                </Button>
                            </>
                        )}
                    </Stack>
            </Box>
        </SettingsLayout>
    );
}

export default CurrentSuscription
