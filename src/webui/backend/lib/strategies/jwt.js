import CONSTANTS from '../../constants';

const validate = async (decoded, request) => {
    const { userService } = request.services();
    const user = await userService.find(decoded.sub);
    if (!user) return { isValid: false };
    return {
        isValid: true,
        credentials: {
            user,
        },
    }; 
};

export default [
    'jwt',
    'jwt',
    {
        key: process.env.JWT_SECRET || CONSTANTS.DEFAULT_SECRET, 
        validate,
        verifyOptions: {
            algorithms: [ 'HS256' ],
        },
    },
];
