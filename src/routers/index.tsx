import { HomeLayout, HomePage } from '../pages/Home';

type Router = Route[];
type Route = {
    path: string;
    page: React.FC;
    layout?: React.FC;
    props?: any;
};
const publicRoutes: Router = [
    { path: '/', page: HomePage, layout: HomeLayout },
    { path: '/home', page: HomePage, layout: HomeLayout },
];

const privateRoutes: Router = [];

export { publicRoutes, privateRoutes };
