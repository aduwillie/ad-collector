const validateFunc = async (request, session) => {
    const { userService } = request.services();
    
    const user = await userService.find(session.id);
    if (!user) return { valid: false };
    return {
        valid: true,
        credentials: {
            user,
        },
    }; 
};

export default [
    'session',
    'cookie',
    {
        cookie: {
            name: 'sid',
            password: process.env.COOKIE_SECRET,
            isSecure: false,
        },
        redirectTo: '/login',
        validateFunc,
    },
];
