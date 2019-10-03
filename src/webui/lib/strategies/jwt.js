const validate = async (decoded, request) => {
    const { userService } = request.services();
    
    const user = await userService.find(decoded.sub);
    if (!user) return { valid: false };
    return {
        valid: true,
        credentials: {
            user,
        },
    }; 
};

export default [
    'jwt',
    'jwt',
    {
        key: process.env.JWT_SECRET, 
        validate,
        verifyOptions: {
            algorithms: [ 'HS256' ],
        },
    },
];
