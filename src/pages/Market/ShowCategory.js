import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import BusinessCard from '../Businesses/BusinessCard';
import SettingsLayout from '../../layouts/SettingsLayout';
import useEffectOnce from '../../utils/useEffectOnce';
import {
    useBusinesses,
    resetItem,
    selectItem,
    fetchByCategory,
    resetFilters
} from '../../context/BusinessContext';
import SearchBox from '../../components/SearchBox';

const ShowCategory = () => {
    const { state: {
        publications,
        selectedItem
    }, dispatch } = useBusinesses();

    const filterFunction = ({ search }) => {
        if (search) {
            fetchByCategory(dispatch, {
                filter: search,
                category_id: selectedItem.item.id
            })
        } else {
            resetFilters(dispatch)
        }
    }

    useEffectOnce(() => { fetchByCategory(dispatch, {
        category_id: selectedItem.item.id
    }) }, [])

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
                    <SearchBox filter={filterFunction} />
                </Box>
                {publications.length ? (
                    <Stack
                        p={2}
                        orientation='vertical'
                        spacing={2}
                    >
                        {publications.map(item => (
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
