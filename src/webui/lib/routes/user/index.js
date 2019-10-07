import Joi from '@hapi/joi';
import Bcrypt from 'bcrypt';
import Uuid from 'uuid';

import AppConfig from '../../../config';

export default [
    {
        method: 'POST',
        path: '/user',
        options: {
            auth: false,
            validate: {
                payload: {
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
                }
            },
            handler: async (request, h) => {
                const { firstName, lastName, otherNames, email, password } = request.payload;
                const { User } = request.server.app.Database;
                const { userService } = request.services();

                const hashedPassword = await Bcrypt.hash(password, AppConfig.saltRounds);
                const user = new User({
                    uuid: Uuid.v4(),
                    firstName,
                    lastName,
                    otherNames,
                    email,
                    password: hashedPassword,
                    roles: [{ name: 'guest' }],
                });
                const savedUser = await user.save();

                const token = await userService.getSignedToken(savedUser.id);
                return h.response({ url: '/dashboard' })
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
