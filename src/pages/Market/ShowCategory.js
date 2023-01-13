import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import BusinessCard from '../Businesses/BusinessCard';
import SettingsLayout from '../../layouts/SettingsLayout';
import MarketSearchBox from './MarketSearchBox';
import ShowMarket from './ShowMarket';
import useEffectOnce from '../../utils/useEffectOnce';
import { apiProvider } from '../../api';

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

const ShowCategory = ({ close, name, id }) => {
    const [data, setData] = React.useState([])
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [showBusiness, setShowBusiness] = React.useState(false)

    const handleOpenShowBusiness = async (data) => {
        setSelectedItem(data);
        setShowBusiness(true);
    }

    const handleCloseShowBusiness = () => {
        setShowBusiness(false)
    }

    const fetchBusinesses = async () => {
        try {
            const res = await apiProvider.get(`api/business-ann/ads?id_category=${id}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setData(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    useEffectOnce(() => { fetchBusinesses() }, [])

    if (showBusiness) {
        return (
            <ShowMarket
                close={handleCloseShowBusiness}
                {...selectedItem}
            />
        )
    }

    return (
        <SettingsLayout
            title={name}
            handleGoBack={close}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <Box p={2}>
                    <MarketSearchBox />
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
}

export default ShowCategory
