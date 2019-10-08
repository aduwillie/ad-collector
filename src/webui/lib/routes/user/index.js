import Joi from '@hapi/joi';
import Boom from '@hapi/boom';
import Uuid from 'uuid';

export const generateNewUserAttrs = async (request) => {
    const { firstName, lastName, otherNames, email, role } = request.payload;
    const userUuid = Uuid.v4();
    return Promise.resolve({ 
        uuid: userUuid,
        firstName, 
        lastName, 
        otherNames, 
        email, 
        roles: [{ name: role }],
        createdBy: userUuid,
        lastModifiedBy: userUuid,
    });
};

export const hashUserPassword = async (request) => {
    const { userService } = request.services();
    const { password } = request.payload;
    return userService.hashPassword(password);
};

export const generateNewUserModel = (request) => Object.assign(
    {},
    request.pre.userAttrs, 
    { password: request.pre.userPass },
);

export const userEmailAlreadyExists = async (request, h) => {
    const { email } = request.payload;
    const { userService } = request.services();
    const foundUser = await userService.findByEmail(email);
    if (foundUser) throw Boom.badRequest('Email already exists.');
    return h.continue;
};

export const getAuthUserDetails = async (request) => {
    const { user } = request.auth.credentials;
    if (!user) throw Boom.forbidden();
    return user;
};

export default [
    {
        method: 'POST',
        path: '/users/register',
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    firstName: Joi.string()
                        .description('First name of user')
                        .required(),
                    lastName: Joi.string()
                        .description('Last name of user')
                        .required(),
                    otherNames: Joi.string()
                        .description('Other names of user')
                        .optional(),
                    email: Joi.string().email()
                        .description('Email of user')
                        .required(),
                    password: Joi.string()
                        .description('Password for user account')
                        .required(),
                    role: Joi.string()
                        .description('Role of user')
                        .default('admin')
                        .allow('admin', 'collector', 'guest'),                        
                }),
            },
            pre: [
                [
                    { assign: 'userAttrs', method: generateNewUserAttrs },
                    { assign: 'userPass', method: hashUserPassword },
                    { method: userEmailAlreadyExists },
                ],
                { assign: 'newUserAttrs', method: generateNewUserModel }
            ],
            handler: async (request, h) => {
                const { newUserAttrs } = request.pre;
                const { User } = request.server.app.Database;
                const { userService } = request.services();
                
                const user = new User(newUserAttrs);
                const savedUser = await user.save();

                const token = await userService.getSignedToken(savedUser.id);
                return h.response({ redirectUrl: '/dashboard', token })
                    .type('application/json')
                    .header('Authorization', token)
                    .state('token', token, {
                        ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
                        encoding: 'none',    // we already used JWT to encode
                        isSecure: true,      // warm & fuzzy feelings
                        isHttpOnly: true,    // prevent client alteration
                        clearInvalid: false, // remove invalid cookies
                        strictHeader: true   // don't allow violations of RFC 6265
                    });
            },
        },
    },
    {
        method: 'POST',
        path: '/users/login',
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().email()
                        .description('Email of user')
                        .required(),
                    password: Joi.string()
                        .description('Password for user account')
                        .required(),                     
                }),
            },
            handler: async (request, h) => {
                const { email, password} = request.payload;
                const { userService } = request.services();
                const { user, isMatch } = await userService.comparePasswordByEmail(email, password);
                if (!isMatch) return Boom.badRequest('Invalid email or password!');

                const token = await userService.getSignedToken(user.id);
                return h.response({ redirectUrl: '/dashboard', token })
                    .type('application/json')
                    .header('Authorization', token)
                    .state('token', token, {
                        ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
                        encoding: 'none',    // we already used JWT to encode
                        isSecure: true,      // warm & fuzzy feelings
                        isHttpOnly: true,    // prevent client alteration
                        clearInvalid: false, // remove invalid cookies
                        strictHeader: true   // don't allow violations of RFC 6265
                    });
            },
        },
    },
];
