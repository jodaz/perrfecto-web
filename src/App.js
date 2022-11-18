import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {
    Route,
    Routes,
    useLocation
} from 'react-router-dom'
// Layouts
import AppLayout from './layouts/App';
// Pages
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from './components/Login';
import SignUp from './components/SignUp';
import RecoverPassword from './components/RecoverPassword';
import Intro from './pages/Intro';
import DetectLocation from './components/Modals/DetectLocation';
import Market from './pages/Market';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import NewPassword from './components/Modals/NewPassword';
import AskCode from './components/Modals/AskCode';
import Notifications from './pages/Notifications'
import CallToProfile from './components/CallToProfile';

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
                    element={
                        <AppLayout>
                            <Home />
                        </AppLayout>
                    }
                />
                <Route
                    path='/market'
                    element={
                        <AppLayout>
                            <Market />
                        </AppLayout>
                    }
                />
                <Route
                    path='/chat'
                    element={
                        <AppLayout>
                            <Chat />
                        </AppLayout>
                    }
                />
                <Route
                    path='/blog'
                    element={
                        <AppLayout>
                            <Blog />
                        </AppLayout>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <AppLayout>
                            <Profile />
                        </AppLayout>
                    }
                />
                <Route
                    path='/notifications'
                    element={
                        <AppLayout>
                            <Notifications />
                        </AppLayout>
                    }
                />
                <Route path="/" element={<Landing />}>
                    <Route path="/login" element={<Login location={location} />} />
                    <Route path="/detect-location" element={<DetectLocation location={location} />} />
                    <Route path="/register" element={<SignUp location={location} />} />
                    <Route path="/register/call-profile" element={<CallToProfile location={location} />} />
                    <Route path="/recover-password" element={<RecoverPassword location={location} />} />
                    <Route path="/recover-password/new" element={<NewPassword location={location} />} />
                    <Route path="/recover-password/code" element={<AskCode location={location} />} />
                </Route>

                <Route path="/introduction" element={<Intro />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
