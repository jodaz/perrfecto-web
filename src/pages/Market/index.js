import * as React from 'react';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FeaturedBusinesses from '../Businesses/FeaturedBusinesses';
import Categories from './Categories';
import MarketSearchBox from './MarketSearchBox';
import ShowCategory from './ShowCategory';
import useEffectOnce from '../../utils/useEffectOnce';
import { apiProvider } from '../../api';
import MarketFilterDrawer from '../../components/MarketFilterDrawer';
import { SlidersHorizontal } from 'lucide-react';
import BusinessCard from '../Businesses/BusinessCard';
import { toggleFilters, useBusinesses } from '../../context/BusinessContext';

const Marketplace = () => {
    const [loadingCategories, setLoadingCategories] = React.useState(false)
    const [categories, setCategories] = React.useState([])
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [showCategory, setShowCategory] = React.useState(false)
    const { state: { isLoaded, publications }, dispatch } = useBusinesses();

    const fetchCategories = async () => {
        setLoadingCategories(true)
        try {
            const res = await apiProvider.get('api/category/categories')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setCategories(data);
                setLoadingCategories(false)
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const handleOpenShowCategory = async (data) => {
        setSelectedItem(data);
        setShowCategory(true);
    }

    const handleCloseShowCategory = () => {
        setShowCategory(false)
    }

    useEffectOnce(() => { fetchCategories() }, [])

    if (showCategory) {
        return (
            <ShowCategory
                close={handleCloseShowCategory}
                {...selectedItem}
            />
        )
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }} id='market-drawer-container'>
            <Box sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Market
                </Typography>
                <IconButton>
                    <SlidersHorizontal onClick={() => toggleFilters(dispatch)}/>
                </IconButton>
            </Box>
            <MarketSearchBox />
            {(!isLoaded) ?
            (
                <>
                    <Box p={2}>
                        <FeaturedBusinesses />
                    </Box>
                    <Box p={2}>
                        <Categories
                            data={categories}
                            handleSelect={handleOpenShowCategory}
                            loading={loadingCategories}
                        />
                    </Box>
                </>
            ) : (
                <Stack
                    p={2}
                    orientation='vertical'
                    spacing={2}
                >
                    {publications.map(item => <BusinessCard {...item} />)}
                </Stack>
            )}
            <MarketFilterDrawer />
        </Box>
    )
}

export default Marketplace
