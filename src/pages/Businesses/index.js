import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactComponent as RocketIcon } from '../../assets/icons/Rocket.svg'
import IconButtonWithTitle from '../../components/IconButtonWithTitle';
import SettingsLayout from '../../layouts/SettingsLayout';
import BusinessCard from './BusinessCard';
import ShowBusiness from './ShowBusiness';

const showBusiness = {
    name: 'Petshop',
    province: 'España',
    city: 'Sevilla',
    description: 'Hola, somos un Petshop. En nuestro negocio se encuentran diferentes productos para tu mascota. Apostamos siempre por la calidad del servicio que brindamos. Para más información click en el botón',
    images: JSON.stringify([
        '/images/samples/sad-pupi.png',
        '/images/samples/sad-pupi.png',
        '/images/samples/sad-pupi.png',
        '/images/samples/sad-pupi.png'
    ]),
    phone: '+58 0426 1843880',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    website: 'https://facebook.com'
}

const businesses = [
    showBusiness,
    showBusiness,
    showBusiness
]

const Businesses = () => {
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [showBusiness, setShowBusiness] = React.useState(false)

    const handleOpenDeleteModal = async () => {
        setOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setSelectedItem(null);
        setOpenDeleteModal(false)
    }

    const handleOpenShowBusiness = async (data) => {
        setSelectedItem(data);
        setShowBusiness(true);
    }

    const handleCloseShowBusiness = () => {
        setShowBusiness(false)
    }

    console.log(openDeleteModal)

    if (showBusiness) {
        return (
            <ShowBusiness
                close={handleCloseShowBusiness}
                deleteBusiness={handleOpenDeleteModal}
                {...selectedItem}
            />
        )
    }

    return (
        <SettingsLayout title="Negocio">
            <Box sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2
                }}>
                    <Typography
                        variant="subtitle1"
                        color="text.tertiary"
                    >
                        Aquí podrás gestionar y crear tus negocios en TinderDogs empresa.
                    </Typography>
                    <IconButtonWithTitle
                        to='create'
                        icon={<RocketIcon />}
                        title='Crear negocio'
                    />
                </Box>
                <Stack
                    p={2}
                    orientation='vertical'
                    spacing={2}
                >
                    {businesses.map(item => <BusinessCard {...item} handleSelect={handleOpenShowBusiness} />)}
                </Stack>
            </Box>
        </SettingsLayout>
    )
};

export default Businesses
