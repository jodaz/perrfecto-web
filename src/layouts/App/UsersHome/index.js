import * as React from 'react';
import Box from '@mui/material/Box';
import PawPrints from '../../../assets/images/pawprints.svg'
import Stack from './Stack';
import { CircularProgress, useMediaQuery } from '@mui/material';
import ContactDialog from '../../../components/Modals/ContactDialog';
import DogPublication from '../../../components/FeedCard/DogPublication'
import OwnerPublication from '../../../components/FeedCard/OwnerPublication';
import useEffectOnce from '../../../utils/useEffectOnce';
import { usePublications, fetchPublications } from '../../../context/PublicationContext';
import FilterButton from '../../../components/Buttons/FilterButton';
import InviteUserAlert from '../../../components/InviteUserAlert';
import { socket, handleDisconnect, listenConnection, handleConnect } from '../../../utils/socket';
import { useAuth } from '../../../context/AuthContext';
import { useChat, updateConnectedStatus } from '../../../context/ChatContext';
import LogoutButton from '../../../components/Buttons/LogOutButton';

const PopularMembers = React.lazy(() => import('../../../components/PopularMembers'));

const UsersHome = () => {
    const { state: { isConnected }, dispatch: chatDispatch } = useChat()
    const { state: { isAuth, user } } = useAuth()
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('md'));
    const { state: { publications, isLoaded, isLoading }, dispatch } = usePublications();
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [openDogCard, setOpenDogCard] = React.useState(false)
    const [openOwnerCard, setOpenOwnerCard] = React.useState(false)
    const [openContactDialog, setOpenContactDialog] = React.useState(false)

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

    useEffectOnce(() => { fetchPublications(dispatch) }, []);

    React.useEffect(() => {
        if (isAuth) {
            if (isConnected) {
                listenConnection(data => updateConnectedStatus(chatDispatch, data))
                handleDisconnect()
            } else {
                handleConnect(user, data => updateConnectedStatus(chatDispatch, data))
            }
        }

        return () => {
            socket.off('disconnect')
            socket.off('listaPersona')
        }
    }, [socket, isAuth, isConnected])

    return (
        <Box
            component="main"
            sx={{
                position: 'relative',
                flexGrow: 1,
                bgcolor: 'background.default',
                height: '100% !important',
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
                    height: '100%',
                    width: '100%',
                    zIndex: 0
                }
            }}
        >
            {isLarge && <LogoutButton />}
            <React.Suspense>
                <Box width={isSmall ? '300px' : '450px'} marginTop='2rem'>
                    <PopularMembers />
                </Box>
            </React.Suspense>
            <InviteUserAlert />
            <Box sx={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                width: isSmall ? '100%' : '50%',
                margin: '0 auto',
                height: '100%',
                zIndex: 100
            }}>
                {(!isLoading) ? (
                    <Stack
                        data={publications}
                        isLoaded={isLoaded}
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
                <FilterButton />
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
