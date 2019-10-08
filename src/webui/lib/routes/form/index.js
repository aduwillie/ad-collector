import Joi from '@hapi/joi';
import Uuid from 'uuid';

export default [
    {
        method: 'GET',
        path: '/form',
        options: {
            handler: async (request) => {
                const { Form } = request.server.app.Database;
                return Form.find({});
            },
        },
    },
    {
        method: 'GET',
        path: '/form/{formId}',
        options: {
            validate: {
                params: Joi.object({
                    formId: Joi.string()
                        .description('Id of form')
                        .required(),
                }),
            },
            handler: async (request) => {
                const { Form } = request.server.app.Database;
                return Form.findById(request.params.id);
            },
        },
    },
    {
        method: 'POST',
        path: '/form',
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string()
                        .description('Project name')
                        .required(),
                }),
            },
            handler: async (request) => {
                const { name } = request.payload;
                const { Form } = request.server.app.Database;
                const form = new Form({
                    uuid: Uuid.v4(),
                    name,
                });
                return form.save();
            },
        },
    },
];
