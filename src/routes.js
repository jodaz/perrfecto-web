import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";

const routes = [
    {
        path: '*',
        view: <NotFound />
    },
    {
        path: '/',
        view: <Landing />
    }
];

export default routes;
