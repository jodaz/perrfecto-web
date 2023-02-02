import * as React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import phonecodes from '../../utils/phonecodes'
import { Controller } from 'react-hook-form'
import Popover from '@mui/material/Popover';
import phoneCodes from '../../utils/phonecodes';
import { Search } from 'lucide-react';

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        margin: 0,
        color: 'inherit',
        fontSize: 13,
        width: 300
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

const CodePopover = ({ control, rules, defaultCodePhone }) => {
    const [value, setValue] = React.useState(phoneCodes[66]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    React.useEffect(() => {
        if (defaultCodePhone) {
            const findCode = phoneCodes.find(({ code }) => code == defaultCodePhone);

            setValue(findCode)
        }
    }, [defaultCodePhone])

    return (
        <>
            <Box sx={{
                color: value ? 'rgba(31, 44, 56, 1)' : '#A6A6A6',
                cursor: 'pointer',
                pointerEvents: 'all !important',
                marginRight: '2rem'
            }} onClick={handleClick}>
                {(value) ? `(${value.code})` : <>Cód.</>}
            </Box>
            <Box component="hr"
                sx={{
                    color: 'black',
                    borderRight: '1px solid #ccc',
                    height: '50px',
                    position: 'absolute',
                    left: '70px',
                }}
            />
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onAbort={handleClose}
                handleClose={handleClose}
            >
                <Controller
                    control={control}
                    name='code_phone'
                    rules={rules}
                    defaultValue={value}
                    render={({ field: { ref, onChange, ...fieldRest } }) => (
                        <Autocomplete
                            open={open}
                            options={phonecodes}
                            autoHighlight
                            sx={{ width: 300 }}
                            defaultValue={value}
                            onChange={(_, data) => {
                                if (data) {
                                    setValue(data)
                                    onChange(`${data.code}`)
                                    handleClose();
                                }
                            }}
                            required={true}
                            PopperComponent={StyledAutocompletePopper}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    {option.label} ({option.code}) {option.name}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <StyledInput
                                    required={true}
                                    sx={{
                                        width: '94%'
                                    }}
                                    {...fieldRest}
                                    {...params}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start"><Search /></InputAdornment>
                                        )
                                    }}
                                />
                            )}
                            clearIcon={<></>}
                            popupIcon={<></>}
                            noOptionsText='Sin resultados'
                        />
                    )} />
            </Popover>
        </>
    )
}

export default CodePopover
