import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import ProfileToolbar from '../../components/ProfileToolbar';
import FavouriteCard from './FavouriteCard';
import DeleteFavourite from '../../components/Modals/DeleteFavourite';
import { Typography } from '@mui/material';
import FavouriteSearchBox from './FavouriteSearchBox';
import {
    fetchFavourites,
    useFavourites,
    deleteFavourite
} from '../../context/FavouriteContext';

const Favourites = () => {
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState(null);
    const { state: { items, is_searching }, dispatch }= useFavourites();

    const handleOpenDeleteModal = async (data) => {
        setSelectedItem(data);
        setOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setSelectedItem(null);
        setOpenDeleteModal(false)
    }

    React.useEffect(() => {
        if (items.length < 2) {
            fetchFavourites(dispatch)
        }
    }, []);

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <ProfileToolbar title='Favoritos' />
                <FavouriteSearchBox />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {items.map(item => (
                        <FavouriteCard
                            handleDelete={handleOpenDeleteModal}
                            data={item}
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
                <DeleteFavourite
                    open={openDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    item={selectedItem}
                    handleDelete={deleteFavourite}
                />
            </Box>
        </Slide>
    )
};

export default Favourites
