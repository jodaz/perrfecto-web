import * as React from 'react';
import Box from '@mui/material/Box';
import PawPrints from '../../../assets/images/pawprints.svg'
import { apiProvider } from '../../../api';
import Stack from './Stack';
import { CircularProgress, useMediaQuery } from '@mui/material';
import ContactDialog from '../../../components/Modals/ContactDialog';
import DogPublication from '../../../components/FeedCard/DogPublication'
import OwnerPublication from '../../../components/FeedCard/OwnerPublication';
import useEffectOnce from '../../../utils/useEffectOnce';
const PopularMembers = React.lazy(() => import('../../../components/PopularMembers'));

const UsersHome = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const [cards, setCards] = React.useState([])
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [openDogCard, setOpenDogCard] = React.useState(false)
    const [openOwnerCard, setOpenOwnerCard] = React.useState(false)
    const [openContactDialog, setOpenContactDialog] = React.useState(false)

    const fetchPublications = async () => {
        try {
            const res = await apiProvider.get('api/publication/publications')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data: { data } } } = res;

                setCards(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const handleSelect = data => {
        setSelectedCard(data)
        setOpenDogCard(true)
    }

    const handleOpenOwnerCard = () => {
        setOpenOwnerCard(true)
    }

    const handleOpenContactDialog = () => {
        setOpenContactDialog(true)
    }

    const handleCloseCard = () => {
        setOpenContactDialog(false)
        setOpenOwnerCard(false)
        setOpenDogCard(false)
        setSelectedCard(null);
    }

    useEffectOnce(() => { fetchPublications() }, []);

    return (
        <Box
            component="main"
            sx={{
                position: 'relative',
                flexGrow: 1,
                bgcolor: 'background.default',
                heigth: '100%',
                width: isSmall ? '100%' : 'calc(100vw - 350px)',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                '&:before': {
                    content: '""',
                    background: `url(${PawPrints}) center center fixed`,
                    backgroundSize: 'cover',
                    position: 'absolute',
                    bottom: 0,
                    height: '50%',
                    width: '100%',
                    zIndex: 0
                }
            }}
        >
            <React.Suspense>
                <Box width={isSmall ? '300px' : '450px'} marginTop='2rem'>
                    <PopularMembers />
                </Box>
            </React.Suspense>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                margin: '0 auto',
                height: '100%',
                zIndex: 100
            }}>
                {(cards.length) ? (
                    <Stack
                        data={cards}
                        onVote={(item, vote) => null}
                        onClick={(item) => handleSelect(item)}
                    />
                ) : (
                    <Box sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <CircularProgress color="primary" />
                    </Box>
                )}
            </Box>
            {openDogCard && (
                <DogPublication
                    data={selectedCard}
                    handleClose={() => handleCloseCard()}
                    open={openDogCard}
                    handleOpenOwnerCard={handleOpenOwnerCard}
                />
            )}
            {openOwnerCard && (
                <OwnerPublication
                    data={selectedCard}
                    handleClose={() => handleCloseCard()}
                    open={openOwnerCard}
                    handleOpenContactDialog={handleOpenContactDialog}
                />
            )}
            {openContactDialog && (
                <ContactDialog
                    data={selectedCard}
                    handleClose={() => handleCloseCard()}
                    open={openContactDialog}
                />
            )}
        </Box>
    );
}

export default UsersHome;
