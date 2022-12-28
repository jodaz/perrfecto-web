import * as React from 'react';
import Box from '@mui/material/Box';
import { apiProvider } from '../../api';
import SelectInput from '../../components/Forms/SelectInput';
import { Button, IconButton } from '@mui/material';
import { Trash2, Plus } from 'lucide-react';
import useEffectOnce from '../../utils/useEffectOnce';

const AddVaccines = ({ control }) => {
    const [vaccines, setVaccines] = React.useState([])
    const [indexes, setIndexes] = React.useState([1, 2]);
    const [counter, setCounter] = React.useState(2);

    const fetchVaccines = async () => {
        try {
            const res = await apiProvider.get('api/vaccine/vaccines')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;
                setVaccines(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const addVaccine = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const removeVaccine = index => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };

    useEffectOnce(() => { fetchVaccines(); }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {indexes.map((index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, p: 1 }}>
                        <SelectInput
                            control={control}
                            name={`vaccines[${index}]`}
                            options={vaccines}
                            defaultValue={`vaccines[${index}]`}
                            optionLabel='name'
                        />
                    </Box>
                    <Box>
                        <IconButton
                            onClick={removeVaccine(index)}
                            disabled={indexes.length == 1}
                            sx={{
                                bgcolor: 'red'
                            }}
                        >
                            <Trash2 color="black" />
                        </IconButton>
                    </Box>
                </Box>
            ))}
            <Box>
                <Button onClick={addVaccine} size='small' sx={{ fontSize: '14px' }}>
                    <Plus size={18} /> Añadir más
                </Button>
            </Box>
        </Box>
    );
}

export default AddVaccines
