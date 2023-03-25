import * as React from 'react';
import MuiCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

// Icons
import DiscardIconButton from '../Buttons/DiscardButton';
import LikeButton from '../Buttons/LikeButton';
import getUserPhoto from '../../utils/getUserPhoto';
import PublicationDescription from '../PublicationDescription';
import FavouriteButton from '../Buttons/FavouriteButton';

const Card = ({
    data,
    drag,
    moveLeft,
    moveRight
}) => {
    const { publi } = data;
    const userPhoto = publi.Owner.img_profile.length
        ? getUserPhoto(JSON.parse(publi.Owner.img_profile)[0])
        : '/images/Avatar.svg';
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const photoSrc = getUserPhoto(JSON.parse(publi.dogPhotos)[0])

    return (
        <Box sx={{
            userSelect: 'none',
            display: 'flex',
            height: '500px',
            flexDirection: 'column',
            marginTop: !drag ? '1rem' : 0,
            transition: '0.3s',
            visibility: !drag ? 'hidden' : 'none',
            alignSelf: 'center',
            zIndex: 10
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                zIndex: 1,
                marginBottom: '-1rem',
                // visibility: !drag ? 'hidden' : 'none',
                transition: '0.3s'
            }}>
                <Avatar sx={{
                    width: isSmall ? '50px' : '70px',
                    height: isSmall ? '50px' : '70px',
                    marginRight: '1rem',
                    border: '2px solid #F59E0B'
                }} src={userPhoto} />
                <Typography gutterBottom variant={isSmall ? 'body1' : "h5"} component="div">
                    {publi.Owner.name}
                </Typography>
            </Box>
            <MuiCard sx={{
                height: '56vh',
                width: !isSmall ? '300px' : '300px',
                borderRadius: '20px',
                position: 'relative'
            }}>
                <CardMedia
                    component="img"
                    width='100%'
                    src={photoSrc}
                    sx={{
                        height: '70%'
                    }}
                />
                <CardContent sx={{
                    position: 'relative',
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
                        <LikeButton sliderAction={moveRight} item={data} />
                        <FavouriteButton
                            item={data}
                            handleClick={moveRight}
                        />
                        <DiscardIconButton onClick={moveLeft} />
                    </CardActions>
                    <Box sx={{
                        marginTop: '2rem',
                        textAlign: 'center'
                    }}>
                        <Typography variant="h5" color="text.primary">
                            {publi.name}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '80%',
                            margin: '0 auto'
                        }}>
                            <PublicationDescription
                                color="text.secondary"
                                dotColor="text.secondary"
                                dogAge={data.publi.dogAge}
                                breed={data.publi.breed}
                                province={data.publi.Owner.provice}
                                city={data.publi.Owner.city}
                            />
                        </Box>
                    </Box>
                </CardContent>
            </MuiCard>
        </Box>
    );
}

export default Card
