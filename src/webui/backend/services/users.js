import Boom from '@hapi/boom';
import JWT from 'jsonwebtoken';
import Bcrypt from 'bcrypt';

import BaseService from './base';
import AppConfig from '../config';

class UserService extends BaseService {
    async find(id) {
        const { User } = this.server.app.Database;
        return User.findById(id);
    }

    async findByEmail(email) {
        const { User } = this.server.app.Database;
        return User.findOne({ email });
    }

    async getSignedToken(id) {
        const user = await this.find(id);
        if (!user) throw Boom.notFound('User does not exist!');
        const token = JWT.sign(
            {
                sub: user.id,
                roles: user.roles.map(r => r.name),
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '30d' }, // 1 month
        );
        return token;
    }

    async hashPassword(password) {
        return Bcrypt.hash(password, AppConfig.saltRounds);
    }

    async comparePasswordByEmail(userEmail, plainPassword) {
        const user = await this.findByEmail(userEmail);
        console.log(user);
        if (!user) throw Boom.notFound('User does not exist!');
        const isMatch = await Bcrypt.compare(plainPassword, user.password);
        console.log(user, isMatch); 
        return { 
            user, 
            isMatch
        };
    }
}

export default UserService;
