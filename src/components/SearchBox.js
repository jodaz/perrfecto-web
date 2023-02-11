import * as React from 'react';
import { IconButton, InputAdornment, InputBase } from '@mui/material';
import { Search, X, XCircle } from 'lucide-react';

const SearchBox = ({ filter }) => {
    const [value, setValue] = React.useState('');

    const handleOnChange = (e) => {
        setValue(e.currentTarget.value)
    }

    const clearInput = () => setValue('')

    React.useEffect(() => {
        filter({ search: value })
    }, [value])

    return (
        <InputBase
            value={value}
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
            endAdornment={
                value && (
                    <InputAdornment>
                        <IconButton color="error" onClick={clearInput}>
                            <XCircle size={18} />
                        </IconButton>
                    </InputAdornment>
                )
            }
            onChange={handleOnChange}
        />
    )
};

export default SearchBox
