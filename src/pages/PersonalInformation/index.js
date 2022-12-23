import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../../context/AuthContext';
import SettingsLayout from '../../layouts/SettingsLayout';
import getUserPhoto from '../../utils/getUserPhoto';

const PersonalInformation = ({ location }) => {
    const { state: { user } } = useAuth();

    return (
        <SettingsLayout title='Información personal'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1
            }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom color="text.tertiary" fontWeight={500}>
                        Foto de perfil
                    </Typography>
                    <Avatar
                        src={`${getUserPhoto(user.img_profile)}`}
                        alt="profile_photo"
                        sx={{ height: '125px', width: '125px' }}
                    />
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default PersonalInformation
