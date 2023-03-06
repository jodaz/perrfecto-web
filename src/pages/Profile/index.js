import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuth } from '../../context/AuthContext'
import GuestMessage from '../../components/Alerts/GuestMessage';
import GuestDog from '../../assets/images/GuestDog1.png'

const Profile = ({ children }) => {
    const { state: { isAuth } } = useAuth()

    if (!isAuth) {
        return (
            <GuestMessage
                title="Diviértete con tu perro"
                subtitle="Crea un perfil y haz amigos con intereses en común"
                Image={GuestDog}
            />
        )
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start',
            height: '100%'
        }}>
            {children}
        </Box>
    )
}

export default Profile
