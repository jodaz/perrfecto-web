import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../context/AuthContext';
import SettingsLayout from '../../layouts/SettingsLayout';
import ListItemLink from '../../components/ListItemLink';
import List from '../../components/List';
import EditPhoto from './EditPhoto';
import getYearsFromYear from '../../utils/getYearsFromYear'

const charac = [
    { name: 'Holis' },
    { name: 'Holis' },
    { name: 'Holis' },
    { name: 'Holis' },
    { name: 'Holis' },
    { name: 'Holis' },
    { name: 'Holis' },
    { name: 'Holis' },
]

const PetInformation = () => {
    const [editPhoto, setEditPhoto] = React.useState(false);
    const { state: { user } } = useAuth();
    const { characteristic, Vaccines, Certificates } = user.dog

    const toggleEditPhoto = () => setEditPhoto(!editPhoto)

    const renderCharacteristics = () =>  characteristic.map(item => (
        <Chip
            label={item.name}
            size="small"
            sx={{ mb: 1, mr: 1 }}
        />
    ))

    const renderVaccines = () =>  Vaccines.map(item => (
        <Chip
            label={item.name}
            size="small"
            sx={{ mb: 1, mr: 1 }}
        />
    ))

    const renderCertificates = () =>  Certificates.map(item => (
        <Chip
            label={item.name}
            size="small"
            sx={{ mb: 1, mr: 1 }}
        />
    ))

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
                        onClick={toggleEditPhoto}
                        sx={{ cursor: 'pointer' }}
                    >
                        {!editPhoto ? 'Editar foto' : 'Cancelar'}
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
                            {getYearsFromYear(user.dog.dogAge)} años
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
                        <ListItemLink
                            to="characteristics"
                            title="Características"
                            color="text.tertiary"
                        />
                        <Box spacing={3} sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginTop: '0.5rem',
                            ml: 2
                        }}>
                            {(characteristic.length) ? renderCharacteristics() : 'Sin caracteríticas'}
                        </Box>
                        <ListItemLink
                            to="vaccines"
                            title="Vacunas"
                            color="text.tertiary"
                        />
                        <Box spacing={3} sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginTop: '0.5rem',
                            ml: 2
                        }}>
                            {(Vaccines.length) ? renderVaccines() : 'Sin vacunas'}
                        </Box>
                        <ListItemLink
                            to="certificates"
                            title="Certificados"
                            color="text.tertiary"
                        />
                        <Box spacing={3} sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginTop: '0.5rem',
                            ml: 2
                        }}>
                            {(Certificates.length) ? renderCertificates() : 'Sin certificados'}
                        </Box>
                    </List>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default PetInformation
