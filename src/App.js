import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import routes from './routes'
import { Route, Routes } from 'react-router-dom'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                {routes.map((route, key) => (
                    <Route
                        key={key}
                        path={route.path}
                        element={route.view}
                    />
                ))}
            </Routes>
        </ThemeProvider>
    );
}

export default App;
