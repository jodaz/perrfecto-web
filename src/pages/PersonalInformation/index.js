import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../context/AuthContext';
import SettingsLayout from '../../layouts/SettingsLayout';
import ListItemLink from '../../components/ListItemLink';
import List from '../../components/List';
import EditPhoto from './EditPhoto';
import { differenceInYears } from 'date-fns';

const getYears = birthDate => differenceInYears(new Date(), new Date (birthDate.toString().replace(/"/g, '')))

const PersonalInformation = () => {
    const [editPhoto, setEditPhoto] = React.useState(false);
    const { state: { user } } = useAuth();
    console.log(user.birth_date)
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
                        <EditPhoto isEditing={editPhoto} />
                    </Box>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        color="primary"
                        fontWeight={500}
                        onClick={() => setEditPhoto(true)}
                        sx={{ cursor: 'pointer' }}
                    >
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
                            {user.birth_date ? (
                                <>
                                    {getYears(user.birth_date)} años
                                </>
                            ) : <>Agregar edad</>}
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
