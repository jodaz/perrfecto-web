import * as React from 'react';
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LinkBehavior from './LinkBehavior';
import { Plus } from 'lucide-react';

const Photo = () => (
    <Box to='?dog=true' sx={{
        position: 'relative'
    }} component={LinkBehavior}>
        <Box component="div" sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            cursor: 'pointer',
            textAlign: 'center',
            color: theme => theme.palette.getContrastText(
                theme.palette.background.default
            ),
            border: `1px solid #B7B7B7`,
            borderRadius: '50%',
            '& > *': {
                marginRight: '0.5rem',
                marginLeft: '0.5rem'
            },
            height: '7.5rem',
            width: '7.5rem',
            transition: '0.5s',
            '&:hover': {
                opacity: '0.9'
            },
            zIndex: 10,
            position: 'relative'
        }}>
            <Avatar
                src='/images/Avatar.svg'
                sx={{
                    height: 'inherit',
                    width: 'inherit'
                }}
            />
        </Box>
        <Box component="div" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '1rem',
            height: '1rem',
            padding: '0.5rem',
            borderRadius: '50%',
            background: theme => theme.palette.primary.main,
            zIndex: 1000,
            position: 'absolute',
            bottom: 0,
            right: 0,
            color: '#F6F6F6 !important',
            cursor: 'pointer'
        }}>
            <Plus />
        </Box>
    </Box>
)

export default Photo;
