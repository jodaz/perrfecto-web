import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

const routes = [
    {
        path: '*',
        view: <NotFound />
    },
    {
        path: '/',
        view: <Landing />
    },
    {
        path: '/home',
        view: <Home />
    }
];

export default routes;
