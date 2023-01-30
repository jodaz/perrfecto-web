import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import LanguageButton from './LanguageButton';
import Logo from '../../components/Logo';
import { styled } from '@mui/material/styles';
import LinkBehavior from '../../components/LinkBehavior';
import useMediaQuery from '@mui/material/useMediaQuery';

const AnchorTag = styled(Link)(({ theme, dark }) => ({
    textDecoration: 'none',
    padding: '0',
    [theme.breakpoints.up("sm")]: {
        padding: '0 1rem',
    },
    fontWeight: '400',
    color: dark ? theme.palette.primary.main : theme.palette.text.primary,
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
        link: '/business',
        dark: true
    }
]

function ResponsiveAppBar({ dark }) {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const generateButtons = () => (
        <>
            <Box sx={{ p: 1 }}>
                <LanguageButton />
            </Box>
            <Box sx={{ p: 1 }}>
                <Button
                    variant="outlined"
                    color='primary'
                    to='/login'
                    component={LinkBehavior}
                >
                    Iniciar sesión
                </Button>
            </Box>
        </>
    )

    return (
        <AppBar
            position="fixed"
            sx={{
                background: dark ? 'linear-gradient(0deg, rgba(161, 103, 201, 0.1), rgba(161, 103, 201, 0.1)), #FFFFFF;' : '#FFFFFF',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo />
                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: '300',
                        fontSize: '1rem',
                        color: '#fff',
                        listStyle: 'none',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flex: 1
                    }}>
                        {internalLinks.map((link) => (
                            <li>
                                <AnchorTag
                                    aria-label={link.title}
                                    to={link.link}
                                    component={LinkBehavior}
                                    dark={link.dark}
                                >
                                    {link.title}
                                </AnchorTag>
                            </li>
                        ))}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flex: matches ? 1 : 'unset'
                    }}>
                        {generateButtons()}
                        <Box sx={{
                            display: { xs: 'flex', md: 'none' },
                            justifyContent: 'flex-end'
                        }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color={dark ? 'black' : 'inherit'}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {internalLinks.map((link) => (
                                    <AnchorTag
                                        aria-label={link.title}
                                        to={link.link}
                                        component={LinkBehavior}
                                        dark={dark || matches}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <MenuItem>
                                            {link.title}
                                        </MenuItem>
                                    </AnchorTag>
                                ))}
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
