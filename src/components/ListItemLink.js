import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LinkBehavior from './LinkBehavior';
import { ListItemIcon } from '@mui/material';
import { ChevronRight } from 'lucide-react';

const ListItemLink = ({ to, title, color = 'text.secondary' }) => (
    <ListItem component={LinkBehavior} disablePadding to={to} sx={{
        borderRadius: '8px',
        '.MuiTouchRipple-child': {
            backgroundColor: theme => theme.palette.text.tertiary
        }
    }}>
        <ListItemButton sx={{ borderRadius: '8px', margin: '2px 0' }}>
            <ListItemText
                primary={title}
                primaryTypographyProps={{
                    color: color,
                    fontWeight: 'medium',
                    variant: 'body2',
                }}
            />
            <ListItemIcon sx={{ minWidth: 0 }}>
                <ChevronRight />
            </ListItemIcon>
        </ListItemButton>
    </ListItem>
)

export default ListItemLink
