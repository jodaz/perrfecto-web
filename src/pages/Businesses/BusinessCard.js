import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { ChevronRight } from 'lucide-react';

const BusinessCard = ({ handleClick, ...data }) => (
    <Card
        variant="outlined"
        sx={{
            display: 'flex',
            border: 'none',
            flexDirection: 'row',
            transition: '0.3s',
            cursor: 'pointer',
            '&: hover': {
                opacity: 0.75
            }
        }}
        onClick={() => handleClick(data)}
    >
        <CardMedia
            component="img"
            width="50px"
            height="50px"
            alt="Beside Myself album cover"
            src={data.image}
            sx={{
                maxWidth: '50px',
                maxHeight: '50px',
                borderRadius: '12px',
            }}
        />
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            paddingLeft: '10px'
        }}>
            <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={700}
                sx={{
                    textAlign: 'start',
                }}
            >
                {data.name}
            </Typography>
            <Typography
                component="div"
                variant="caption"
                color="text.tertiary"
                fontWeight={500}
                sx={{
                    textAlign: 'start',
                }}
            >
                {data.location}
            </Typography>
        </Box>
        <Box>
            <ChevronRight />
        </Box>
    </Card>
);

export default BusinessCard
