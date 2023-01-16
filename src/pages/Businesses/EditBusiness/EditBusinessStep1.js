import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextInput from '../../../components/Forms/TextInput';
import {
    DESCRIPTION,
    BUSINESS_NAME
} from '../../../validations';
import { apiProvider } from '../../../api';
import Button from '@mui/material/Button';
import SelectInput from '../../../components/Forms/SelectInput';
import useEffectOnce from '../../../utils/useEffectOnce';
import { useForm } from 'react-hook-form'
import { saveStep, useMultiStepForm } from '../../../context/MultiStepContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const categoryName = 'TIENDAS DE MASCOTAS';

const EditBusinessStep1 = () => {
    const navigate = useNavigate();
    const { state: { user } } = useAuth();
    const { dispatch } = useMultiStepForm();
    const [categories, setCategories] = React.useState([])
    const {
        control,
        handleSubmit,
        formState: {
            isSubmitting
        }
    } = useForm({
        defaultValues: {
            business_name: 'Jodaz PetShop',
            facebook: 'https://facebook.com/jodaz',
            instagram: 'https://instagram.com/jodaz',
            web_site: 'https://web_site.com/jodaz',
            description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores ',
            category: categories.find(({ name }) => name === categoryName), // error aqui
            whatsapp: '+58 04261843880'
        }
    });

    const fetchCategories = async () => {
        try {
            const res = await apiProvider.get('api/category/categories')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setCategories(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const onSubmit = data => {
        saveStep(dispatch, data);
        navigate('/businesses/edit/step-2')
    }

    useEffectOnce(() => { fetchCategories() }, [])

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box p={2}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight={500}
                >
                    PASO 1
                </Typography>
            </Box>
            <Box p={2}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                >
                    Ingresar información sobre el negocio
                </Typography>
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='business_name'
                    label='Nombre del negocio'
                    rules={BUSINESS_NAME.rules}
                    validations={BUSINESS_NAME.messages}
                />
            </Box>
            {!!(categories.length) && (
                <Box p={2}>
                    <SelectInput
                        control={control}
                        name="category"
                        label='Categoría'
                        options={categories}
                        defaultValue={categories.find(({ name }) => name === categoryName)}
                        optionLabel='name'
                    />
                </Box>
            )}
            <Box p={2}>
                <TextInput
                    control={control}
                    name='whatsapp'
                    label='WhatsApp (negocio)'
                />
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='facebook'
                    label='Facebook (negocio)'
                />
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='instagram'
                    label='Instagram (negocio)'
                />
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='web_site'
                    label='Sitio web'
                />
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='description'
                    label='Descripción'
                    rules={DESCRIPTION.rules}
                    validations={DESCRIPTION.messages}
                    multiline
                    maxRows={4}
                    rows={4}
                    sx={{
                        borderRadius: '16px !important',
                    }}
                />
            </Box>
            <Box sx={{ p: 2 }}>
                <Button
                    variant='contained'
                    type='submit'
                >
                    Siguiente
                </Button>
            </Box>
        </Box>
    );
}

export default EditBusinessStep1
