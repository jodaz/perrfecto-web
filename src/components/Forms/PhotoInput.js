import * as React from 'react';
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import FormHelperText from '@mui/material/FormHelperText'
import { useDropzone } from 'react-dropzone';
import { ReactComponent as PlusIcon } from '../../assets/icons/Plus.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/Delete.svg'
import { Controller } from 'react-hook-form'

const Dropzone = ({
    onChange,
    disabled
}) => {
    const [file, setFile] = React.useState(null);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1,
        multiple: false,
        onDrop: (acceptedFiles) => {
            const fileObject = Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0])
            })

            setFile(fileObject);
            onChange(acceptedFiles)
        },
        disabled: disabled
    })

    const thumbs = () => (
        <Avatar
            src={file.preview}
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

    return (
        <div {...getRootProps()}>
            <input
                disabled={disabled} {...getInputProps()}
            />
            <Box component="div" sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                cursor: 'pointer',
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
                {file && <>{thumbs()}</>}
                <Box component="div" sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '1rem',
                    height: '1rem',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    background: theme => (!file) ? theme.palette.primary.main : theme.palette.error.main,
                    zIndex: 1000,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    color: '#fff'
                }} onClick={() => setFile(null)}>
                    {(file) ? <DeleteIcon /> : <PlusIcon />}
                </Box>
            </Box>
        </div>
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
        render={({ field: { onChange, ...restField }, fieldState: { error, value } }) => (
            <>
                <Dropzone
                    {...restField}
                    onChange={v => onChange(v)}
                    disabled={disabled}
                    {...rest}
                />
                {error && (
                    <FormHelperText error>
                        {validations[name][error.type]}
                    </FormHelperText>
                )}
            </>
        )}
        name={name}
        control={control}
    />
)

export default PhotoInput;
