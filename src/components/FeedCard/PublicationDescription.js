import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/FiberManualRecord';

const getYearsSince = year => new Date().getUTCFullYear() - year

const PublicationDescription = ({
    breed,
    age,
    province,
    city,
    color,
    dotColor
 }) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'fit-content',
        width: 'fit-content'
    }}>
        {/** Raza */}
        {(breed) && (
            <Typography color={color}>
            {breed}
            </Typography>
        )}
        {(age) && (
            <>
                <Box sx={{ fontSize: '8px', padding: '0 8px' }}>
                    <CircleIcon fontSize='inherit' color={dotColor} />
                </Box>
                <Typography color={color}>
                    {getYearsSince(age)} años
                </Typography>
            </>
        )}
        {(province && city) && (
            <>
                <Box sx={{ fontSize: '8px', padding: '0 8px' }}>
                    <CircleIcon fontSize='inherit' color={dotColor} />
                </Box>
                <Typography color={color}>
                    {province},&nbsp;
                    {city}
                </Typography>
            </>
        )}
    </Box>
);

export default PublicationDescription
