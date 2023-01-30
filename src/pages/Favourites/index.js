import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import DeleteFavourite from '../../components/Modals/DeleteFavourite';
import {
    fetchFavourites,
    useFavourites,
    deleteFavourite
} from '../../context/FavouriteContext';
import useEffectOnce from '../../utils/useEffectOnce';
import ShowFavourite from './ShowFavourite';
import ListFavourites from './ListFavourites';

const Favourites = () => {
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
    const [showFavourite, setShowFavourite] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState(null);
    const { state: { items }, dispatch }= useFavourites();

    const handleOpenDeleteModal = async (data) => {
        setSelectedItem(data);
        setOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setSelectedItem(null);
        setOpenDeleteModal(false)
    }

    const handleShowFavourite = async (data) => {
        setSelectedItem(data);
        setShowFavourite(true);
    }

    const handleCloseShowFavourite = () => {
        setShowFavourite(false)
    }

    useEffectOnce(() => {
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
                flexDirection: 'column',
                overflowY: 'auto'
            }}>
                {showFavourite ? (
                    <ShowFavourite
                        item={selectedItem}
                        close={handleCloseShowFavourite}
                        deleteFav={handleOpenDeleteModal}
                    />
                ) : (
                    <ListFavourites
                        handleDelete={handleOpenDeleteModal}
                        showFavourite={handleShowFavourite}
                    />
                )}
                <DeleteFavourite
                    open={openDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    item={selectedItem}
                    handleDelete={deleteFavourite}
                    closeFavourite={handleCloseShowFavourite}
                />
            </Box>
        </Slide>
    )
};

export default Favourites
