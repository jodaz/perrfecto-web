import * as React from 'react';
import {
    Button,
    Stack,
    Box,
    Typography
} from '@mui/material';
import PlanCard from './PackCard';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useAuth } from '../../context/AuthContext';
import LinkBehavior from '../../components/LinkBehavior';

const UserPack = () => {
    const { state: { userPlan } } = useAuth()

    return (
        <SettingsLayout title='Pack Actual'>
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
                            <PlanCard {...userPlan.Pack} />
                        ) : (
                            <Typography
                                variant="subtitle1"
                            >
                                Actualmente no tienes ningún pack.
                            </Typography>
                        )}
                        <Button
                            component={LinkBehavior}
                            variant="contained"
                            to='/profile/settings/packs'
                        >
                            Ver más packs
                        </Button>
                    </Stack>
            </Box>
        </SettingsLayout>
    );
}

export default UserPack
