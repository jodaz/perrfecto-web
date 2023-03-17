import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { alpha } from '@mui/material';
import LinkBehavior from '../../components/LinkBehavior';
import ItemWithCheck from '../../components/ItemWithCheck';
import getUserPhoto from '../../utils/getUserPhoto'

const SuscriptionCard = ({ data }) => {
    const loading = data == null;
    console.log(getUserPhoto(data.Banner.img))
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '16px',
            color: '#fff',
            height: '390px',
            justifyContent: 'space-between',
            p: 2,
            maxWidth: '280px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            flexDirection: 'column',
            backgroundColor: 'gray',
            textDecoration: 'none',
            background: `url(${data.Banner && getUserPhoto(data.Banner.img)})`,
        }}>
            <Box sx={{
                size: '16px',
            }}>
                <Typography
                    variant="subtitle1"
                    textAlign='center'
                    fontSize='24px'
                    fontWeight={700}
                    gutterBottom
                >
                    Subscripción <br/> {data.name}
                </Typography>
                {data.Benefits.map(item => (
                    <ItemWithCheck>{item.description}</ItemWithCheck>
                ))}
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box sx={{
                    display: 'flex',
                    color: '#fff'
                }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        fontSize='20px'
                        alignSelf='center'
                        mr='2px'
                    >
                        $
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        fontSize='3rem'
                        mr='3px'
                    >
                        {data.PriceBySubscriptions[0].price}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        fontWeight={500}
                        fontSize='1rem'
                        mt='4px'
                    >
                        / mes
                    </Typography>
                </Box>
                <Button variant="contained" sx={{
                    backgroundColor: theme => theme.palette.secondary.main,
                    color: theme => theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme => `${alpha(theme.palette.secondary.main, 0.9)}`,
                    }
                }} component={LinkBehavior} to='/business/register'>
                    Adquirir subscripción
                </Button>
            </Box>
        </Box>
    )
}

export default SuscriptionCard
