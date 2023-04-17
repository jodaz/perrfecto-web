import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import getUserPhoto from '../../utils/getUserPhoto'

const FeaturedBusinessCard = ({
    business_name,
    AnnMultimedia,
    onClick
}) => (
    <Card
        variant="outlined"
        sx={{
            display: 'flex',
            position: 'relative',
            border: 'none',
            flexDirection: { xs: 'column', sm: 'row' },
            transition: '0.3s',
            cursor: 'pointer',
            height: "170px",
            '&: hover': {
                opacity: 0.75
            }
        }}
        onClick={onClick}
    >
        <CardMedia
            component="img"
            width="inherit"
            height="inherit"
            alt="Beside Myself album cover"
            src={getUserPhoto(AnnMultimedia[0].name)}
            sx={{
                borderRadius: '12px',
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 31.77%, rgba(0, 0, 0, 0.64) 100%), url(.jpg)'
            }}
        />
        <Box sx={{
            position: 'absolute',
            bottom: '20px',
            left: '12px'
        }}>
            <Typography
                variant="body1"
                color="#fff"
                fontWeight={500}
                sx={{
                    textAlign: { xs: 'center', sm: 'start' },
                    mt: { xs: 1.5, sm: 0 },
                }}
            >
                {business_name}
            </Typography>
        </Box>
    </Card>
);

export default FeaturedBusinessCard
