import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

const CategoryCard = ({
    handleClick,
    title,
    image
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
            width: "100%",
            height: "100px",
            '&: hover': {
                opacity: 0.75
            }
        }}
    >
        <CardMedia
            component="img"
            width="inherit"
            height="inherit"
            alt="Beside Myself album cover"
            src={image}
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
                {title}
            </Typography>
        </Box>
    </Card>
);

export default CategoryCard
