import Mongoose from 'mongoose';

import BaseSchema from './base';

const schema = new Mongoose.Schema({
    name: {
        required: [true, 'Project name is required'],
        type: Mongoose.SchemaTypes.String,
        minlength: 2,
        unique: true,
    },
});
schema.add(BaseSchema);

export default schema;
