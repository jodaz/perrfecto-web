import Box from '@mui/material/Box'
import Header from './Header';
import Footer from './Footer';

const LandingLayout = ({ children, dark }) => (
    <Box sx={{
        height: '100vh',
        position: 'relative'
    }}>
        <Header dark={dark} />
        {children}
        <Footer />
    </Box>
);

export default LandingLayout;
