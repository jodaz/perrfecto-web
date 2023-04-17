import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import DialogTitle from '../../components/DialogTitle';
import LinkBehavior from '../../components/LinkBehavior';

const AdOptionsDrawer = ({ open, handleClose, publication }) => {
    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        handleClose();
    };

    const list = (anchor) => (
        <Box onKeyDown={handleClose}>
            <DialogTitle onClose={handleClose}>
                Opciones de anuncio
            </DialogTitle>
            <Divider />
            <Box
                component={LinkBehavior}
                to={`/profile/ads/${publication.id}/edit`}
                width='inherit'
                sx={{ textDecoration: 'none', color: 'unset' }}
            >
                Editar anuncio
            </Box>
        </Box>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Drawer
                    anchor={'bottom'}
                    open={open}
                    onClose={toggleDrawer('bottom', false)}
                    sx={{
                        '& .MuiPaper-root': {
                            position: 'absolute',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            width: '99%',
                            bottom: 0
                        },
                    }}
                    PaperProps={{ style: { position: 'absolute' } }}
                    BackdropProps={{ style: { position: 'absolute' } }}
                    ModalProps={{
                        container: document.getElementById('showAd-drawer-container'),
                        style: { position: 'absolute' }
                    }}
                >
                    {list('bottom')}
                </Drawer>
            </Box>
        </Box>
    );
}

export default AdOptionsDrawer
