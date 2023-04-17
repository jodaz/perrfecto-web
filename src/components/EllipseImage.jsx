import * as React from 'react';
import Box from '@mui/material/Box';

const EllipseImage = ({
    n,
    sx
}) => (
    <Box
        component='img'
        src={`/images/default/${n}.png`}
        sx={{
            position: 'absolute',
            ...sx
        }}
    />
)

export default EllipseImage
