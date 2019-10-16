export default [
    {
        method: 'GET',
        path: '/',
        options: {
            auth: false,
            handler: async (_, h) => h.redirect('/login'),
        },
    },
    {
        method: 'GET',
        path: '/login',
        options: {
            auth: false,
            handler: async (_, h) => h.view('login', {
                title: 'Login',
            }),
        },
    },
    {
        method: 'GET',
        path: '/register',
        options: {
            auth: false,
            handler: async (_, h) => h.view('register')
        },
    },
    {
        method: 'GET',
        path: '/dashboard',
        options: {
            auth: false,
            handler: async (_, h) => h.view('dashboard/index')
        },
    },
    {
        method: 'GET',
        path: '/{path*}',
        options: {
            auth: false,
            handler: {
                directory: {
                    path: 'public',
                    listing: false,
                    index: false,
                },
            },
        }
    },
];
