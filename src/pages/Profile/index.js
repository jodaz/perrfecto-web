import * as React from 'react';
import Box from '@mui/material/Box';
import BasicTabs from '../../components/Tabs';
import PetProfile from './PetProfile';

const Profile = () => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        backgroundColor: '#f6f6f6'
    }}>
        <BasicTabs />
        <PetProfile />


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

export default Profile
