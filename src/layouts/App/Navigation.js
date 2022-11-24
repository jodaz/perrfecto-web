import * as React from 'react'
import LinkBehavior from '../../components/LinkBehavior'
import { Toolbar, IconButton, Tooltip } from "@mui/material"
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
// Icons
import { ReactComponent as HuellaIcon } from '../../assets/icons/Huella.svg'
import { ReactComponent as HomeIcon } from '../../assets/icons/Home.svg'
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg'
import { ReactComponent as HuellaActiveIcon } from '../../assets/icons/HuellaActive.svg'
import { ReactComponent as StoreIcon } from '../../assets/icons/Store.svg'
import { ReactComponent as StoreActiveIcon } from '../../assets/icons/StoreActive.svg'
import { ReactComponent as DogIcon } from '../../assets/icons/Dog.svg'
import { ReactComponent as NewspaperIcon } from '../../assets/icons/Newspaper.svg'
import { ReactComponent as DogActiveIcon } from '../../assets/icons/DogActive.svg'
import { ReactComponent as EditIcon } from '../../assets/icons/Edit.svg'
import { ReactComponent as Message2Icon } from '../../assets/icons/Message2.svg'
import { ReactComponent as PostActiveIcon } from '../../assets/icons/PostActive.svg'

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
        active: <StoreActiveIcon />,
        route: '/market'
    },
    {
        label: 'Blog',
        icon: <NewspaperIcon />,
        active: <PostActiveIcon />,
        route: '/blog'
    },
    {
        label: 'Chat',
        icon: <Message2Icon />,
        active: <Message2Icon />,
        route: '/chat'
    },
    {
        label: 'Perfil',
        icon: <DogIcon />,
        active: <DogActiveIcon />,
        route: '/profile'
    }
]

const businessIcons = [
    {
        label: 'Inicio',
        icon: <HomeIcon />,
        route: '/home'
    },
    {
        label: 'Blog',
        icon: <NewspaperIcon />,
        active: <PostActiveIcon />,
        route: '/blog'
    },
    {
        label: 'Marketplace',
        icon: <StoreIcon />,
        active: <StoreIcon />,
        route: '/market'
    },
    {
        label: 'Perfil',
        icon: <ProfileIcon />,
        active: <ProfileIcon />,
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
                    // (location.pathname == icon.route) ? icon.active : icon.icon,
                    icon.icon,
                    {}
                )}
            </IconButton>
        </Tooltip>
    ))

    const renderBussinessLinks = () => businessIcons.map((icon, i) => (
        <Tooltip key={i} title={icon.label}>
            <IconButton component={LinkBehavior} to={icon.route}>
                {React.cloneElement(
                    // (location.pathname == icon.route) ? icon.active : icon.icon,
                    icon.icon,
                    {}
                )}
            </IconButton>
        </Tooltip>
    ))

    return (
        <Toolbar sx={{
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)'
        }}>
            {(user.role == 'user') ? renderUserLinks() : renderBussinessLinks()}
        </Toolbar>
    )
}

export default Navigation
