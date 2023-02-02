import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { ReactComponent as RocketIcon } from '../../assets/icons/Rocket.svg'
import { ChevronRight } from 'lucide-react';
import getUserPhoto from '../../utils/getUserPhoto'
import LinkBehavior from '../../components/LinkBehavior';

const BusinessCard = data => (
    <Card
        variant="outlined"
        sx={{
            display: 'flex',
            border: 'none',
            flexDirection: 'row',
            transition: '0.3s',
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'unset',
            '&: hover': {
                opacity: 0.75
            }
        }}
        component={LinkBehavior}
        to={`${data.id}`}
    >
        {(data.AnnMultimedia.length) ? (
            <CardMedia
                component="img"
                width="50px"
                height="50px"
                alt="business_cover"
                src={getUserPhoto(data.AnnMultimedia[0].name)}
                sx={{
                    maxWidth: '50px',
                    maxHeight: '50px',
                    borderRadius: '12px',
                }}
            />
        ) : <Box height='50px'><RocketIcon /></Box>}
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
                {data.business_name}
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
                {data.city}, {data.province}
            </Typography>
        </Box>
        <Box>
            <ChevronRight />
        </Box>
    </Card>
);

export default BusinessCard
