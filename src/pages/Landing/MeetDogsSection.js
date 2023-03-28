import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';
import EllipseImage from '../../components/EllipseImage';

const MeetDogsSection = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            width: { sm: '80%', xs: '80%', md: '30%', lg: '30%' },
            margin: 'auto 0',
            backgroundColor: '#FFF',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '4rem 0',
            height: isSmall ? '400px' : '500px',
            position: 'relative'
        }}>
            <Typography
                variant="subtitle1"
                textAlign='center'
                fontWeight={700}
                color="primary.main"
                fontSize='1.5rem'
                lineHeight={isSmall ? '28px' : '36px'}
                maxWidth='600px'
                gutterBottom
            >
                Conoce las mascotas que obtuvieron más likes de la semana, día y mes
            </Typography>
            {!isSmall && (
                <>
                    <EllipseImage
                        n='pawprints/huella1'
                        sx={{
                            top: '30px',
                            right: '50px'
                        }}
                    />
                    <EllipseImage
                        n='pawprints/huella2'
                        sx={{
                            top: '200px',
                            right: '40px'
                        }}
                    />
                    <EllipseImage
                        n='pawprints/huella6'
                        sx={{
                            top: '400px',
                            right: '70px'
                        }}
                    />
                    <EllipseImage
                        n='pawprints/huella3'
                        sx={{
                            top: '30px',
                            left: '90px'
                        }}
                    />
                    <EllipseImage
                        n='pawprints/huella4'
                        sx={{
                            top: '180px',
                            left: '50px'
                        }}
                    />
                    <EllipseImage
                        n='pawprints/huella5'
                        sx={{
                            bottom: '50px',
                            left: '90px'
                        }}
                    />
                </>
            )}
        </Box>
    )
}

export default MeetDogsSection
