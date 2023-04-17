import * as React from 'react';
import Box from '@mui/material/Box';
import ProfileToolbar from '../../components/ProfileToolbar';
import FavouriteCard from './FavouriteCard';
import { Typography } from '@mui/material';
import FavouriteSearchBox from './FavouriteSearchBox';
import {
    fetchFavourites,
    useFavourites
} from '../../context/FavouriteContext';
import useEffectOnce from '../../utils/useEffectOnce';

const ListFavourites = ({ showFavourite, handleDelete }) => {
    const { state: { items, is_searching }, dispatch }= useFavourites();

    useEffectOnce(() => {
        if (items.length < 2) {
            fetchFavourites(dispatch)
        }
    }, []);

    return (
        <>
            <ProfileToolbar title='Favoritos' />
            <FavouriteSearchBox />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                {items.map(item => (
                    <FavouriteCard
                        handleDelete={handleDelete}
                        data={item}
                        openFavourite={showFavourite}
                    />
                ))}
                {!!(!items.length && !is_searching) && (
                    <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                        Aún no has guardado ninguna publicación.
                    </Typography>
                )}
                {!!(is_searching && !items.length) && (
                    <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                        Sin resultados.
                    </Typography>
                )}
            </Box>
        </>
    )
};

export default ListFavourites
