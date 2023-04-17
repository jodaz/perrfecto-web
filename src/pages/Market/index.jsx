import * as React from 'react';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FeaturedBusinesses from '../Businesses/FeaturedBusinesses';
import Categories from './Categories';
import useEffectOnce from '../../utils/useEffectOnce';
import { apiProvider } from '../../api';
import MarketFilterDrawer from '../../components/MarketFilterDrawer';
import { SlidersHorizontal } from 'lucide-react';
import BusinessCard from '../Businesses/BusinessCard';
import {
    toggleFilters,
    useBusinesses,
    selectItem,
    resetFilters,
    fetchBusinesses
} from '../../context/BusinessContext';
import SearchBox from '../../components/SearchBox';
import { alpha } from '@mui/material';

const Marketplace = () => {
    const [loadingCategories, setLoadingCategories] = React.useState(false)
    const [categories, setCategories] = React.useState([])
    const { state: {
        isLoaded,
        publications,
        selectedItem
    }, dispatch } = useBusinesses();

    const filterFunction = ({ search }) => {
        if (search) {
            fetchBusinesses(dispatch, { filter: search })
        } else {
            resetFilters(dispatch)
        }
    }

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

    useEffectOnce(() => { fetchCategories() }, [])

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
                <IconButton sx={{
                    backgroundColor: theme => isLoaded ? theme.palette.primary.main : 'unset',
                    color: isLoaded ? '#fff' : 'unset',
                    '&:hover': {
                        backgroundColor: theme => `${alpha(isLoaded
                            ? theme.palette.primary.main
                            : theme.palette.divider, 0.9
                        )}`
                    }
                }}>
                    <SlidersHorizontal onClick={() => toggleFilters(dispatch)}/>
                </IconButton>
            </Box>
            <Box p={2}>
                <SearchBox filter={filterFunction} />
            </Box>
            {(!isLoaded) ?
            (
                <>
                    <Box p={2}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            fontSize='1rem'
                            mb={2}
                            color="text.secondary"
                            textTransform={'uppercase'}
                        >
                            Negocios destacados
                        </Typography>
                        <FeaturedBusinesses />
                    </Box>
                    <Box p={2}>
                        <Categories
                            data={categories}
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
                    {publications.map(item => (
                        <BusinessCard
                            data={item}
                            url='/market'
                        />
                    ))}
                    {!publications.length && (
                        <Box>
                            No hay negocios disponibles
                        </Box>
                    )}
                </Stack>
            )}
            <MarketFilterDrawer />
        </Box>
    )
}

export default Marketplace
