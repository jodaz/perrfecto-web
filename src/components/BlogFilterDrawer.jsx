import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DialogTitle from './DialogTitle';
import { useForm } from "react-hook-form";
import SelectInput from './Forms/SelectInput';
import {
    useBlogs,
    toggleFilters,
    resetFilters,
    searchBlogs
} from '../context/BlogContext';
import { alpha } from '@mui/material';

const statuses = [
    { value: 1, label: "Activo" },
    { value: 2, label: "Rechazado" }
];

const BlogFilterDrawer = () => {
    const { control, handleSubmit, reset, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const { state: { openFilter }, dispatch } = useBlogs();

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        toggleFilters(dispatch)
        reset();
    };

    const resetFilter = () => {
        reset();
        resetFilters(dispatch)
    }

    const onSubmit = async values => {
        const parsedData = {};

        try {
            searchBlogs(dispatch, values)
        } catch (error) {
            console.log(error)
        }
    };

    const list = (anchor) => (
        <Box onKeyDown={toggleDrawer(anchor, false)} component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle onClose={toggleDrawer(anchor, false)}>
                Filtros
            </DialogTitle>
            <Divider />
            <Box sx={{ p: 3 }}>
                <SelectInput
                    name='status'
                    control={control}
                    disabled={isSubmitting}
                    label='Estado'
                    options={statuses}
                    InputProps={{
                        placeholder: 'Seleccione'
                    }}
                    noOptionsText='Sin resultados'
                />
            </Box>
            <Box sx={{ p: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                >
                    Filtrar
                </Button>
                <Box mt={2} />
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => resetFilter()}
                    sx={{
                        backgroundColor: '#ccc',
                        '&:hover': {
                            color: '#fff',
                            backgroundColor: alpha(`#000`, 0.3)
                        }
                    }}
                >
                    Restablecer
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
                        container: document.getElementById('blog-drawer-container'),
                        style: { position: 'absolute' }
                    }}
                >
                    {list('bottom')}
                </Drawer>
            </Box>
        </Box>
    );
}

export default BlogFilterDrawer
