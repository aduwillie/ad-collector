import Path from 'path';
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Cookie from '@hapi/cookie';
import Pino from 'hapi-pino';
import JWTScheme from 'hapi-auth-jwt2';

import HealthCheck from './plugins/health-check';
import AppModels from './plugins/app-models';
import AppServices from './plugins/app-services';

import Routes from './lib';

const init = async (start) => {
    const server = Hapi.Server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || '0.0.0.0',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });
    // register plugins
    await server.register([
        Inert,
        {
            plugin: Pino,
            options: {
                prettyPrint: process.env.NODE_ENV !== 'production',
            },
        },
        AppModels,
        AppServices,
        Cookie,
        JWTScheme,
        HealthCheck,
        Routes,
    ]);

    await server.initialize();

    if (start) {
        await server.start();
        console.log(`Server running on ${server.info.uri}`);
    }
};

export default init;
