import Joi from '@hapi/joi';
import Boom from '@hapi/boom';
import Uuid from 'uuid';

export const generateNewProjectAttrs = async (request) => {
    const { user } = request.pre;
    const userUuid = Uuid.v4();

    return Promise.resolve({ 
        uuid: userUuid,
        name: request.payload.name,
        users: [{
            id: user.id,
            uuid: user.uuid,
            name: `${user.firstName} ${user.lastName}`,
            role: 'admin',
        }],
        createdBy: userUuid,
        lastModifiedBy: userUuid,
    });
};

export const getAuthUserDetails = async (request) => {
    const { user } = request.auth.credentials;
    if (!user) throw Boom.forbidden();
    return user;
};

export default [
    {
        method: 'GET',
        path: '/api/v1/projects',
        options: {
            pre: [{ assign: 'user', method: getAuthUserDetails }],
            handler: async (request) => {
                const { Project } = request.server.app.Database;
                return Project.find({ 'users.uuid': request.pre.user.uuid });
            },
        },
    },
    {
        method: 'GET',
        path: '/api/v1/projects/{projectUuid}',
        options: {
            validate: {
                params: Joi.object({
                    projectUuid: Joi.string()
                        .description('Id of project')
                        .required(),
                }),
            },
            pre: [{ assign: 'user', method: getAuthUserDetails }],
            handler: async (request) => {
                const { projectUuid } = request.params;
                const { Project } = request.server.app.Database;
                const result = await Project.findOne({ 'users.uuid': request.pre.user.uuid, uuid: projectUuid });
                if (!result) return Boom.badRequest();
                return result;
            },
        },
    },
    {
        method: 'POST',
        path: '/api/v1/projects',
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string()
                        .description('Project name')
                        .required(),
                }),
            },
            pre: [
                { assign: 'user', method: getAuthUserDetails },
                { assign: 'newProjectAttrs', method: generateNewProjectAttrs }
            ],
            handler: async (request) => {
                const { Project } = request.server.app.Database;

                const project = new Project(request.pre.newProjectAttrs);
                return project.save();
            },
        },
    },
];
