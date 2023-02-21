import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuth } from '../../context/AuthContext'
import UsersHome from '../../layouts/App/UsersHome';
import BusinessHome from '../../layouts/App/BusinessHome';

const Home = () => {
    const { state: { isAuth, user } } = useAuth();

    if (isAuth && (user.role == 'business')) {
        return <BusinessHome />
    }

    return (
        <UsersHome />
    );
}

export default Home
