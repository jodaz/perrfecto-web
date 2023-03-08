import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';

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
            height: isSmall ? '400px' : '500px'
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
        </Box>
    )
}

export default MeetDogsSection
