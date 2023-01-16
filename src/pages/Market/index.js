import * as React from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FeaturedBusinesses from '../Businesses/FeaturedBusinesses';
import Categories from './Categories';
import MarketSearchBox from './MarketSearchBox';
import ShowCategory from './ShowCategory';
import useEffectOnce from '../../utils/useEffectOnce';
import { apiProvider } from '../../api';

const Marketplace = () => {
    const [loadingCategories, setLoadingCategories] = React.useState(false)
    const [categories, setCategories] = React.useState([])
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [showBusiness, setShowCategory] = React.useState(false)

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

    if (showBusiness) {
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
        }}>
            <Box p={2}>
                <Typography
                    variant="subtitle"
                    fontWeight={700}
                    mb={2}
                    fontSize='1.5rem'
                >
                    Market
                </Typography>
            </Box>
            <MarketSearchBox />
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
        </Box>
    )
}

export default Marketplace
