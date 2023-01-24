import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import LinkBehavior from './LinkBehavior'

const IconButtonWithTitle = ({ to, icon, title }) => (
    <Card
        variant="outlined"
        sx={{
            display: 'flex',
            border: 'none',
            flexDirection: 'column',
            alignItems: 'center',
            transition: '0.3s',
            boxShadow: '0px 1.3625px 4.0875px rgba(94, 94, 94, 0.12)',
            cursor: 'pointer',
            p: 4,
            maxWidth: 100,
            borderRadius: '13.625',
            textDecoration: 'none',
            '&: hover': {
                opacity: 0.75
            }
        }}
        component={LinkBehavior}
        to={to}
    >
        <Box>
            {icon}
        </Box>
        <Typography
            variant="body1"
            color="text.secondary"
            fontWeight={700}
            sx={{
                textAlign: { xs: 'center', sm: 'start' },
                mt: { xs: 1.5, sm: 0 },
            }}
        >
            {title}
        </Typography>
    </Card>
);

export default IconButtonWithTitle
