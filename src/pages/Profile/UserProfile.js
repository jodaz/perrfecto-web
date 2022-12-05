import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinkBehavior from '../../components/LinkBehavior';
import {
    PlusSquare,
    Newspaper,
    Settings,
    Star,
    Image
} from 'lucide-react';
import CustomButton from './CustomButton';

const UserProfile = () => {

    return (
        <Box sx={{
            marginTop: '1rem',
            width: '100%'
        }}>
            <Box sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <IconButton LinkComponent={LinkBehavior} to='settings'>
                    <Settings />
                </IconButton>
                <IconButton LinkComponent={LinkBehavior} to='favourites'>
                    <Star />
                </IconButton>
            </Box>
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
                    title='Crear anuncio'
                    color="info"
                />
            </Box>
        </Box>
    );
}

export default UserProfile
