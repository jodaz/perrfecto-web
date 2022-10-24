import * as React from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import LoginDialog from '../../components/Login';

const BoxContainer = styled(Box)(({ theme, isScroll }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'end',
    padding: '0 1rem',
    position: 'fixed',
    alignItems: 'center',
    zIndex: 1000,
    [theme.breakpoints.down('md')]: {
        padding: '1.5rem 0',
        justifyContent: 'center'
    }
}))

const AnchorTag = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    padding: ' 0 1rem',
    fontWeight: '400',
    color: `${theme.palette.secondary.main}`,
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
        color: `${theme.palette.primary.main}`,
    }
}))

const internalLinks = [
    {
        title: 'Home',
        link: 'services',
    },
    {
        title: 'Conecta',
        link: 'portfolio'
    },
    {
        title: '¿Cómo funciona?',
        link: 'contact'
    }
]

const Header = () => {
    return (
        <BoxContainer component='navbar'>
            <Box sx={{
                display: 'flex',
                fontWeight: '300',
                fontSize: '1rem',
                color: '#fff',
                marginRight: '2rem',
                listStyle: 'none',
                alignItems: 'center'
            }} component='ul'>
                {internalLinks.map(link => (
                    <li>
                        <AnchorTag
                            aria-label={link.title}
                            to={link.link}
                            spy={true}
                            duration={500}
                            smooth={true}
                        >
                            {link.title}
                        </AnchorTag>
                    </li>
                ))}
                <li>
                    <Box>
                        <LoginDialog />
                    </Box>
                </li>
            </Box>
        </BoxContainer>
    );
}

export default Header;
