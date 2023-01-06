import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import ProfileToolbar from '../../components/ProfileToolbar';
import DeleteFavourite from '../../components/Modals/DeleteFavourite';
import Card from '@mui/material/Card';
import PublicationDescription from '../../components/FeedCard/PublicationDescription';
import {
    fetchFavourites,
    useFavourites,
    deleteFavourite
} from '../../context/FavouriteContext';
import { Mail, Phone } from 'lucide-react'
import useEffectOnce from '../../utils/useEffectOnce';

const ShowFavourite = ({
    item
}) => {
    console.log(item)
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
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
                flexDirection: 'column'
            }}>
                <ProfileToolbar title='Favoritos' />
                <Box sx={{
                    borderRadius: '24px 24px 0px 0px'
                }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h5" color="text.secondary" fontWeight={500}>
                            {/* {data.publi.name} */}
                            Maqueta
                        </Typography>
                        <PublicationDescription
                            color='info.main'
                            dotColor='info'
                            age={'2020'}
                            breed={'Caniche'}
                            province='Sevilla'
                            city='España'
                        />
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <Mail size={20} />
                                <Box marginRight='1rem' />
                                jesuodz@gmail.com
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                gutterBottom
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Box>
                                    <Phone size={20} />
                                </Box>
                                <Box marginRight='1rem' />
                                +58 04261843880
                                {/* {user.code_phone}&nbsp;{user.phone} */}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            {/* {data.description} */}
                            Hola, seré directa. me gusta mucho las personas que son divertidas, que no necesitan que una excusa tonta para ligar. Si puedes ser esa persona dale like y conversamos! 😉
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', p: 1 }}>
                        <Box sx={{ p: 1 }}>
                            {/* <ShowVaccines
                                {...data.publi.Owner}
                                dog={{...data.publi}}
                            /> */}
                        </Box>
                        <Box sx={{ p: 1 }}>
                            {/* <ListCertificates
                                {...data.publi.Owner}
                                dog={{...data.publi}}
                            /> */}
                        </Box>
                    </Box>
                </Box>
                {/* <FavouriteSearchBox />
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
                /> */}
            </Box>
        </Slide>
    )
};

export default ShowFavourite
