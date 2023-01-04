import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DialogTitle from './DialogTitle';
import { Typography } from '@mui/material';
import { usePublications, toggleFilters } from '../context/PublicationContext';

const FilterDrawer = () => {
    const { state: { openFilter }, dispatch } = usePublications();

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        toggleFilters(dispatch)
    };

    const list = (anchor) => (
        <Box onKeyDown={toggleDrawer(anchor, false)}>
            <DialogTitle onClose={toggleDrawer(anchor, false)}>
                Filtros
            </DialogTitle>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleDrawer(anchor, false)}
                    fullWidth
                >
                    Agregar
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Drawer
                    anchor={'bottom'}
                    open={openFilter}
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
                        container: document.getElementById('drawer-container'),
                        style: { position: 'absolute' }
                    }}
                >
                    {list('bottom')}
                </Drawer>
            </Box>
        </Box>
    );
}

export default FilterDrawer
