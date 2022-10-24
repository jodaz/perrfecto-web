import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
// Screens
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Route, Routes, useLocation } from 'react-router-dom'

function App() {
    let location = useLocation();

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route
                    path='*'
                    element=<NotFound />
                />
                <Route
                    path='/home'
                    element=<Home />
                />
                <Route path="/" element={<Landing />}>
                    <Route path="/login" element={<Login location={location} />} />
                    <Route path="/register" element={<SignUp location={location} />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
