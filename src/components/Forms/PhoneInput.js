import * as React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import TextInput from '../Forms/TextInput';
import DialogTitle from '../DialogTitle';
import phonecodes from '../../utils/phonecodes'
import { ReactComponent as SearchIcon } from '../../assets/icons/Search.svg'

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        margin: 0,
        color: 'inherit',
        fontSize: 13,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        scrollbarWidth: 0,
        "&::-webkit-scrollbar": {
            display: 'none'
        },
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
        minHeight: 'auto',
        alignItems: 'flex-start',
        padding: 8,
        borderBottom: `1px solid  ${
            theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
        }`,
        '&[aria-selected="true"]': {
            backgroundColor: 'transparent',
        },
        [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
            {
            backgroundColor: theme.palette.action.hover,
            },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative',
    },
}));

const StyledInput = styled(TextField)(({ theme }) => ({
    padding: 10,
    width: '100%',
    transition: 'none',
    borderBottom: `1px solid ${theme.palette.background.main}`,
    '& .MuiInputBase-root': {
        border: 'none',
        transition: 'none',
        borderBottom: `1px solid #ccc`,
        borderRadius: '0 !important'
    },
    '&.Mui-focused': {
        border: 'none',
        boxShadow: 'none',
        border: 'none !important',
    },
    '& input': {
        borderRadius: 4,
        padding: 8,
        border: 'none !important',
        fontSize: 14,
        '&:focus': {
            border: 'none'
        },
    },
}));

export default function PhoneInput(rest) {
    const [value, setValue] = React.useState('')
    const [open, setOpen] = React.useState(false)

    const handleClick = () => setOpen(true)

    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <TextInput
                {...rest}
                defaultValue={value}
                InputProps={{
                    startAdornment: (
                        <>
                            <Box sx={{
                                color: '#A6A6A6',
                                padding: '0 8px 0 0px',
                                marginRight: '0.5rem',
                                cursor: 'pointer'
                            }} onClick={handleClick}>
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle onClose={handleClose}>
                    Seleccionar otro país
                </DialogTitle>
                <Box width='300'>
                    <Box sx={{ p: 3, width: 280 }}>
                        <Autocomplete
                            open
                            options={phonecodes}
                            PopperComponent={StyledAutocompletePopper}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{
                                    p: 1,
                                    border: 'none',
                                    fontSize: '1rem'
                                }} {...props}>
                                    {option.name} ({option.code})
                                </Box>
                            )}
                            renderInput={({ InputProps, ...params }) => (
                                <StyledInput
                                    placeholder="Buscar"
                                    fullWidth
                                    InputProps={{
                                        ...InputProps,
                                        startAdornment: (
                                            <SearchIcon />
                                        )
                                    }}
                                    {...params}
                                />
                            )}
                            popupIcon={<></>}
                        />
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}
