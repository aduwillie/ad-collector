import Vision from '@hapi/vision';
import Pug from 'pug';

import Routes from './routes';
import Strategies from './strategies';

const RoutesPlugin = {
    name: 'routes',
    version: '1.0.0',
    register: async (server) => {
        //register plugin
        await server.register([ Vision ]);
        server.views({
            engines: {
                pug: Pug
            },
            relativeTo: __dirname,
            path: '../public',
        });

        // register strategies
        Strategies.forEach((strategy) => {
            server.auth.strategy(...strategy);
        });
        server.auth.default('jwt');

        // register routes
        server.route([...Routes]);
    },
};

export default RoutesPlugin;
