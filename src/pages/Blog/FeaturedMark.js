import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { Star } from 'lucide-react'

const FeaturedMark = positions => (
    <Tooltip title="Debe esperar 24 horas para que su post deje de ser destacado.">
        <Box sx={{
            position: 'absolute',
            zIndex: 100,
            bgcolor: 'transparent',
            borderRadius: '100px',
            padding: 1,
            color: theme => theme.palette.warning.main,
            ...positions
        }}>
            <Star />
        </Box>
    </Tooltip>
)

export default FeaturedMark
