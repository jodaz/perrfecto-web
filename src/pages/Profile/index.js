import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom'
import { useAuth, logout } from '../../context/AuthContext'
import LinkBehavior from '../../components/LinkBehavior';
import BasicTabs from '../../components/Tabs';
import getSearchParams from '../../utils/getSearchParams';
// import RegisterOwner from '../../components/RegisterOwner';

const Profile = ({ location }) => {
    const { dispatch } = useAuth();
    const tab = getSearchParams(location, 'tab')

    // if (location.pathname == '/profile' && !location.search) {
    //     return <Navigate replace to='/profile?tab=pet' />;
    // }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            backgroundColor: '#f6f6f6'
        }}>
            <BasicTabs />



            {/* <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => logout(dispatch)}
                component={LinkBehavior}
                to='/'
            >
                Cerrar sesión
            </Button> */}
        </Box>
    );
}

export default Profile
