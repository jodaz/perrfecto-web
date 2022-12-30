import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MapPin, Phone, Mail } from 'lucide-react';
import CircleIcon from '@mui/icons-material/FiberManualRecord';
import { useAuth } from '../../context/AuthContext'
import getYearsFromYear from '../../utils/getYearsFromYear';
import { useNavigate } from 'react-router-dom';

const DogInformation = () => {
    const { state: { user } } = useAuth();
    const { dog } = user
    const redirect = useNavigate()

    return (
        <>
            <Box sx={{ display: 'flex', }}>
                <Typography
                    variant="body2"
                    color="text.tertiary"
                    textTransform={'uppercase'}
                    gutterBottom
                >
                    información de la mascota
                </Typography>
            </Box>
            <Typography
                variant="h6"
                textTransform='capitalize'
                gutterBottom
            >
                {dog.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    whiteSpace: 'nowrap'
                }}>
                    {/** Raza */}
                    <Typography color="primary.main">
                        {dog.breed}
                    </Typography>
                    <Box sx={{ fontSize: '6px', padding: '0 8px' }}>
                        <CircleIcon fontSize='inherit' color='primary' />
                    </Box>
                    <Typography color="primary.main">
                        {getYearsFromYear(dog.dogAge)} años
                    </Typography>
                    {(user.province && user.city) && (
                        <>
                            <Box sx={{ fontSize: '6px', padding: '0 8px' }}>
                                <CircleIcon fontSize='inherit' color='primary' />
                            </Box>
                            <Typography
                                onClick={() => redirect('/profile/settings/owner/location')}
                                color='info.main'
                                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                            >
                                <MapPin size={20} />
                                {user.province},&nbsp;
                                {user.city}
                            </Typography>
                        </>
                    )}
                </Box>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Typography variant="body1" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Mail size={20} />
                    <Box marginRight='1rem' />
                    {user.email}
                </Typography>
                {user.phone && (
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Box>
                            <Phone size={20} />
                        </Box>
                        <Box marginRight='1rem' />
                        {user.code_phone}&nbsp;{user.phone}
                    </Typography>
                )}
            </Box>
        </>
    );
}

export default DogInformation
