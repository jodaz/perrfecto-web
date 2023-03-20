import * as React from 'react';
import {
    Button,
    Stack,
    Box
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
                height: '100%'
            }}>
                {userPlan && (
                    <Stack spacing={2} sx={{
                        height: '100%',
                        maxWidth: '300px',
                        padding: 1,
                        margin: '0 auto',
                        alignItems: 'start'
                    }}>
                        <PlanCard {...userPlan} />
                        <Button
                            component={LinkBehavior}
                            variant="text"
                            to='/profile/settings/packs'
                        >
                            Ver más packs
                        </Button>
                    </Stack>
                )}
            </Box>
        </SettingsLayout>
    );
}

export default UserPack
