import * as React from 'react';
import Box from '@mui/material/Box';
import { InputAdornment, InputBase } from '@mui/material';
import { Search } from 'lucide-react';

const MarketSearchBox = () => {
    const handleOnChange = (e) => {
        console.log(e.currentTarget.value)
    }

    return (
        <Box sx={{ p: 2 }}>
            <InputBase
                placeholder='Buscar'
                sx={{
                    borderRadius: '8px !important',
                    backgroundColor: '#ECECEC',
                    height: '40px'
                }}
                fullWidth
                startAdornment={
                    <InputAdornment sx={{ marginRight: '0.5rem'}}>
                        <Search color="#A6A6A6" />
                    </InputAdornment>
                }
                onChange={handleOnChange}
            />
        </Box>
    )
};

export default MarketSearchBox
