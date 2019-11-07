import Mongoose from 'mongoose';

import BaseSchema from './base';

const schema = new Mongoose.Schema({
    name: {
        required: [true, 'Project name is required'],
        type: Mongoose.SchemaTypes.String,
        minlength: 2,
    },
    users: [
        {
            name: {
                required: true,
                type: Mongoose.SchemaTypes.String,
                minlength: 2,
            },
            role: {
                required: true,
                type: Mongoose.SchemaTypes.String,
                minlength: 2,
            },
            uuid: {
                required: true,
                type: Mongoose.SchemaTypes.String,
            }
        },
    ],
});
schema.add(BaseSchema);

export default schema;
