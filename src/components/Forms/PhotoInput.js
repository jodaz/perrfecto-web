import * as React from 'react';
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import FormHelperText from '@mui/material/FormHelperText'
import { useDropzone } from 'react-dropzone';
import { Plus, Trash2 } from 'lucide-react';
import { Controller } from 'react-hook-form'
import getUserPhoto from '../../utils/getUserPhoto';

const initialState = { preview: '/images/Avatar.svg' }

const Dropzone = ({
    onChange,
    disabled,
    defaultValue,
    handleDelete
}) => {
    const [file, setFile] = React.useState(initialState);
    const { getRootProps, getInputProps, open } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1,
        multiple: false,
        onDrop: (acceptedFiles, event) => {
            const fileObject = Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0])
            })

            setFile(fileObject);

            if (defaultValue) {
                onChange({
                    previous: file,
                    new: acceptedFiles
                })
            } else {
                onChange(acceptedFiles)
            }
        },
        disabled: disabled
    })

    const remove = () => {
        setFile(initialState)
        if (handleDelete) {
            handleDelete();
        }
    }

    const thumbs = () => (
        <Avatar
            src={file ? file.preview : '/images/Avatar.svg'}
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
            sx={{
                height: 'inherit',
                width: 'inherit'
            }}
        />
    );

    React.useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return (file) => {
            if (file == true) {
                return URL.revokeObjectURL(file.preview)
            }
        };
    }, []);

    React.useEffect(() => {
        if (defaultValue) {
            return setFile({
                path: defaultValue,
                preview: getUserPhoto(defaultValue)
            })
        }

        return setFile({ preview: '/images/Avatar.svg' })
    }, [defaultValue])

    return (
        <Box sx={{
            position: 'relative'
        }}>
            <div {...getRootProps()}>
                <input
                    disabled={disabled} {...getInputProps()}
                />
                <Box component="div" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    cursor: disabled ? 'wait' : 'pointer',
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
                    position: 'relative',
                    opacity: (disabled) ? 0.7 : 1
                }}>
                    {thumbs()}
                </Box>
            </div>
            <Box component="div" sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '1rem',
                height: '1rem',
                padding: '0.5rem',
                borderRadius: '50%',
                background: theme => (file.preview == '/images/Avatar.svg') ? theme.palette.primary.main : theme.palette.error.main,
                zIndex: 1000,
                position: 'absolute',
                bottom: 0,
                right: 0,
                color: '#F6F6F6 !important',
                cursor: 'pointer'
            }}>
                {(file.preview != '/images/Avatar.svg') ? <Trash2 onClick={remove} /> : <Plus onClick={open} />}
            </Box>
        </Box>
    )
}

const PhotoInput = ({
    name,
    control,
    rules,
    disabled,
    validations,
    ...rest
}) => (
    <Controller
        rules={rules}
        render={({ field: { onChange, ...restField }, fieldState: { error } }) => (
            <>
                <Dropzone
                    {...restField}
                    onChange={v => onChange(v)}
                    disabled={disabled}
                    {...rest}
                />
                {!!(error && validations) && (
                    <FormHelperText error>
                        {validations[error.type]}
                    </FormHelperText>
                )}
            </>
        )}
        name={name}
        control={control}
    />
)

export default PhotoInput;
