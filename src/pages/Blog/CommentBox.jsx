import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextInput from '../../components/Forms/TextInput';
import { useForm } from "react-hook-form";
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'
import { commentBlog, replyComment } from '../../utils/socket';

const CommentBox = ({ item, isReplying, closeReply, fetchComments }) => {
    const { state: { user } } = useAuth()
    const { control, handleSubmit, setValue, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = async values => {
        if (!values.msg) return;
        let response;

        try {
            if (isReplying) {
                response = await replyComment({
                    comment: item.id,
                    user: user.id,
                    msg: values.msg
                })

                if (response) {
                    setValue('msg', '');
                    fetchComments();
                }
            } else {
                const response = await commentBlog({
                    blog: item.id,
                    user: user.id,
                    msg: values.msg
                })

                if (response) {
                    setValue('msg', '');
                    fetchComments();
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Box
            p={1}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            {(isReplying) && (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Box flex={1} mb={1}>
                        <Typography
                            variant="body2"
                        >
                            Respondiendo a
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight={700}
                        >
                            {`${item.User.name} `}
                            {item.User.lastName && `${item.User.lastName}`}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={closeReply}>
                            <X size={16} />
                        </IconButton>
                    </Box>
                </Box>
            )}
            <TextInput
                name='msg'
                control={control}
                placeholder="Escribe un comentario"
                disabled={isSubmitting}
            />
        </Box>
    );
}

export default CommentBox
