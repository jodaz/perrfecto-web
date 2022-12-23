import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MyAdCard from "./MyAdCard";
import LinkBehavior from "../../../components/LinkBehavior";

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
        {publication.map(item => (
            <Box
                sx={{
                    textDecoration: 'none !important'
                }}
                component={LinkBehavior}
                to={`ads/${item.id}`}
                state={{
                    dog: dog,
                    publication: item,
                    ...rest
                }}
            >
                <MyAdCard
                    publication={item}
                    dog={dog}
                    {...rest}
                />
            </Box>
        ))}
    </Box>
)

export default MyAds
