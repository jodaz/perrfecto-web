import Box from '@mui/material/Box'
import Header from './Header';

const LandingLayout = ({ children }) => (
    <Box sx={{
        height: '100vh'
    }}>
        <Header />
        {children}
    </Box>
);

export default LandingLayout;
