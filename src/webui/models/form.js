import Mongoose from 'mongoose';

import BaseSchema from './base';

const schema = new Mongoose.Schema({
    name: {
        required: [true, 'Form name is required'],
        type: Mongoose.SchemaTypes.String,
        minlength: 2,
        unique: true,
    },
    projectId: {
        required: true,
        type: Mongoose.SchemaTypes.ObjectId,
    }
});
schema.add(BaseSchema);

export default schema;
