import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinkBehavior from '../../components/LinkBehavior';
import {
    PlusSquare,
    Newspaper,
    Image
} from 'lucide-react';
import CustomButton from './CustomButton';
import getSearchParams from '../../utils/getSearchParams';
import { useLocation, useNavigate } from 'react-router-dom';
import RegisterOwner from '../../components/RegisterOwner';
import BasicTabs from '../../components/Tabs';
import ProfileOptions from './ProfileOptions';

const PetOwner = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const registerOwner = getSearchParams(location, 'register');

    return (
        <Box sx={{ p: 1, textAlign: 'center', backgroundColor: '#f6f6f6' }}>
            <BasicTabs />
            <Box sx={{
                marginTop: '1rem',
                width: '100%'
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
                        icon={<Image />}
                        title='Subir fotos personales'
                        sx={{
                            background: 'linear-gradient(122.24deg, #F2D862 6.2%, #EBA046 69.82%);'
                        }}
                    />
                    <CustomButton
                        size={32}
                        icon={<Newspaper />}
                        title='Crear publicación'
                        color="primary"
                    />
                    <CustomButton
                        size={32}
                        icon={<PlusSquare />}
                        title='Añadir información'
                        color="info"
                        component={LinkBehavior}
                        to='?register=true'
                    />
                </Box>
                <RegisterOwner open={registerOwner} handleClose={() => navigate('/profile/owner')} />
            </Box>
        </Box>
    );
}

export default PetOwner
