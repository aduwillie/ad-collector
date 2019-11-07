import HomeRoutes from './home';
import UserRoutes from './user';
import ProjectRoutes from './project';
import FormRoutes from './form';

export default [
    ...UserRoutes,
    ...ProjectRoutes,
    ...FormRoutes,
    ...HomeRoutes, // should be last in this list
];
