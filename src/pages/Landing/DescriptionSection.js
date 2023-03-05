import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';

const DescriptionSection = ({
    marked,
    title,
    subtitle,
    Image,
    orientation = 'row-reverse'
}) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: orientation, lg: orientation },
            justifyContent: 'center',
            alignItems: 'center',
            p: 2
        }}>
            <Box sx={{
                textAlign: 'left',
                width: { sm: '80%', xs: '80%', md: '30%', lg: '30%' },
                margin: 'auto 0',
            }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="text.primary"
                    fontSize='2rem'
                    lineHeight={isSmall ? '32px' : '40px'}
                    gutterBottom
                >
                    <Box color="primary.main" display='inline-block'>{marked}</Box> {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    lineHeight={isSmall ? '22px' : '24px'}
                    gutterBottom
                >
                    {subtitle}
                </Typography>
            </Box>
            <Box
                component="img"
                src={Image}
                sx={{
                    width: '240px',
                    height: '480px',
                    marginTop: '1rem',
                    marginRight: isSmall ? 0 : '4rem',
                    marginLeft: isSmall ? 0 : '4rem'
                }}
            />
        </Box>
    )
}

export default DescriptionSection
