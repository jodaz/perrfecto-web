import * as React from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles';
import { Link, Button } from '@mui/material';
import LinkBehavior from '../../components/LinkBehavior';
import useMediaQuery from '@mui/material/useMediaQuery';
import LanguageButton from './LanguageButton';
import Logo from '../../components/Logo';

const BoxContainer = styled(Box)(({ theme, color }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '0 1rem',
    position: 'fixed',
    alignItems: 'center',
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    background: !color ? 'transparent' : color,
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.16)',
    [theme.breakpoints.down('md')]: {
        justifyContent: 'end'
    }
}))

const AnchorTag = styled(Link)(({ theme, dark }) => ({
    textDecoration: 'none',
    padding: ' 0 1rem',
    fontWeight: '400',
    color: dark ? `${theme.palette.text.primary}` : `${theme.palette.secondary.main}`,
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
        color: `${theme.palette.primary.main}`,
    }
}))

const internalLinks = [
    {
        title: 'Home',
        link: '/',
    },
    {
        title: 'Conecta',
        link: '/connect'
    },
    {
        title: '¿Cómo funciona?',
        link: '/how-it-works'
    },
    {
        title: 'Registrar negocio',
        link: '/business'
    }
]

const Header = ({ dark }) => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <BoxContainer
            component='navbar'
            color={dark && 'linear-gradient(0deg, rgba(161, 103, 201, 0.1), rgba(161, 103, 201, 0.1)),#FFFFFF'}
        >
            {!matches && <Logo />}
            <Box sx={{
                display: 'flex',
                fontWeight: '300',
                fontSize: '1rem',
                color: '#fff',
                marginRight: '2rem',
                listStyle: 'none',
                alignItems: 'center'
            }} component='ul'>
                {!matches && (
                    <>
                        {internalLinks.map(link => (
                            <li>
                                <AnchorTag
                                    aria-label={link.title}
                                    to={link.link}
                                    component={LinkBehavior}
                                    dark={dark || matches}
                                >
                                    {link.title}
                                </AnchorTag>
                            </li>
                        ))}
                    </>
                )}
                <li>
                    <Box sx={{ marginRight: 2 }}>
                        <LanguageButton dark={dark} />
                    </Box>
                </li>
                <li>
                    <Box>
                        <Button
                            variant="contained"
                            color={dark ? 'primary' : 'secondary'}
                            to='/login'
                            component={LinkBehavior}
                        >
                            Iniciar sesión
                        </Button>
                    </Box>
                </li>
            </Box>
        </BoxContainer>
    );
}

export default Header;
