import * as React from 'react';
import {
    Button,
    Stack,
    Box,
    Typography
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
                            <SuscriptionCard {...userPlan.Subscription} />
                        ) : (
                            <Typography
                                variant="subtitle1"
                            >
                                Actualmente no tienes ningún pack.
                            </Typography>
                        )}
                    </Stack>
            </Box>
        </SettingsLayout>
    );
}

export default CurrentSuscription
