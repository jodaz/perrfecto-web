import * as React from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FeaturedBusinesses from '../Businesses/FeaturedBusinesses';
import Categories from './Categories';
import MarketSearchBox from './MarketSearchBox';
import ShowCategory from './ShowCategory';

const Marketplace = () => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [showBusiness, setShowCategory] = React.useState(false)

    const handleOpenShowCategory = async (data) => {
        setSelectedItem(data);
        setShowCategory(true);
    }

    const handleCloseShowCategory = () => {
        setShowCategory(false)
    }

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
                <Categories handleSelect={handleOpenShowCategory} />
            </Box>
        </Box>
    )
}

export default Marketplace
