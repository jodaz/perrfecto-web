import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { apiProvider } from '../../api';
import { useFieldArray } from 'react-hook-form';
import SelectInput from '../../components/Forms/SelectInput';
import { Button, IconButton } from '@mui/material';

const AdVaccines = ({ control }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate()
    const [vaccines, setVaccines] = React.useState([])
    const [indexes, setIndexes] = React.useState([0]);
    const [counter, setCounter] = React.useState(0);

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

    React.useEffect(() => { fetchVaccines(); }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{ p: 2 }}>
                <Typography variant='h6' gutterBottom fontWeight={500} color="primary.main">
                    Vacunas
                </Typography>
                {indexes.map((index) => (
                    <Box key={index}>
                        <SelectInput
                            control={control}
                            name={`vaccines[${index}]name`}
                            options={vaccines}
                            optionLabel='name'
                        />
                        <IconButton
                            onClick={removeVaccine(index)}
                            disabled={indexes.length == 1}
                        >
                            E
                        </IconButton>
                    </Box>
                ))}
                <Button onClick={addVaccine}>
                    Añadir vacuna
                </Button>
            </Box>
        </Box>
    );
}

export default AdVaccines
