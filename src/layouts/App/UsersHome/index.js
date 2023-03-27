import * as React from 'react';
import Box from '@mui/material/Box';
import PawPrints from '../../../assets/images/pawprints.svg'
import { useMediaQuery } from '@mui/material';
import useEffectOnce from '../../../utils/useEffectOnce';
import { usePublications, fetchPublications } from '../../../context/PublicationContext';
import InviteUserAlert from '../../../components/InviteUserAlert';
import { socket, handleDisconnect, listenConnection, handleConnect } from '../../../utils/socket';
import { useAuth } from '../../../context/AuthContext';
import { useChat, updateConnectedStatus } from '../../../context/ChatContext';
import LogoutButton from '../../../components/Buttons/LogOutButton';
import Tabs from '../../../components/Tabs';
import Feed from './Feed';
import Featured from './Featured';
import Ranking from './Ranking';
import MatchAlert from '../../../components/Modals/MatchAlert';
// Publications
const PopularMembers = React.lazy(() => import('../../../components/PopularMembers'));
const ContactDialog = React.lazy(() => import('../../../components/Modals/ContactDialog'));
const DogPublication = React.lazy(() => import('../../../components/Publications/DogPublication'));
const OwnerPublication = React.lazy(() => import('../../../components/Publications/OwnerPublication'));

const UsersHome = () => {
    const { state: { isConnected }, dispatch: chatDispatch } = useChat()
    const { state: { isAuth, user } } = useAuth()
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('md'));
    const { state: { publications, isLoaded, isLoading }, dispatch } = usePublications();
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [openDogCard, setOpenDogCard] = React.useState(false)
    const [openMatchModal, setOpenMatchModal] = React.useState(false)
    const [openOwnerCard, setOpenOwnerCard] = React.useState(false)
    const [openContactDialog, setOpenContactDialog] = React.useState(false)

    const handleSelect = data => {
        setSelectedCard(data)
        setOpenDogCard(true)
    }

    const toggleOpenMatchModal = () => setOpenMatchModal(!openMatchModal);

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

            <Tabs>
                <Feed
                    isLoading={isLoading}
                    publications={publications}
                    handleSelect={handleSelect}
                    isSmall={isSmall}
                    isLoaded={isLoaded}
                />
                <Featured handleSelect={handleSelect} />
                <Ranking handleSelect={handleSelect} />
            </Tabs>

            <React.Suspense>
                <DogPublication
                    data={selectedCard}
                    handleClose={() => handleCloseCard()}
                    open={openDogCard}
                    handleOpenOwnerCard={handleOpenOwnerCard}
                />
            </React.Suspense>

            <React.Suspense>
                <OwnerPublication
                    data={selectedCard}
                    handleClose={() => handleCloseCard()}
                    open={openOwnerCard}
                    handleOpenContactDialog={handleOpenContactDialog}
                />
            </React.Suspense>

            <React.Suspense>
                <ContactDialog
                    data={selectedCard}
                    handleClose={() => handleCloseCard()}
                    open={openContactDialog}
                />
            </React.Suspense>
            <MatchAlert
                open={openMatchModal}
                handleClose={toggleOpenMatchModal}
            />
        </Box>
    );
}

export default UsersHome;
