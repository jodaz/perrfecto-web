import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { alpha } from '@mui/material';
import { CheckCircle2 } from 'lucide-react';

const SuscriptionCard = props => (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        margin: '1rem 0',
        cursor: 'pointer',
        borderRadius: '16px',
        color: '#fff',
        height: '360px',
        justifyContent: 'space-between',
        p: 2,
        width: '280px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        flexDirection: 'column',
        backgroundColor: 'gray',
        textDecoration: 'none',
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(180deg, #A770EF 0%, #CF8BF3 48.96%, #FDB99B 100%);'
    }}>
        <Box sx={{
            size: '16px',
            fontWeight: 700
        }}>
            <Typography
                variant="subtitle1"
                textAlign='center'
                fontSize='24px'
                gutterBottom
            >
                {props.name}
            </Typography>
            {props.description.map(item => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'start',
                    lineHeight: '28px',
                    fontWeight: 400
                }}>
                    <Box mr={1}>
                        <CheckCircle2 size={16} />
                    </Box>
                    <Typography variant="subtitle1" textAlign='left'>
                        {item}
                    </Typography>
                </Box>
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
                    {props.price}
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
            }}>
                Adquirir subscripción
            </Button>
        </Box>
    </Box>
)

export default SuscriptionCard
