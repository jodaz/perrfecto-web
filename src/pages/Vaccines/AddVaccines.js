import * as React from 'react';
import Box from '@mui/material/Box';
import { apiProvider } from '../../api';
import SelectInput from '../../components/Forms/SelectInput';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, IconButton } from '@mui/material';
import { Trash2, Plus } from 'lucide-react';
import useEffectOnce from '../../utils/useEffectOnce';

const VaccinesArrayField = ({ vaccines, control }) => {
    const [indexes, setIndexes] = React.useState([0]);
    const [counter, setCounter] = React.useState(0);

    const addVaccine = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const removeVaccine = index => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };

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
