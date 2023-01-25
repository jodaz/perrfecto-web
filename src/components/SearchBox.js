import * as React from 'react';
import { InputAdornment, InputBase } from '@mui/material';
import { Search } from 'lucide-react';

const SearchBox = ({ filter }) => {
    const handleOnChange = (e) => {
        filter({
            search: e.currentTarget.value
        })
    }

    return (
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
    )
};

export default SearchBox
