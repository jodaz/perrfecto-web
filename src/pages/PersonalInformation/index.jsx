import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../context/AuthContext';
import SettingsLayout from '../../layouts/SettingsLayout';
import ListItemLink from '../../components/ListItemLink';
import List from '../../components/List';
import EditPhoto from './EditPhoto';
import { differenceInYears } from 'date-fns';
import PrivateRoute from '../../components/PrivateRoute'
import formatPhone from '../../utils/formatPhone';

const getYears = birthDate => differenceInYears(new Date(), new Date (birthDate.toString().replace(/"/g, '')))

const PersonalInformation = () => {
    const [editPhoto, setEditPhoto] = React.useState(false);
    const { state: { user } } = useAuth();

    const toggleEditPhoto = () => setEditPhoto(!editPhoto)

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
                        <EditPhoto
                            isEditing={editPhoto}
                            toggleEdit={toggleEditPhoto}
                        />
                    </Box>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        color="primary"
                        fontWeight={500}
                        onClick={toggleEditPhoto}
                        sx={{ cursor: 'pointer' }}
                    >
                        {!editPhoto ? 'Editar foto' : 'Cancelar'}
                    </Typography>
                </Box>
                <Box>
                    <List>
                        <PrivateRoute authorize={'user'}>
                            <>
                                <ListItemLink
                                    to="age"
                                    title="Edad"
                                    color="text.tertiary"
                                />
                                <Typography variant="subtitle1" ml={2}>
                                    {user.birth_date ? (
                                        <>
                                            {getYears(user.birth_date)} años
                                        </>
                                    ) : 'No registrado'}
                                </Typography>
                            </>
                        </PrivateRoute>
                        <PrivateRoute authorize={'business'}>
                            <>
                                <ListItemLink
                                    to="business-name"
                                    title="Nombre del negocio"
                                    color="text.tertiary"
                                />
                                <Typography variant="subtitle1" ml={2}>
                                    {user.business_name ? (
                                        <>
                                            {user.business_name}
                                        </>
                                    ) : 'No registrado'}
                                </Typography>
                            </>
                        </PrivateRoute>
                        <ListItemLink
                            to="names"
                            title="Nombre y apellido"
                            color="text.tertiary"
                        />
                        <Typography variant="subtitle1" ml={2}>
                            {user.name} {user.lastName}
                        </Typography>
                        <PrivateRoute authorize={'user'}>
                            <>
                                <ListItemLink
                                    to="location"
                                    title="Lugar de residencia"
                                    color="text.tertiary"
                                />
                                    <Typography variant="subtitle1" ml={2}>
                                        {(user.province) ? (
                                            <>{user.province}, {user.city}</>
                                        ) : 'No registrado'}
                                    </Typography>
                            </>
                        </PrivateRoute>
                        <PrivateRoute authorize={'business'}>
                            <>
                                <ListItemLink
                                    to="business-address"
                                    title="Dirección del negocio"
                                    color="text.tertiary"
                                />
                                <Typography variant="subtitle1" ml={2}>
                                    {user.business_dir ? (
                                        <>
                                            {user.business_dir}
                                        </>
                                    ) : 'No registrado'}
                                </Typography>
                            </>
                        </PrivateRoute>
                        <ListItemLink
                            to="email"
                            title="Correo electrónico"
                            color="text.tertiary"
                        />
                        <Typography variant="subtitle1" ml={2}>
                            {(user.email) ? (
                                <>{user.email}</>
                            ) : 'No registrado'}
                        </Typography>
                        <ListItemLink
                            to="phone"
                            title="Teléfono"
                            color="text.tertiary"
                        />
                        <Typography variant="subtitle1" ml={2}>
                            {formatPhone(user)}
                        </Typography>
                    </List>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default PersonalInformation
