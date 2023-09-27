import { HomeLayout, HomePage } from '../pages/Home';
import { BuyTicketLayout, BuyTicketPage } from '@/pages/BuyTicket';
import { MoviePage, MovieLayout } from '@/pages/Movie';
type Router = Route[];
type Route = {
    path: string;
    page: React.FC;
    layout?: React.FC;
    props?: any;
};
const publicRoutes: Router = [
    {
        path: '/',
        page: HomePage,
        layout: HomeLayout,
        props: { headerProps: { autoHide: false, fixed: false } },
    },
    {
        path: '/movie',
        page: MoviePage,
        layout: MovieLayout,
        props: { headerProps: { autoHide: true, fixed: true } },
    },
    {
        path: '/buy-ticket',
        page: BuyTicketPage,
        layout: BuyTicketLayout,
        props: { headerProps: { autoHide: false, fixed: false } },
    },
];

const privateRoutes: Router = [];

export { publicRoutes, privateRoutes };
