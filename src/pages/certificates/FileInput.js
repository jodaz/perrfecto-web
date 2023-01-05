import * as React from 'react';
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form'
import IconButton from '@mui/material/Typography';
import { Camera } from 'lucide-react';

const Dropzone = ({
    value = null,
    onChange,
    disabled
}) => {
    const [file, setFile] = React.useState(value);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        maxFiles: 1,
        multiple: false,
        onDrop: (acceptedFiles, event) => {
            const fileObject = Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0])
            })

            setFile(fileObject);
            onChange(acceptedFiles)
        },
        disabled: disabled
    })

    React.useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return (file) => {
            if (file == true) {
                return URL.revokeObjectURL(file.preview)
            }
        };
    }, []);

    return (
        <Box sx={{
            position: 'relative'
        }}>
            <div {...getRootProps()}>
                <input
                    disabled={disabled} {...getInputProps()}
                />
                <Box sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}>
                    <IconButton color="warning" sx={{ mr: 1 }}>
                        <Camera />
                    </IconButton>
                    {(file) ? <>{file.path}</> : 'Seleccione'}
                </Box>
            </div>
        </Box>
    )
}

const FileInput = ({
    name,
    control,
    rules,
    disabled,
    validations,
    defaultValue,
    ...rest
}) => (
    <Controller
        rules={rules}
        defaultValue={defaultValue}
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

export default FileInput;
