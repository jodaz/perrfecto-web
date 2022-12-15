import * as React from 'react';
import Box from '@mui/material/Box';
import PawPrints from '../../../assets/images/pawprints.svg'
import { apiProvider } from '../../../api';
import Stack from './Stack';
import { useMediaQuery } from '@mui/material';
const PopularMembers = React.lazy(() => import('../../../components/PopularMembers'));

const UsersHome = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const [cards, setCards] = React.useState([1, 2, 3, 4, 5])

    const fetchPublications = async () => {
        try {
            const res = await apiProvider.get('api/publication/publications', {
                country: 'Venezuela'
            })

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                // setCards(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    React.useEffect(() => { fetchPublications() }, []);

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
                <Box width={isSmall ? '300px' : '450px'} height='20vh' margin='2rem 0'>
                    <PopularMembers />
                </Box>
            </React.Suspense>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                width: 'fit-content',
                margin: '0 auto',
                height: '100%'
            }}>
                <Stack data={cards} onVote={(item, vote) => console.log(item.props, vote)} />
                {/* <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: 'absolute',
                        bottom: isSmall ? 0 : 0,
                        right: isSmall ? '-25px' : '-80px',
                        zIndex: 0
                    }}
                >
                    <Filter2Icon />
                </Fab> */}
            </Box>
        </Box>
    );
}

export default UsersHome;
