import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText'
import { Plus } from 'lucide-react';
import FileInput from './FileInput';
import TrashButton from '../../components/Buttons/TrashButton';
import { useFieldArray } from "react-hook-form";

const AddCertificates = ({ control }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "certificates"
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {fields.map((item, index) => {
                console.log(item)
                return (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ flex: 1, p: 1 }}>
                            <FileInput control={control} name={`certificates[${index}]`} defaultValue={item} />
                        </Box>
                        <Box>
                            <TrashButton onClick={() => remove(index)} />
                        </Box>
                    </Box>
                )
            })}
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
