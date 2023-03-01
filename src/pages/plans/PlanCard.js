import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import getUserPhoto from '../../utils/getUserPhoto';

const PlanCard = ({
    Banner,
    name,
    number_photos,
    number_videos,
    price
 }) => (
    <Box sx={{
        display: 'flex',
        alignItems: 'start',
        margin: '1rem 0',
        cursor: 'pointer',
        borderRadius: '16px',
        color: '#fff',
        width: '100%',
        p: 1,
        height: 'fit-content',
        background: `url(${Banner && getUserPhoto(Banner.img)})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        flexDirection: 'column',
        backgroundColor: 'gray'
    }}>
        <Box sx={{
            display: 'flex',
            alignSelf: 'end',
            color: '#FFD900'
        }}>
            <Typography
                variant="subtitle1"
                fontWeight={700}
                fontSize='16px'
                alignSelf='center'
                color="#fff"
                mr='2px'
            >
                €
            </Typography>
            <Typography
                variant="subtitle1"
                fontWeight={700}
                fontSize='24px'
                mr='3px'
            >
                {price}
            </Typography>
            <Typography
                variant="subtitle1"
                fontWeight={500}
                fontSize='14px'
                mt='4px'
            >
                / mes
            </Typography>
        </Box>
        <Typography
            variant="subtitle1"
            fontWeight={700}
            fontSize='24px'
        >
            Plan {name}
        </Typography>
        <Box sx={{
            display: 'flex',
            width: '100%'
        }}>
            <Typography
                variant="subtitle1"
                fontWeight={500}
                mr={'10px'}
            >
                +{number_photos} fotos
            </Typography>
            <Typography
                variant="subtitle1"
                fontWeight={500}
            >
                +{number_videos} videos
            </Typography>
        </Box>
    </Box>
)

export default PlanCard
