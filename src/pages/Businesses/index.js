import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactComponent as RocketIcon } from '../../assets/icons/Rocket.svg'
import IconButtonWithTitle from '../../components/IconButtonWithTitle';
import SettingsLayout from '../../layouts/SettingsLayout';
import BusinessCard from './BusinessCard';
import ShowBusiness from './ShowBusiness';
import { useAuth } from '../../context/AuthContext';

const Businesses = () => {
    const { state: { user } } = useAuth();
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [showBusiness, setShowBusiness] = React.useState(false)

    const handleOpenShowBusiness = async (data) => {
        setSelectedItem(data);
        setShowBusiness(true);
    }

    const handleCloseShowBusiness = () => {
        setShowBusiness(false)
    }

    if (showBusiness) {
        return (
            <ShowBusiness
                close={handleCloseShowBusiness}
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
                    {user.publication && (
                        <BusinessCard
                            {...user.publication}
                            handleSelect={handleOpenShowBusiness}
                        />
                    )}
                </Stack>
            </Box>
        </SettingsLayout>
    )
};

export default Businesses
