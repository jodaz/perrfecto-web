import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ChipArrayInput from './Forms/ChipArrayInput';
import DialogTitle from './DialogTitle';
import { Chip, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { Stack } from '@mui/system';

const InterestInput = ({
    control,
    options,
    isSubmitting,
    currentValues
}) => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [open, setOpen] = React.useState(false)

    const toggleDrawer = (anchor) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: !state[anchor] });
        setOpen(!open)
    };

    const list = (anchor) => (
        <Box onKeyDown={toggleDrawer(anchor, false)}>
            <DialogTitle onClose={toggleDrawer(anchor, false)}>
                Busco intereses en...
            </DialogTitle>
            <Divider />
            <Box sx={{ p: 2 }}>
                <ChipArrayInput
                    control={control}
                    name='interests'
                    labels={options}
                    // rules={FEATURES.rules}
                    // validations={FEATURES.messages}
                    disabled={isSubmitting}
                />
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
                <Typography variant="subtitle1" color="text.tertiary">
                    Busco:
                </Typography>
                <Typography
                    onClick={toggleDrawer('bottom', true)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                    color="text.tertiary"
                >
                    Seleccione las características <ChevronDown size={14} />
                </Typography>
                <Drawer
                    anchor={'bottom'}
                    open={open}
                    onClose={toggleDrawer('bottom', false)}
                    sx={{
                        '& .MuiDrawer-root': {
                            position: 'absolute',
                            borderTopLeftRadius: '12px',
                        },
                        '& .MuiPaper-root': {
                            position: 'absolute',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            width: '99%'
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
            {(currentValues) && (
                <Stack direction='row' flexWrap='wrap'>
                    {
                        currentValues.map(item => {
                            const label = options.find(({ id }) => id == item)

                            return <Chip label={label.name} sx={{ mt: 1, mr: 1 }} />
                        })
                    }
                </Stack>
            )}
        </Box>
    );
}

export default InterestInput
