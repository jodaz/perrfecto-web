import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import getSearchParams from '../../utils/getSearchParams';
import DeletedAccount from '../../components/Modals/DeletedAccount';
import { closeGuestWarning, useGuest } from '../../context/GuestContext';
import Box from '@mui/material/Box'
// Sections
import Intro from './Intro';
import DownloadAppSection from './DownloadAppSection';
import RegisterBusinessCalling from './RegisterBusinessCalling';
import HowItWorks from './HowItWorks';
import Footer from './Footer';
import BlogsSection from './BlogsSection';
import OurPlansSection from './OurPlansSection';
import MeetDogsSection from './MeetDogsSection';

const Landing = ({ location }) => {
    const { dispatch: guestDispatch } = useGuest()
    const navigate = useNavigate();
    const openDeleteModal = getSearchParams(location, 'delete')

    React.useEffect(() => {
        closeGuestWarning(guestDispatch);
    }, [])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Intro />
            <RegisterBusinessCalling />
            <MeetDogsSection />
            <DownloadAppSection />
            <HowItWorks />
            <OurPlansSection />
            <BlogsSection />
            <Footer />
            <DeletedAccount open={openDeleteModal} handleClose={() => navigate('/')} />
        </Box>
    );
}

export default Landing;
