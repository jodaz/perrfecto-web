import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {
    Route,
    Routes,
    useLocation
} from 'react-router-dom'
// Pages
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from './components/Login';
import SignUp from './components/SignUp';
import RecoverPassword from './components/RecoverPassword';
import Intro from './pages/Intro';
import DetectLocation from './components/modals/DetectLocation';

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
                    <Route path="/detect-location" element={<DetectLocation location={location} />} />
                    <Route path="/register" element={<SignUp location={location} />} />
                    <Route path="/recover-password" element={<RecoverPassword location={location} />} />
                </Route>

                <Route path="/introduction" element={<Intro />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
