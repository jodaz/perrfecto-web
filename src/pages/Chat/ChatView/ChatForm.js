import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import TextInput from '../../../components/Forms/TextInput';
import { useAuth } from '../../../context/AuthContext';
import { emitMessage } from '../../../utils/socket';
import { useParams } from 'react-router-dom';
import { useChat, setMessage } from '../../../context/ChatContext';

const ChatForm = ({ receptor, disabled }) => {
    const { chatID } = useParams()
    const { dispatch } = useChat()
    const { state: { user } } = useAuth()
    const { control, handleSubmit, setValue, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            message: ''
        }
    });

    const onSubmit = async values => {
        try {
            if (values.message) {
                const emitData = {
                    id_chat: chatID,
                    message: values.message,
                    receiver: receptor.user.id,
                    sender: user.id
                }

                emitMessage(emitData)

                setMessage(dispatch, {
                    uid: emitData.sender,
                    message: emitData.message
                })

                setValue('message', '')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.08)'
        }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ p: 1, color: 'black' }}>
                <TextInput
                    name='message'
                    control={control}
                    placeholder='Escribir un mensaje'
                    labelColor="text"
                    disabled={disabled}
                    endAdornment={
                        <IconButton
                            sx={{
                                fontSize: '1rem',
                                padding: '0'
                            }}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            <SendIcon />
                        </IconButton>
                    }
                />
            </Box>
        </Box>
    );
}

export default ChatForm
