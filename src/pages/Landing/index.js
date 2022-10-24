import Box from '@mui/material/Box'
import BackgroundDogs from '../../assets/images/background-dogs.png'
import { Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from './Header';
import SignUpDialog from '../../components/SignUp';

const Landing = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            height: '100vh',
            transition: 'all 0.3s ease-out 0s',
            position: 'relative',
            display: 'flex',
            '&:before': {
                content: '""',
                background: `url(${BackgroundDogs}) no-repeat center center fixed`,
                backgroundSize: 'cover',
                position: 'absolute',
                height: '100%',
                width: '100%',
                zIndex: 0
            }
        }}>
            <Header />
            <Box sx={{
                height: 'inherit',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                flex: matches ? 1 : 0.5,
                margin: '0 auto',
                color: '#DFDFDF',
                textAlign: 'center',
                zIndex: 1000,
                alignItems: 'center',
                '& > *': {
                    margin: '1.1rem 0'
                }
            }}>
                <Box sx={{
                    fontWeight: 700,
                    fontSize: '4rem',
                    lineHeight: '76px'
                }}>
                    Conecta con todos los perros del mundo
                </Box>
                <Box sx={{
                    fontSize: '1.2rem',
                    lineHeight: '28px'
                }}>
                    Conoce nuevas mascotas, en diferentes lugares, pero con los mismos gustos que tú
                </Box>
                <SignUpDialog />
            </Box>
        </Box>
    );
}

export default Landing;
