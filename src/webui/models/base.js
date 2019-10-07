import Mongoose from 'mongoose';
import Uuid from 'uuid';

export default new Mongoose.Schema({
    uuid: {
        required: true,
        type: Mongoose.SchemaTypes.String,
        default: () => Uuid.v4(),
    },
    createdAt: {
        required: true,
        type: Mongoose.SchemaTypes.Number,
        default: () => +new Date(),
    },
    createdBy: {
        required: true,
        type: Mongoose.SchemaTypes.String,
    },
    lastModifiedAt: {
        required: true,
        type: Mongoose.SchemaTypes.Number,
        default: () => +new Date(),
    },
    lastModifiedBy: {
        required: true,
        type: Mongoose.SchemaTypes.String,
    },
});
