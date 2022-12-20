import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import ProfileToolbar from '../../components/ProfileToolbar';
import FavouriteCard from './FavouriteCard';
import { apiProvider } from '../../api';
import DeleteFavourite from '../../components/Modals/DeleteFavourite';
import { Typography } from '@mui/material';

const Favourites = () => {
    const [favourites, setFavourites] = React.useState([null]);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState(null);

    const fetchPublications = async () => {
        try {
            const res = await apiProvider.get('api/fav/fav-user')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setFavourites(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const handleOpenDeleteModal = async (data) => {
        setSelectedItem(data);
        setOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setSelectedItem(null);
        setOpenDeleteModal(false)
    }

    const handleDelete = item => {
        setFavourites(favourites.filter(({ id }) => id != item.id))
    }

    React.useEffect(() => { fetchPublications() }, []);

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <ProfileToolbar title='Favoritos' />
                <Box sx={{
                    height: '4vh'
                }}>

                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {favourites.map(item => (
                        <FavouriteCard
                            handleDelete={handleOpenDeleteModal}
                            data={item}
                        />
                    ))}
                    {!!!(favourites.length) && (
                        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                            Aún no has guardado ninguna publicación.
                        </Typography>
                    )}
                </Box>
                <DeleteFavourite
                    open={openDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    item={selectedItem}
                    handleDelete={handleDelete}
                />
            </Box>
        </Slide>
    )
};

export default Favourites
