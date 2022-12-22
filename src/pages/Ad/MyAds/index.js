import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MyAdCard from "./MyAdCard";

const MyAds = ({ dog, publication, ...rest }) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        width: '100%'
    }}>
        <Typography variant="h6" p={1} fontWeight={500}>
            Mi anuncio publicado
        </Typography>
        {publication.map(item => <MyAdCard publication={item} dog={dog} {...rest} />)}
    </Box>
)

export default MyAds
