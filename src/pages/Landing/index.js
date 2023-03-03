import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import getSearchParams from '../../utils/getSearchParams';
import DeletedAccount from '../../components/Modals/DeletedAccount';
import { closeGuestWarning, useGuest } from '../../context/GuestContext';
import { useAuth } from '../../context/AuthContext'
import Box from '@mui/material/Box'
// Sections
import Intro from './Intro';
import DownloadAppSection from './DownloadAppSection';

const Landing = ({ location }) => {
    const { dispatch: guestDispatch } = useGuest()
    const navigate = useNavigate();
    const openDeleteModal = getSearchParams(location, 'delete')
    const { state: { isAuth }, dispatch: authDispatch } = useAuth();

    React.useEffect(() => {
        closeGuestWarning(guestDispatch);
    }, [])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Intro />
            <DownloadAppSection />
            <DeletedAccount open={openDeleteModal} handleClose={() => navigate('/')} />
        </Box>
    );
}

export default Landing;
