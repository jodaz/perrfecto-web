import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import LinkBehavior from '../../components/LinkBehavior';
import getSearchParams from '../../utils/getSearchParams';
import { useNavigate } from 'react-router-dom';

const CreateAd = ({ location }) => {
    const openDeleteModal = getSearchParams(location, 'delete')
    const navigate = useNavigate();

    return (
        <SettingsLayout title="Crear anuncio">
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box sx={{ p: 2 }}>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        component={LinkBehavior}
                        to='?delete=true'
                    >
                        Eliminar cuenta
                    </Button>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default CreateAd
