import * as React from 'react';
import { Button, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useAuth } from "../context/AuthContext";
import LinkBehavior from "./LinkBehavior";
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

const InviteUserAlert = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));
    const location = useLocation();
    const { state: { user } } = useAuth();
    const [url, setUrl] = React.useState('')

    const checkIfUrlIsCurrent = () =>
        location.pathname == '/profile/ads/create'
        || location.pathname == '/profile/ads/create'

    React.useEffect(() => {
        if (user.role == 'guest') {
            setUrl('/register')
        } else {
            if (!user.dog) {
                if (checkIfUrlIsCurrent()) {
                    setUrl('')
                } else {
                    setUrl('/profile?dog=true')
                }
            } else {
                if (!user.publication) {
                    if (checkIfUrlIsCurrent()) {
                        setUrl('')
                    } else {
                        setUrl('/profile/ads/create')
                    }
                }
            }
        }
    }, [user, location])

    if (!url) return <></>

    return (
        <Box sx={{
            backgroundColor: "#f8f8f8",
            borderRadius: '10px',
            boxShadow: '0px 0px 18px rgba(223, 223, 223, 0.5)',
            width: isSmall ? '300px' : '360px',
            m: 1
        }}>
            <Stack spacing={1} direction={isSmall ? "column" : 'row'} m={2}>
                <Typography
                    variant="body2"
                >
                    Crea tu anuncio y destaca entre <br/> todas las mascotas de TinderDogs.
                </Typography>
                <Button
                    variant="contained"
                    component={LinkBehavior}
                    to={url}
                    sx={{ padding: '4px 8px', fontSize: '0.8rem'}}
                >
                    Crear anuncio
                </Button>
            </Stack>
        </Box>
    )
}

export default InviteUserAlert
