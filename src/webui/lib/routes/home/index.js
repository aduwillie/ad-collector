import Path from 'path';

export default [
    {
        method: 'GET',
        path: '/',
        options: {
            auth: false,
            handler: (_, h) => h.view('login')
        },
    },
    {
        method: 'GET',
        path: '/login',
        options: {
            auth: false,
            handler: (_, h) => h.view('login')
        },
    },
    {
        method: 'GET',
        path: '/register',
        options: {
            auth: false,
            handler: (_, h) => h.view('register')
        },
    },
    {
        method: 'GET',
        path: '/dashboard',
        options: {
            auth: false,
            handler: (_, h) => h.view('dashboard/index')
        },
    },
    {
        method: 'GET',
        path: '/{path*}',
        options: {
            auth: false,
            handler: {
                directory: {
                    path: Path.resolve(__dirname, '../../../public'),
                    listing: false,
                    index: false,
                },
            },
        }
    },
];
