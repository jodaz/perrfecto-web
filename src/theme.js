import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Ubuntu, sans-serif',
        fontSize: 10,
    },
    palette: {
        primary: {
            main: '#A167C9',
        },
        secondary: {
            main: '#fff',
            light: '#878787',
            dark: '#1e1e1e'
        },
        error: {
            main: '#F24747'
        },
        info: {
            main: '#3B82F6'
        },
        warning: {
            main: '#F59E0B'
        },
        success: {
            main: '#10B981'
        }
    },
});

export default theme;
