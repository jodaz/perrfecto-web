import * as React from 'react';
import Box from '@mui/material/Box';
import { InputAdornment, InputBase } from '@mui/material';
import { Search } from 'lucide-react';

const FavouriteSearchBox = () => {
    return (
        <Box sx={{ p: 2 }}>
            <InputBase
                placeholder='Buscar'
                sx={{
                    borderRadius: '8px 12px',
                    backgroundColor: '#ECECEC',
                    height: '40px'
                }}
                fullWidth
                startAdornment={
                    <InputAdornment sx={{ marginRight: '0.5rem'}}>
                        <Search color="#A6A6A6" />
                    </InputAdornment>
                }
            />
        </Box>
    )
};

export default FavouriteSearchBox
