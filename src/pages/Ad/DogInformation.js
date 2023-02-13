import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MapPin, Phone, Mail, Compass } from 'lucide-react';
import CircleIcon from '@mui/icons-material/FiberManualRecord';
import { useAuth } from '../../context/AuthContext'
import getYearsFromYear from '../../utils/getYearsFromYear';
import LinkBehavior from '../../components/LinkBehavior';

const Location = ({ user }) => (
    <Typography
        component={LinkBehavior}
        to='/profile/settings/owner/location'
        color='info.main'
        sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            textDecoration: 'none'
        }}
    >
        <Box marginRight={'5px'}>
            <MapPin />
        </Box>
        {user.province},&nbsp;
        {user.city}
    </Typography>
)

const DogInformation = ({ hideTitle, hideInterests, desktop }) => {
    const { state: { user } } = useAuth();
    const { dog, publication } = user

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {!(hideTitle) && (
                <Box sx={{ display: 'flex', }}>
                    <Typography
                        variant="body2"
                        color="text.primary"
                        fontWeight={500}
                        textTransform={'uppercase'}
                        gutterBottom
                    >
                        información de la mascota
                    </Typography>
                </Box>
            )}
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
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
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
                    {(user.province && user.city && desktop) && (
                        <>
                            <Box sx={{ fontSize: '6px', padding: '0 8px' }}>
                                <CircleIcon fontSize='inherit' color='primary' />
                            </Box>
                            <Location user={user} />
                        </>
                    )}
                </Box>
            </Box>
            {(user.province && user.city && !desktop) && (
                <Location user={user} />
            )}
            <Box sx={{ mt: 1 }}>
                {!!(!hideInterests && publication.interests.length) && (
                    <Typography
                        variant="body2"
                        sx={{ display: 'flex', alignItems: 'start' }}
                        color="text.secondary"
                    >
                        <Box marginRight={'5px'}>
                            <Compass />
                        </Box>
                        {publication.interests.map(interest => `${interest.name}. `)}
                    </Typography>
                )}
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
        </Box>
    );
}

export default DogInformation
