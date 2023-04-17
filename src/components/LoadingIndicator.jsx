import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingIndicator = ({ height }) => (
    <Box sx={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        p: 2,
        height: height ? height : 'unset'
    }}>
        <CircularProgress />
    </Box>
)

export default LoadingIndicator
