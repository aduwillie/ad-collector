import Mongoose from 'mongoose';

import RoleSchema from './role';
import UserSchema from './user';
import ProjectSchema from './project';
import FormSchema from './form';

import AppConfig from '../config';

if (process.env.NODE_ENV !== 'test') {
    const { connectionString, options } = AppConfig.mongo;
    Mongoose.connect(connectionString, options);
}

export default {
    isConnected: false,
    db: Mongoose.connection,
    Role: Mongoose.model('Role', RoleSchema),
    User: Mongoose.model('User', UserSchema),
    Project: Mongoose.model('Project', ProjectSchema),
    Form: Mongoose.model('Form', FormSchema),
};
