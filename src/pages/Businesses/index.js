import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactComponent as RocketIcon } from '../../assets/icons/Rocket.svg'
import IconButtonWithTitle from '../../components/IconButtonWithTitle';
import SettingsLayout from '../../layouts/SettingsLayout';

const Businesses = () => (
    <SettingsLayout title="Negocio">
        <Box sx={{
            display: 'flex',
            height: '100%'
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
        </Box>
    </SettingsLayout>
);

export default Businesses
