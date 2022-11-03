import * as React from 'react';
import TextInput from './TextInput';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import phonecodes from '../../utils/phonecodes'

const PhoneInput = ({...rest}) => {
    return (
        <>
            <TextInput
                {...rest}
                InputProps={{
                    startAdornment: (
                        <>
                            <Box sx={{
                                color: '#A6A6A6',
                                padding: '0 8px 0 0px',
                                marginRight: '0.5rem',
                                cursor: 'pointer'
                            }}>
                                Cód.
                            </Box>
                            <Box component="hr"
                                sx={{
                                    color: 'black',
                                    borderRight: '1px solid #ccc',
                                    height: '50px',
                                    position: 'absolute',
                                    left: '50px',
                                }}
                            />
                        </>
                    ),
                }}
            />
            <Autocomplete
                disablePortal
                options={phonecodes}
                fullWidth
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.name} ({option.code})
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        placeholder="Ingresar teléfono"
                        fullWidth
                        {...params}
                    />
                )}
            />
        </>
    );
};

export default PhoneInput
