import Models from '../models';
import AppConfig from '../config';
import Constants from '../constants';

const AppModelPlugin = {
    name: 'app-model',
    version: '1.0.0',
    register: async (server) => {
        if (AppConfig.useMongo) {
            const {
                MONGO_LOG,
                MONGO_ERROR,
            } = Constants.LOGS;

            Models.db.on('error', (err) => {
                server.log([MONGO_ERROR], err);
                throw err;
            });
            Models.db.once('open', () => {
                Models.isConnected = true;
                server.log([MONGO_LOG], 'Mongo DB is connected');
            });
            server.app.Database = Models;
        }
        else server.app.Database = {};
    },
};

export default AppModelPlugin;
