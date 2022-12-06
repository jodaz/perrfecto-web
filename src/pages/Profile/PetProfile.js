import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinkBehavior from '../../components/LinkBehavior';
import {
    PlusSquare,
    Newspaper,
    Settings,
    Star
} from 'lucide-react';
import CustomButton from './CustomButton';
import RegisterDog from '../../components/RegisterDog';
import getSearchParams from '../../utils/getSearchParams';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicTabs from '../../components/Tabs';
import ProfileOptions from './ProfileOptions';

const PetProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const registerDog = getSearchParams(location, 'dog');

    return (
        <Box sx={{ pt: 1, width: '100%', textAlign: 'center', backgroundColor: '#f6f6f6' }}>
            <BasicTabs />
            <Box sx={{
                marginTop: '1rem',
            }}>
                <ProfileOptions />
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flex: 1,
                    marginTop: '1rem'
                }}>
                    <CustomButton
                        size={32}
                        icon={<Newspaper />}
                        title='Crear publicación'
                        color="primary"
                    />
                    <CustomButton
                        size={32}
                        icon={<PlusSquare />}
                        title='Crear anuncio'
                        color="info"
                        component={LinkBehavior}
                        to='?dog=true'
                    />
                </Box>
                <RegisterDog open={registerDog} handleClose={() => navigate('/profile')} />
            </Box>
        </Box>
    );
}

export default PetProfile
