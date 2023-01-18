import * as React from 'react'
import LinkBehavior from '../../components/LinkBehavior'
import { Toolbar, IconButton, Tooltip } from "@mui/material"
import { useLocation } from 'react-router-dom';
// Icons
import { ReactComponent as StoreIcon } from '../../assets/icons/Store.svg'
import { ReactComponent as StoreActiveIcon } from '../../assets/icons/StoreActive.svg'
import { Newspaper } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Home } from 'lucide-react';
import { User } from 'lucide-react';
import { Dog } from 'lucide-react';
import PrivateRoute from '../../components/PrivateRoute';

const smallScreenOnly = [
    {
        label: 'Inicio',
        icon: <Home color='#ccc' />,
        active: <Home color='#A167C9' />,
        route: '/home',
        smallScreensOnly: true
    }
]

const generalLinks = [
    {
        label: 'Marketplace',
        icon: <StoreIcon />,
        active: <StoreActiveIcon />,
        route: '/market'
    },
    {
        label: 'Blog',
        icon: <Newspaper color='#ccc' />,
        active: <Newspaper color='#A167C9' />,
        route: '/blogs'
    }
];

const onlyUserLinks = [
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
    },
]

const onlyBusiness = [
    {
        label: 'Marketplace',
        icon: <StoreIcon color='#ccc' />,
        active: <StoreActiveIcon />,
        route: '/market'
    },
    {
        label: 'Blog',
        icon: <Newspaper color='#ccc' />,
        active: <Newspaper color='#A167C9' />,
        route: '/blogs'
    },
    {
        label: 'Perfil',
        icon: <User color='#ccc' />,
        active: <User color='#A167C9' />,
        route: '/profile'
    }
]

const Navigation = ({ isSmall }) => {
    const location = useLocation();

    const renderLinks = icons => icons.map((icon, i) => (
        <Tooltip key={i} title={icon.label}>
            <IconButton component={LinkBehavior} to={icon.route} sx={{ margin: '0 0.75rem'}}>
                {
                    React.cloneElement(
                        (location.pathname.startsWith(icon.route)) ? icon.active : icon.icon,
                        {}
                    )
                }
            </IconButton>
        </Tooltip>
    ))

    return (
        <Toolbar sx={{
            display: 'flex',
            justifyContent: 'center',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
            backgroundColor: '#fff',
            height: isSmall ? '100%' : 'unset'
        }}>
            {isSmall && (
                <PrivateRoute authorize='user,guest,business' unauthorized={null}>
                    {renderLinks(smallScreenOnly)}
                </PrivateRoute>
            )}
            <PrivateRoute authorize='user,guest' unauthorized={null}>
                {renderLinks(generalLinks)}
            </PrivateRoute>
            <PrivateRoute authorize='user' unauthorized={null}>
                {renderLinks(onlyUserLinks)}
            </PrivateRoute>
            <PrivateRoute authorize='business' unauthorized={null}>
                {renderLinks(onlyBusiness)}
            </PrivateRoute>
        </Toolbar>
    )
}

export default Navigation
