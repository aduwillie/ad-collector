import Schmervice from 'schmervice';
import Boom from '@hapi/boom';
import JWT from 'jsonwebtoken';
import Bcrypt from 'bcrypt';

import AppConfig from '../../config';

class UserService extends Schmervice.Service {
    async find(id) {
        const { User } = this.server.app.Database;
        return User.findById(id);
    }

    async getSignedToken(id) {
        const user = await this.find(id);
        if (!user) throw Boom.notFound();
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

    async hasPassword(password) {
        return Bcrypt.hash(password, AppConfig.saltRounds);
    }
}

export default UserService;
