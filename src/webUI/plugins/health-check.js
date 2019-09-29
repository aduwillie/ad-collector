import HapiAlive from 'hapi-alive';

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
                        message: 'System is healthy!',
                    },
                    unhealthy: {
                        statusCode: 400,
                    },
                },
                healthCheck: async () => Promise.resolve(true), // recieves server
            },
        });
    }
};

export default HealthCheckPlugin;
