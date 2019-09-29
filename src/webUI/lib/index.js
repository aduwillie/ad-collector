import Vision from '@hapi/vision';
import Pug from 'pug';

import HomeRoute from './routes/home';
import CatchAllRoute from './routes/catchall';

const RoutesPlugin = {
    name: 'routes',
    version: '1.0.0',
    register: async (server) => {
        //register plugin
        await server.register([ Vision]);
        server.views({
            engines: {
                pug: Pug
            },
            relativeTo: __dirname,
            path: '../public',
        });

        // register routes
        server.route([
            HomeRoute,
            CatchAllRoute,
        ]);
    },
};

export default RoutesPlugin;
