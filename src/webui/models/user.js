import Mongoose from 'mongoose';

import BaseSchema from './base';
import RoleSchema from './role';
import CONSTANTS from '../constants';

const schema = new Mongoose.Schema({
    firstName: {
        required: [true, 'Firstname is required'],
        type: Mongoose.SchemaTypes.String,
        minlength: 2,
    },
    lastName: {
        required: [true, 'Lastname is required'],
        type: Mongoose.SchemaTypes.String,
        minlength: 2,
    },
    otherNames: {
        type: Mongoose.SchemaTypes.String,
    },
    email: {
        required: [true, 'Email is required'],
        type: Mongoose.SchemaTypes.String,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => CONSTANTS.EMAIL_REGEX.test(value),
            message: props => `${props.value} is not a valid email`,
        },
    },
    password: {
        required: [true, 'Password is required'],
        type: Mongoose.SchemaTypes.String,
    },
    roles: [RoleSchema],
});
schema.add(BaseSchema);

export default schema;
