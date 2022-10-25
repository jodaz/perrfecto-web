import * as React from 'react'
import Box from '@mui/material/Box'
import BackgroundDogs from '../../assets/images/background-dogs.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import vars from '../../vars';
// Sections
import Welcome from './Welcome'

const Intro = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    React.useEffect(() => {
        if (!localStorage.getItem(vars.intro)) {
            localStorage.setItem(vars.intro, 'pass')
        }
    }, [])

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
                    display: 'flex',
                    flexDirection: 'column',
                    width: '250px',
                    height: '250px',
                    justifyContent: 'space-between'
                }}>
                    <Welcome />
                </Box>
            </Box>
        </Box>
    );
}

export default Intro;
