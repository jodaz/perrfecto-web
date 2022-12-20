import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Skeleton from "@mui/material/Skeleton";
import vars from '../../vars'

const FavouriteCard = ({
    rootRef,
    data,
    index
}) => {
    const loading = data == null;
    const anchorRef = React.useRef(null)

    return (
        <Box ref={rootRef} key={index} component='div'>
            <Box sx={{
                height: '4rem',
                cursor: 'pointer',
                display: 'flex',
                padding: '0 0.5rem',
                borderRadius: '6px',
                alignItems: 'center',
                transition: '0.1s',
                margin: '0.6rem 0.4rem'
            }} ref={anchorRef}>
                <Box sx={{ width: '10%', paddingRight: '1rem' }}>
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            variant="circular"
                            width={40}
                            height={40}
                        />
                    ) : (
                        <Box>
                            <Avatar src={`${vars.SOURCE}/${data}`} />
                        </Box>
                    )}
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '75%'
                }}>
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (
                        <Box>
                            name
                        </Box>
                    )}
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="40%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (
                        <Box>
                            Último mensaje
                            12 minutos
                        </Box>
                    )}
                </Box>
                <Box>
                    {/* {(visible) && <ChatMenu chat={data} />} */}
                </Box>
            </Box>
        </Box>
    );
}

export default FavouriteCard
