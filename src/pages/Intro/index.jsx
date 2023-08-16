import * as React from 'react'
import Box from '@mui/material/Box'
import BackgroundDogs from '../../assets/images/background-dogs.png'
import useMediaQuery from '@mui/material/useMediaQuery';
// Sections
import Welcome from './Welcome'
import Last from './Last';
import jumpIntro from '../../utils/jumpIntro';

const sections = [
    {
        component: <Welcome />,
        index: 0
    },
    {
        component: <Last />,
        index: 1
    }
]

const Intro = () => {
    const [index, setIndex] = React.useState(0)
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
                    {
                        sections.map(section => {
                            if (section.index == index)

                            return (
                                <>
                                    {React.cloneElement(section.component, {
                                        handleNextSection: () => setIndex(index + 1),
                                        index: index,
                                        jumpIntro: jumpIntro
                                    })}
                                </>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box>
    );
}

export default Intro;
