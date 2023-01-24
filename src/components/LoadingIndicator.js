import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingIndicator = () => (
    <Box sx={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
    }}>
        <CircularProgress />
    </Box>
)

export default LoadingIndicator
