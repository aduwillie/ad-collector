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
            handler: async (_, h) => h.view('register', {
                title: 'Login',
            }),
        },
    },
    {
        method: 'GET',
        path: '/dashboard',
        options: {
            auth: false,
            handler: async (_, h) => h.view('dashboard', {
                title: 'Dashboard',
            }),
        },
    },
    {
        method: 'GET',
        path: '/projects',
        options: {
            auth: false,
            handler: async (_, h) => h.view('project/index', {
                title: 'Projects',
            }),
        },
    },
    {
        method: 'GET',
        path: '/forms',
        options: {
            auth: false,
            handler: async (_, h) => h.view('form/index', {
                title: 'Forms',
            }),
        },
    },
    {
        method: 'GET',
        path: '/users',
        options: {
            auth: false,
            handler: async (_, h) => h.view('user/index', {
                title: 'Users',
            }),
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
