import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

// Icons
import { ReactComponent as PawIcon } from '../../assets/icons/Paw.svg'
import { ReactComponent as StarIcon } from '../../assets/icons/Star.svg'
import { ReactComponent as HuesitoIcon } from '../../assets/icons/Huesito.svg'

const FeedCard = ({
    height,
    width
}) => {
    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                top: '-50px',
                left: '10px',
                zIndex: 1000
            }}>
                <Avatar sx={{
                    width: '70px',
                    height: '70px',
                    marginRight: '1rem',
                    border: '1.6875px solid #F59E0B'
                }} src='/images/samples/sexy-woman.png' />
                <Typography gutterBottom variant="h5" component="div">
                    Carmen Pires
                </Typography>
            </Box>
            <Card sx={{
                height: height,
                maxWidth: width,
                borderRadius: '20px',
                position: 'relative',
                filter: 'drop-shadow(0px 2px 12px rgba(0, 0, 0, 0.24));'
            }}>
                <CardMedia
                    component="img"
                    width='100%'
                    src="/images/samples/sad-pupi.png"
                    alt="green iguana"
                />
                <CardContent sx={{
                    position: 'relative'
                }}>
                    <CardActions sx={{
                        position: 'absolute',
                        top: '-20px',
                        height: '30px',
                        left: '10%',
                        width: '80%',
                        margin: '0 auto',
                        padding: 0,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <IconButton sx={{
                            background: 'url(/images/default/pasto_feo.png)',
                            padding: '0.6rem',
                            boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)'
                        }}>
                            <HuesitoIcon />
                        </IconButton>
                        <IconButton sx={{
                            background: '#fff',
                            boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)'
                        }}>
                            <StarIcon />
                        </IconButton>
                        <Badge
                            badgeContent={15}
                            color="primary"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            sx={{
                                '& .MuiBadge-badge': {
                                    height: '25px !important',
                                    width: '25px !important',
                                    borderRadius: '100px',
                                    color: '#fff',
                                    backgroundColor: theme => theme.palette.primary.main
                                }
                            }}
                        >
                            <IconButton sx={{
                                background: '#fff',
                                boxShadow: '0px 2px 5px rgba(51, 51, 51, 0.15)'
                            }}>
                                <PawIcon />
                            </IconButton>
                        </Badge>
                    </CardActions>
                    <Box sx={{
                        marginTop: '2rem',
                        textAlign: 'center'
                    }}>
                        <Typography variant="h5" color="text.primary">
                            Pupi
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '80%',
                            margin: '0 auto'
                        }}>
                            {/** Raza */}
                            <Typography color="text.secondary">
                                Pug
                            </Typography>
                            <Box>.</Box>
                            {/** Edad */}
                            <Typography color="text.secondary">
                                3 años
                            </Typography>
                            <Box>.</Box>
                            {/** Ubicación */}
                            <Typography color="text.secondary">
                                Sevilla, España
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

FeedCard.defaultProps = {
    height: 500,
    width: 345
}

export default FeedCard
