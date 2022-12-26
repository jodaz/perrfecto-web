import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../../context/AuthContext';
import SettingsLayout from '../../layouts/SettingsLayout';
import getUserPhoto from '../../utils/getUserPhoto';
import ListItemLink from '../../components/ListItemLink';
import List from '../../components/List';

const PersonalInformation = ({ location }) => {
    const { state: { user } } = useAuth();

    return (
        <SettingsLayout title='Información personal'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
            }}>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" gutterBottom color="text.tertiary" fontWeight={500}>
                            Foto de perfil
                        </Typography>
                        <Avatar
                            src={`${getUserPhoto(user.img_profile)}`}
                            alt="profile_photo"
                            sx={{ height: '125px', width: '125px' }}
                        />
                    </Box>
                    <Typography variant="subtitle1" gutterBottom color="primary" fontWeight={500}>
                        Editar foto
                    </Typography>
                </Box>
                <Box>
                    <List>
                        <ListItemLink
                            to="age"
                            title="Edad"
                            color="text.tertiary"
                        />
                        <Typography variant="subtitle1" ml={2}>
                            25 años
                        </Typography>
                        <ListItemLink
                            to="names"
                            title="Nombre y apellido"
                            color="text.tertiary"
                        />
                        <Typography variant="subtitle1" ml={2}>
                            {user.name} {user.lastName}
                        </Typography>
                        <ListItemLink
                            to="location"
                            title="Lugar de residencia"
                            color="text.tertiary"
                        />
                        {(user.province) ? (
                            <Typography variant="subtitle1" ml={2}>
                                {user.province}, {user.city}
                            </Typography>
                        ) : (
                            <Typography variant="subtitle1" ml={2}>
                                No ha rellenado su ubicación
                            </Typography>
                        )}
                    </List>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default PersonalInformation
