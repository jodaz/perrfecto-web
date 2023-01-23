import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import BusinessCard from '../Businesses/BusinessCard';
import SettingsLayout from '../../layouts/SettingsLayout';
import MarketSearchBox from './MarketSearchBox';
import useEffectOnce from '../../utils/useEffectOnce';
import { apiProvider } from '../../api';
import { useBusinesses, resetItem, selectItem } from '../../context/BusinessContext';

const ShowCategory = () => {
    const { state: { selectedItem }, dispatch } = useBusinesses();
    const [data, setData] = React.useState([])

    const fetchBusinesses = async () => {
        try {
            const res = await apiProvider.get(`/api/business-ann/anns?id_category=${selectedItem.item.id}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setData(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    useEffectOnce(() => { fetchBusinesses() }, [])

    return (
        <SettingsLayout
            title={selectedItem.item.name}
            handleGoBack={() => resetItem(dispatch)}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <Box p={2}>
                    <MarketSearchBox />
                </Box>
                {data.length ? (
                    <Stack
                        p={2}
                        orientation='vertical'
                        spacing={2}
                    >
                        {data.map(item => (
                            <BusinessCard
                                {...item}
                                handleSelect={() => selectItem(dispatch, { item: item, type: 'business' })}
                            />
                        ))}
                    </Stack>
                ) : (
                    <Box p={2}>
                        <Box>No hay negocios registrados</Box>
                    </Box>
                )}
            </Box>
        </SettingsLayout>
    )
}

export default ShowCategory
