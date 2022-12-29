import * as React from 'react';
import FormHelperText from '@mui/material/FormHelperText'
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { PlusCircle, Trash2 } from 'lucide-react';
import useEffectOnce from '../utils/useEffectOnce';
import getUserPhoto from '../utils/getUserPhoto'
import { alpha } from '@mui/material';

const Dropzone = ({
    onChange,
    value = []
}) => {
    const [files, setFiles] = React.useState((() => {
        if (typeof(value) == 'string') {
            return JSON.parse(value)
        }
        return value;
    })());
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
            <Box sx={{ position: 'relative' }}>
                <Box
                    component='img'
                    src={file.preview ? file.preview : getUserPhoto(file)}
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    sx={{
                        borderRadius: '12px',
                        height: 180,
                        width: 160,
                        marginRight: 1
                    }}
                />
                {(files.length) && (
                    <IconButton sx={{
                        position: 'absolute',
                        zIndex: 1000,
                        bottom: 12,
                        right: 12,
                        backgroundColor: theme => theme.palette.error.main,
                        '&:hover': {
                            backgroundColor: theme => `${alpha(theme.palette.error.main, 0.9)}`
                        }
                    }}>
                        <Trash2 color="#fff" size={16} />
                    </IconButton>
                )}
            </Box>
        </SwiperSlide>
    ));

    useEffectOnce(() => {
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
