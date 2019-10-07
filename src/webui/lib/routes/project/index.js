import Joi from '@hapi/joi';
import Uuid from 'uuid';

export default [
    {
        method: 'GET',
        path: '/project',
        options: {
            handler: async (request) => {
                const { Project } = request.server.app.Database;
                return Project.find({});
            },
        },
    },
    {
        method: 'GET',
        path: '/project/{id}',
        options: {
            validate: {
                params: {
                    id: Joi.string()
                        .description('Id of project')
                        .required(),
                },
            },
            handler: async (request) => {
                const { Project } = request.server.app.Database;
                return Project.findById(request.params.id);
            },
        },
    },
    {
        method: 'POST',
        path: '/project',
        options: {
            validate: {
                payload: {
                    name: Joi.string()
                        .description('Project name')
                        .required(),
                },
            },
            handler: async (request) => {
                const { name } = request.payload;
                const { Project } = request.server.app.Database;
                const project = new Project({
                    uuid: Uuid.v4(),
                    name,
                });
                return project.save();
            },
        },
    },
];
