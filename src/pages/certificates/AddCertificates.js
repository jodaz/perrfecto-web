import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText'
import { Plus } from 'lucide-react';
import FileInput from './FileInput';
import TrashButton from '../../components/Buttons/TrashButton';
import { useFieldArray } from "react-hook-form";

const AddCertificates = ({ control, disabled }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "certificates"
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {fields.map((item, index) => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    borderRadius: 100,
                    padding: '0 10px'
                }} key={item.id} >
                    <Box sx={{ flex: 1, p: 1 }}>
                        <FileInput
                            disabled={disabled}
                            control={control}
                            name={`certificates[${index}]`}
                            defaultValue={item}
                        />
                    </Box>
                    <Box>
                        <TrashButton
                            disabled={disabled}
                            onClick={() => remove(index)}
                        />
                    </Box>
                </Box>
            ))}
            <Box>
                <Button
                    onClick={() => append()}
                    disabled={fields.length == 4}
                    size='small'
                    sx={{ fontSize: '14px' }}
                >
                    <Plus size={18} /> Añadir más
                </Button>
            </Box>
            {(fields.length == 4) && (
                <Box sx={{ p: 2}}>
                    <FormHelperText error>
                        Haz alcanzado el límite de certificados.
                    </FormHelperText>
                </Box>
            )}
        </Box>
    );
}

export default AddCertificates
