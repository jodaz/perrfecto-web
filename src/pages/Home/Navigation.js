import * as React from 'react'
import LinkBehavior from '../../components/LinkBehavior'
import { Toolbar, IconButton, Tooltip } from "@mui/material"
import { useLocation } from 'react-router-dom';
// Icons
import { ReactComponent as HuellaIcon } from '../../assets/icons/Huella.svg'
import { ReactComponent as HuellaActiveIcon } from '../../assets/icons/HuellaActive.svg'
import { ReactComponent as StoreIcon } from '../../assets/icons/Store.svg'
import { ReactComponent as StoreActiveIcon } from '../../assets/icons/StoreActive.svg'
import { ReactComponent as DogIcon } from '../../assets/icons/Dog.svg'
import { ReactComponent as DogActiveIcon } from '../../assets/icons/DogActive.svg'
import { ReactComponent as MessageIcon } from '../../assets/icons/Message.svg'
import { ReactComponent as MessageActiveIcon } from '../../assets/icons/MessageActive.svg'
import { ReactComponent as PostIcon } from '../../assets/icons/Post.svg'
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
        icon: <PostIcon />,
        active: <PostActiveIcon />,
        route: '/blog'
    },
    {
        label: 'Mensajes',
        icon: <MessageIcon />,
        active: <MessageActiveIcon />,
        route: '/messages'
    },
    {
        label: 'Perfil',
        icon: <DogIcon />,
        active: <DogActiveIcon />,
        route: '/profile'
    }
]

const Navigation = () => {
    const location = useLocation();
    console.log(location.pathname == '/no')
    return (
        <Toolbar sx={{
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)'
        }}>
            {icons.map((icon, i) => (
                <Tooltip index={i} title={icon.label}>
                    <IconButton component={LinkBehavior} to={icon.route}>
                        {React.cloneElement(
                            (location.pathname == icon.route) ? icon.active : icon.icon,
                            {}
                        )}
                    </IconButton>
                </Tooltip>
            ))}
        </Toolbar>
    )
}

export default Navigation
