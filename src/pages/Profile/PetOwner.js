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
import BasicTabs from '../../components/Tabs';
import ProfileOptions from './ProfileOptions';
import { useAuth } from '../../context/AuthContext'

const RegisterOwner = React.lazy(() => import('../../components/RegisterOwner'));

const PetOwner = () => {
    const { state: { user } } = useAuth();
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
                    {!(user.img_profile) && (
                        <CustomButton
                            size={32}
                            icon={<PlusSquare />}
                            title='Añadir información'
                            color="info"
                            component={LinkBehavior}
                            to='?register=true'
                        />
                    )}
                </Box>
                {!(user.img_profile) && (
                    <React.Suspense>
                        <RegisterOwner open={registerOwner} handleClose={() => navigate('/profile/owner')} />
                    </React.Suspense>
                )}
            </Box>
        </Box>
    );
}

export default PetOwner
