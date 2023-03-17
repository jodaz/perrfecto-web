import * as React from 'react';
import InstagramModal from '../InstagramModal';
import AccountLockedAlert from './AccountLockedAlert';
import { useNavigate } from 'react-router-dom';
import ProblemDescriptionForm from './ProblemDescriptionForm';
import getSearchParams from '../../../utils/getSearchParams'
import Box from '@mui/material/Box';
import AccountContactInformation from './AccountContactInformation';

const AccountLocked = ({ location }) => {
    const navigate = useNavigate()
    const descriptionForm = getSearchParams(location, 'description');
    const contactInfo = getSearchParams(location, 'contact');

    return (
        <InstagramModal
            handleClose={() => navigate(-1)}
            open={location.pathname == '/account/locked'}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                p: 2,
                minWidth: '280px',
                maxWidth: '280px',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 4,
                marginRight: '1rem',
                textAlign: 'center',
                color: theme => theme.palette.text.secondary,
            }}>
                {descriptionForm ? (
                    <ProblemDescriptionForm />
                ) : contactInfo  ? (
                    <AccountContactInformation />
                ): <AccountLockedAlert /> }
            </Box>
        </InstagramModal>
    );
}

export default AccountLocked
