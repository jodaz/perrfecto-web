import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextInput from '../../components/Forms/TextInput';
import { useForm } from "react-hook-form";
import { apiProvider } from '../../api';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'
import { commentBlog } from '../../utils/socket';

const CommentBox = ({ item, isReplying, closeReply }) => {
    const { state: { user } } = useAuth()
    const { control, handleSubmit, setValue, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });

    const onSubmit = async values => {
        if (!values.msg) return;
        // const endpoint = isReplying
        //     ? `/api/blog/add-reply-blog/${item.id}`
        //     : `/api/blog/add-commentary/${item.id}`

        try {
            if (isReplying) {
                const res = await apiProvider.post(`/api/blog/add-commentary/${item.id}`, values)

                if (res.status >= 200 || res.status < 300) {
                    setValue('msg', '');
                }
            } else {
                const res = await commentBlog({
                    blog: item.id,
                    user: user.id,
                    msg: values.msg
                })

                if (res) {
                    console.log(res)
                    setValue('msg', '');
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
