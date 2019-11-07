import Services from '../services';

const renameService = serviceName => 
    `${serviceName[0].toLowerCase()}${serviceName.slice(1)}`;

const AppServicesPlugin = {
    name: 'app-servcies',
    version: '1.0.0',
    register: async (server, options) => {
        const serviceMap = {};

        Services.forEach(Serivce => {
            serviceMap[renameService(Serivce.name)] = new Serivce(server, options);
        });

        server.decorate('server', 'services', () => serviceMap);
        server.decorate('request', 'services', () => serviceMap);
    },
};

export default AppServicesPlugin;
