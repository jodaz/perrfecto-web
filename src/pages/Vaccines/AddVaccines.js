import * as React from 'react';
import Box from '@mui/material/Box';
import { apiProvider } from '../../api';
import SelectInput from '../../components/Forms/SelectInput';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { Plus } from 'lucide-react';
import useEffectOnce from '../../utils/useEffectOnce';
import TrashButton from '../../components/Buttons/TrashButton';
import { useFieldArray } from "react-hook-form";

const VaccinesArrayField = ({ vaccines, control }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "vaccines"
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {fields.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, p: 1 }}>
                        <SelectInput
                            control={control}
                            name={`vaccines[${index}]`}
                            options={vaccines}
                            optionLabel='name'
                        />
                    </Box>
                    <Box>
                        <TrashButton onClick={() => remove(index)} />
                    </Box>
                </Box>
            ))}
            <Box>
                <Button onClick={() => append()} size='small' sx={{ fontSize: '14px' }}>
                    <Plus size={18} /> Añadir más
                </Button>
            </Box>
        </Box>
    );
}

const AddVaccines = ({ control, funcHandler }) => {
    const [vaccines, setVaccines] = React.useState([])

    const fetchVaccines = async () => {
        try {
            const res = await apiProvider.get('api/vaccine/vaccines')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;
                setVaccines(data);

                if (funcHandler) funcHandler();
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    useEffectOnce(() => { fetchVaccines(); }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {!vaccines.length ? (
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    p: 2
                }}>
                    <CircularProgress />
                </Box>
            ) : (
                <VaccinesArrayField
                    control={control}
                    vaccines={vaccines}
                />
            )}
        </Box>
    );
}

export default AddVaccines
