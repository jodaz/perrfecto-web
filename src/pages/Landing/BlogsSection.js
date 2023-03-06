import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import iPhoneAd from '../../assets/images/iPhone-AD.png'
import useMediaQuery from '@mui/material/useMediaQuery';

const BlogsSection = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            backgroundColor: theme => theme.palette.secondary.main,
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 4
        }}>
            <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary.main"
                fontSize='1.5rem'
                lineHeight={isSmall ? '28px' : '40px'}
                textAlign='left'
                gutterBottom
            >
                Mantente informado sobre los cuidados de tu mascota y descubre consejos valiosos.
            </Typography>
        </Box>
    )
}

export default BlogsSection
