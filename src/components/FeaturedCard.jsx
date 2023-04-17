import FeedCard from "./FeedCard"
import PawPrints from '../assets/images/pawprints.svg'
import Box from '@mui/material/Box';

const FeaturedCard = ({
    title
}) => {
    return (
        <Box sx={{
            position: 'relative',
            bgcolor: 'background.default',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '2rem',
            margin: '2rem 0',
            width: '180px',
            boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.1);',
            borderRadius: '10px',
            cursor: 'pointer',
            '&:before': {
                content: '""',
                background: `url(${PawPrints})`,
                backgroundSize: 'cover',
                position: 'absolute',
                bottom: 0,
                height: '50%',
                width: '100%',
                zIndex: 0
            }
        }}>
            <Box sx={{ color: theme => theme.palette.primary.main, marginBottom: '2rem' }}>
                {title}
            </Box>
            <FeedCard />
        </Box>
    )
}

export default FeaturedCard
