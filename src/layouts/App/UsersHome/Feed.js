import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from './Stack';
import { CircularProgress } from '@mui/material';
import FilterButton from '../../../components/Buttons/FilterButton';

const Feed = ({
    isLoading,
    isLoaded,
    publications,
    handleSelect,
    isSmall
}) => (
    <Box sx={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        width: isSmall ? '100%' : '50%',
        margin: '0 auto',
        height: '100%',
        zIndex: 100
    }}>
        {(!isLoading) ? (
            <Stack
                data={publications}
                isLoaded={isLoaded}
                onVote={(item, vote) => null}
                onClick={(item) => handleSelect(item)}
            />
        ) : (
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CircularProgress color="primary" />
            </Box>
        )}
        <FilterButton />
    </Box>
);

export default Feed;
