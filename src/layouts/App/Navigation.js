import * as React from 'react'
import LinkBehavior from '../../components/LinkBehavior'
import { Toolbar, IconButton, Tooltip } from "@mui/material"
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
// Icons
import { ReactComponent as HuellaIcon } from '../../assets/icons/Huella.svg'
import { ReactComponent as HuellaActiveIcon } from '../../assets/icons/PawHouseActive.svg'
import { ReactComponent as StoreIcon } from '../../assets/icons/Store.svg'
import { Newspaper } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Home } from 'lucide-react';
import { User } from 'lucide-react';
import { Dog } from 'lucide-react';

const icons = [
    {
        label: 'Inicio',
        icon: <HuellaIcon />,
        active: <HuellaActiveIcon />,
        route: '/home'
    },
    {
        label: 'Marketplace',
        icon: <StoreIcon />,
        active: <StoreIcon />,
        route: '/market'
    },
    {
        label: 'Blog',
        icon: <Newspaper color='#ccc' />,
        active: <Newspaper color='#A167C9' />,
        route: '/blog'
    },
    {
        label: 'Chat',
        icon: <MessageCircle color='#ccc' />,
        active: <MessageCircle color='#A167C9' />,
        route: '/chat'
    },
    {
        label: 'Perfil',
        icon: <Dog color='#ccc' />,
        active: <Dog color='#A167C9' />,
        route: '/profile'
    }
]

const businessIcons = [
    {
        label: 'Inicio',
        icon: <Home color='#ccc' />,
        active: <Home color='#A167C9' />,
        route: '/home'
    },
    {
        label: 'Blog',
        icon: <Newspaper color='#ccc' />,
        active: <Newspaper color='#A167C9' />,
        route: '/blog'
    },
    {
        label: 'Marketplace',
        icon: <StoreIcon color='#ccc' />,
        active: <StoreIcon />,
        route: '/market'
    },
    {
        label: 'Perfil',
        icon: <User color='#ccc' />,
        active: <User color='#A167C9' />,
        route: '/profile'
    }
]

const Navigation = () => {
    const location = useLocation();
    const { state: { user } } = useAuth();

    const renderUserLinks = () => icons.map((icon, i) => (
        <Tooltip key={i} title={icon.label}>
            <IconButton component={LinkBehavior} to={icon.route}>
                {React.cloneElement(
                    (location.pathname == icon.route) ? icon.active : icon.icon,
                    {}
                )}
            </IconButton>
        </Tooltip>
    ))

    const renderBussinessLinks = () => businessIcons.map((icon, i) => (
        <Tooltip key={i} title={icon.label}>
            <IconButton component={LinkBehavior} to={icon.route}>
                {React.cloneElement(
                    (location.pathname == icon.route) ? icon.active : icon.icon,
                    {}
                )}
            </IconButton>
        </Tooltip>
    ))

    return (
        <Toolbar sx={{
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
            backgroundColor: '#fff'
        }}>
            {(user.role == 'user') ? renderUserLinks() : renderBussinessLinks()}
        </Toolbar>
    )
}

export default Navigation
