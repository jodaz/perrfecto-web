import React from 'react';
import Slider from '@mui/material/Slider';
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { Controller } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 *
 * @param {*} param0
 * @returns
 */
const SliderInput = ({
    control,
    name,
    defaultValue = 0,
    validations,
    label,
    labelColor,
    max,
    step
}) => (
    <FormControl>
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                <>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 'fit-content',
                        width: '100%'
                    }}>
                        {label && <InputLabel color={labelColor} shrink sx={{ position: 'unset' }}>{label}</InputLabel>}
                        <Box position={'absolute'} right={0}>{`${value} km`}</Box>
                        <Box mb={3} />
                    </Box>
                    <Slider
                        {...restField}
                        value={value}
                        onChange={(_, value) => {
                            onChange(value);
                        }}
                        valueLabelDisplay="auto"
                        max={max}
                        step={step}
                    />
                    {!!(error && validations) && (
                        <FormHelperText error>
                            {validations[error.type]}
                        </FormHelperText>
                    )}
                </>
            )}
        />
    </FormControl>
);

export default SliderInput;
