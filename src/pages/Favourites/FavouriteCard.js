import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from "@mui/material/Skeleton";
import CircleIcon from '@mui/icons-material/FiberManualRecord';
import Menu from '../../components/Menu';
import { Trash2 } from 'lucide-react';
import getUserPhoto from '../../utils/getUserPhoto';
import LinkBehavior from '../../components/LinkBehavior'
import { alpha } from '@mui/material';

const getYearsSince = year => new Date().getUTCFullYear() - year

const FavouriteCard = ({
    rootRef,
    data,
    index,
    handleDelete
}) => {
    const loading = data == null;
    const publi = !loading ? data.Ad.publi : null;
    const photo = !loading ? JSON.parse(data.Ad.multimedia)[0] : null;
    const anchorRef = React.useRef(null)

    return (
        <Box
            ref={rootRef}
            key={index}
            component={LinkBehavior}
            sx={{
                textDecoration: 'none',
                color: 'unset'
            }}
            to={data && `${data.id}`}
        >
            <Box sx={{
                height: '4rem',
                cursor: 'pointer',
                display: 'flex',
                padding: '0 0.5rem',
                borderRadius: '6px',
                alignItems: 'center',
                transition: '0.1s',
                margin: '0.6rem 0.4rem',
                '&:hover': {
                    backgroundColor: theme => `${alpha(theme.palette.divider, 0.7)}`
                }
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
                            <Avatar src={`${getUserPhoto(photo)}`} />
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
                        <Typography variant="subtitle1" fontWeight={500}>
                            {publi.name}
                        </Typography>
                    )}
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="40%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {(publi.dogAge) && (
                                <Typography color='text.tertiary'>
                                    {getYearsSince(publi.dogAge)} años
                                </Typography>
                            )}
                            {(publi.Owner.province && publi.Owner.city) && (
                                <>
                                    <Box sx={{ fontSize: '6px', padding: '0 6px', color: '#858585' }}>
                                        <CircleIcon fontSize='inherit' />
                                    </Box>
                                    <Typography color='text.tertiary'>
                                        {publi.Owner.province},&nbsp;
                                        {publi.Owner.city}
                                    </Typography>
                                </>
                            )}
                        </Box>
                    )}
                </Box>
                {!!!loading && (
                    <Box>
                        <Menu>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }} onClick={() => handleDelete(data)}>
                                <Trash2 />
                                <Box sx={{ paddingLeft: '0.5rem' }}>
                                    Eliminar favorito
                                </Box>
                            </Box>
                        </Menu>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default FavouriteCard
