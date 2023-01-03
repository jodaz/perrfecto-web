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
import styled from '@emotion/styled';

const SwiperStyled = styled(Swiper)(() => ({
    '& .swiper-wrapper': {
        width: '200px',
        marginBottom: '0.5rem'
    }
}))

const Dropzone = ({
    onChange,
    value = [],
    deletePhotoHandler,
}) => {
    const [files, setFiles] = React.useState((() => {
        if (typeof(value) == 'string') {
            return JSON.parse(value)
        }
        return value;
    })());
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
            'video/mp4': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            onChange(acceptedFiles)
        },
        maxFiles: 15
    });

    const removePhoto = item => {
        if (deletePhotoHandler) {
            deletePhotoHandler(item)
        } else {
            const newFiles = files.filter(file => file != item);

            setFiles(newFiles);
            onChange(newFiles)
        }
    }

    const thumbs = files.map((file, i) => (
        <SwiperSlide key={i}>
            <Box sx={{ position: 'relative' }}>
                <Box
                    component='img'
                    src={file.preview ? file.preview : getUserPhoto(file)}
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    sx={{
                        borderRadius: '12px',
                        height: 220,
                        width: 180,
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
                    }} onClick={() => removePhoto(file)}>
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

    React.useEffect(() => {
        if (typeof(value) == 'string') {
            return setFiles(JSON.parse(value))
        } else {
            return setFiles(value);
        }
    }, [value])

    return (
        <Box sx={{ display: 'flex', mt: 1, mb: 2 }}>
            {!!(files.length) && (
                <Box sx={{ display: 'flex' }}>
                    <SwiperStyled
                        slidesPerView={1}
                        scrollbar={{
                            draggable: true
                        }}
                        grabCursor={true}
                        modules={[Scrollbar]}
                    >
                        {thumbs}
                    </SwiperStyled>
                </Box>
            )}
            <Box {...getRootProps({className: 'dropzone'})} sx={{ display: 'flex' }}>
                <input {...getInputProps()} />
                {(!files.length) &&
                    (<Box sx={{
                        height: 220,
                        width: 180,
                        bgcolor: '#ECECEC',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '12px',
                        cursor: 'pointer'
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
