import HapiAlive from 'hapi-alive';
import Boom from '@hapi/boom';

const HealthCheckPlugin = {
    name: 'health-check',
    version: '1.0.0',
    register: async (server) => {
        await server.register({
            plugin: HapiAlive,
            options: {
                path: '/health',
                tags: ['health', 'monitor'],
                responses: {
                    healthy: {
                        message: JSON.stringify({
                            app: 1,
                            db: 1,
                        }),
                    },
                    unhealthy: {
                        statusCode: 400,
                    },
                },
                healthCheck: async (server) => {
                    const { isConnected } = server.app.Database;
                    if (!isConnected) throw Boom.badRequest('DB not connected');
                    return true;
                },
            },
        });
    }
};

export default HealthCheckPlugin;
