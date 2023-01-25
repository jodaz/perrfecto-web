import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../components/Menu';
import { Trash2, Edit, MoreVertical, Star } from 'lucide-react'
import LinkBehavior from '../../components/LinkBehavior';

const PostMenu = ({
    item,
    handleDeletePost
}) => (
    <Menu
        icon={<MoreVertical />}
        IconButtonProps={{
            sx: {
                backgroundColor: '#fff',
                border: 'none',
                color: 'none'
            }
        }}
    >
        <Box onClick={() => null}
            sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'unset',
            textDecoration: 'none',
        }}>
            <Star />
            <Box sx={{ paddingLeft: '0.5rem' }}>
                Destacar publicación
            </Box>
        </Box>
        <Box component={LinkBehavior} sx={{
            display: 'flex',
            textDecoration: 'none',
            color: 'unset',
            alignItems: 'center'
        }} to={`/blogs/${item.id}/edit`}>
            <Edit />
            <Box sx={{ paddingLeft: '0.5rem' }}>
                Editar blog
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            alignItems: 'center'
        }} onClick={handleDeletePost}>
            <Trash2 />
            <Box sx={{ paddingLeft: '0.5rem' }}>
                Eliminar blog
            </Box>
        </Box>
    </Menu>
)

export default PostMenu
