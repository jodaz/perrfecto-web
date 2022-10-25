import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinkBehavior from '../../components/LinkBehavior'
import Link from '@mui/material/Link'

const Welcome = ({ index, handleNextSection, jumpIntro }) => {

    return (
        <>
            <Box sx={{
                fontSize: '1.5rem',
                fontWeight: 500
            }}>
                ¡Bienvenido!
            </Box>
            <Box>
                A continuación  te mostraremos como funciona TinderDogs
            </Box>
            <Button variant="contained" onClick={handleNextSection}>
                Comenzar
            </Button>
            <Link component={LinkBehavior} to='/home' color='secondary' onClick={jumpIntro}>
                Saltar
            </Link>
        </>
    );
}

export default Welcome;
