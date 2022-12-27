import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../context/AuthContext';
import SettingsLayout from '../../layouts/SettingsLayout';
import ListItemLink from '../../components/ListItemLink';
import List from '../../components/List';
import EditPhoto from './EditPhoto';

const PetInformation = () => {
    const [editPhoto, setEditPhoto] = React.useState(false);
    const { state: { user } } = useAuth();

    return (
        <SettingsLayout title='Información de la mascota'>
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
                            25 años
                        </Typography>
                        <ListItemLink
                            to="name"
                            title="Nombre"
                            color="text.tertiary"
                        />
                        <Typography variant="subtitle1" ml={2}>
                            {user.dog.name}
                        </Typography>
                        {user.dog.breed && (
                            <>
                                <ListItemLink
                                    to="breed"
                                    title="Raza"
                                    color="text.tertiary"
                                />
                                <Typography variant="subtitle1" ml={2}>
                                    {user.dog.breed}
                                </Typography>
                            </>
                        )}
                        <ListItemLink
                            to="gender"
                            title="Sexo"
                            color="text.tertiary"
                        />
                        <Typography variant="subtitle1" ml={2}>
                            {user.dog.gender}
                        </Typography>
                    </List>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default PetInformation
