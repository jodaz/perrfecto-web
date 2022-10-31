import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// Samples

export default function FeedCard() {
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
                    Lizard
                </Typography>
            </Box>
            <Card sx={{
                height: 500,
                maxWidth: 344,
                borderRadius: '20px',
                position: 'relative',
                filter: 'drop-shadow(0px 2px 12px rgba(0, 0, 0, 0.24));'
            }}>
                <CardMedia
                    component="img"
                    height="345"
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
                        <Button variant="contained" size="small">S</Button>
                        <Button variant="contained" size="small">S</Button>
                        <Button variant="contained" size="small">S</Button>
                    </CardActions>
                    <Box marginTop='2rem'>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
