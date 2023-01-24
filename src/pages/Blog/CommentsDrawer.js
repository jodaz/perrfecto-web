import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import DialogTitle from '../../components/DialogTitle';
import TextInput from '../../components/Forms/TextInput';
import { useForm } from "react-hook-form";
import { apiProvider } from '../../api';
import CommentCard from './CommentCard';

const CommentsDrawer = ({ openComments, handleClose, item }) => {
    const { control, handleSubmit, setValue, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;

            handleClose();
        }
    };

    const onSubmit = async values => {
        try {
            if (!values.msg) return;

            const res = await apiProvider.post(`/api/blog/add-commentary/${item.id}`, values)

            if (res.status >= 200 || res.status < 300) {
                setValue('msg', '');
            }
        } catch (error) {
            console.log(error)
        }
    };

    const list = (anchor) => (
        // <Box onKeyDown={() => handleClose()} component="form" onSubmit={handleSubmit(onSubmit)}>
        <>
            <DialogTitle onClose={() => handleClose()}>
                Comentarios
            </DialogTitle>
            <Divider />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                height: '100%'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    height: '100%'
                }}>
                    {item.Comments.length
                    ? item.Comments.map(item => <CommentCard {...item} />)
                    : (
                        <Box m={1}>
                            Sin comentarios
                        </Box>
                    )}
                </Box>
                <Box
                    p={3}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextInput
                        name='msg'
                        control={control}
                        placeholder="Escribe un comentario"
                        disabled={isSubmitting}
                    />
                </Box>
            </Box>
        </>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Drawer
                    anchor={'bottom'}
                    open={openComments}
                    onClose={toggleDrawer('bottom', false)}
                    sx={{
                        '& .MuiPaper-root': {
                            position: 'absolute',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            width: '99%',
                            bottom: 0,
                            height: '50%'
                        },
                    }}
                    PaperProps={{ style: { position: 'absolute' } }}
                    BackdropProps={{ style: { position: 'absolute' } }}
                    ModalProps={{
                        container: document.getElementById('comments-drawer-container'),
                        style: { position: 'absolute' }
                    }}
                >
                    {list('bottom')}
                </Drawer>
            </Box>
        </Box>
    );
}

export default CommentsDrawer
