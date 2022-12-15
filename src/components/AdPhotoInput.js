import * as React from 'react';
import FormHelperText from '@mui/material/FormHelperText'
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { PlusCircle } from 'lucide-react';

const Dropzone = ({
    onChange
}) => {
    const [files, setFiles] = React.useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            onChange(acceptedFiles)
        },
        maxFiles: 15
    });

    const thumbs = files.map((file, i) => (
        <SwiperSlide key={i}>
            <Box
                component='img'
                src={file.preview}
                onLoad={() => { URL.revokeObjectURL(file.preview) }}
                sx={{
                    borderRadius: '12px',
                    height: 180,
                    width: 160,
                    marginRight: 1
                }}
            />
        </SwiperSlide>
    ));
    React.useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <Box sx={{ display: 'flex', maxWidth: '200px', mt: 1, mb: 2 }}>
            <Box sx={{ display: 'flex', maxWidth: '200px' }}>
                <Swiper
                    modules={[Scrollbar]}
                >
                    {thumbs}
                </Swiper>
            </Box>
            <Box {...getRootProps({className: 'dropzone'})} sx={{ display: 'flex' }}>
                <input {...getInputProps()} />
                {(!files.length) &&
                    (<Box sx={{
                        height: 180,
                        width: 160,
                        bgcolor: '#ECECEC',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        ml: 2
                    }}>
                        <PlusCircle color='#858585' />
                    </Box>
                )}
                <Box sx={{
                    display: 'flex',
                    p: 2,
                    width: '100px',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <Box sx={{
                        width: 'fit-content',
                        bgcolor: '#ECECEC',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 100,
                        cursor: 'pointer'
                    }}>
                        <IconButton color="text.tertiary">
                            <PlusCircle />
                        </IconButton>
                    </Box>
                    <Typography fontSize={12} color="text.tertiary">
                        Tienes un máximo de 15 fotos
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

const AdPhotoInput = ({
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
                {error && (
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

export default AdPhotoInput
