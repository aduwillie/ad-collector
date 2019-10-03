import Schmervice from 'schmervice';
import Boom from '@hapi/boom';
import JWT from 'jsonwebtoken';

class UserService extends Schmervice.Service {
    async find(id) {
        return Promise.resolve({
            id,
            name: 'john',
            password: 'password',
            role: 'guest',
        });
    }

    async getSignedToken(id) {
        const user = this.find(id);
        if (!user) throw Boom.notFound();
        const token = JWT.sign(
            {
                sub: user.id,
                role: user.role,
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        return Promise.resolve(token);
    }
}

export default UserService;
