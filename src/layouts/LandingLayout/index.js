import Box from '@mui/material/Box'
import Header from './Header';

const LandingLayout = ({ children, dark }) => (
    <Box sx={{
        height: '100vh',
        position: 'relative'
    }}>
        <Header dark={dark} />
        {children}
    </Box>
);

export default LandingLayout;
