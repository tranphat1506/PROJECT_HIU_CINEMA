import { HomeLayout, HomePage } from '../pages/Home';

type Router = Route[];
type Route = {
    path: string;
    page: React.FC;
    layout?: React.FC;
    props?: any;
};
const publicRoutes: Router = [
    { path: '/home', page: HomePage, layout: HomeLayout },
];

const privateRoutes: Router = [];

export { publicRoutes, privateRoutes };
