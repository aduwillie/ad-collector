import Path from 'path';

export default [
    {
        method: 'GET',
        path: '/',
        options: {
            auth: false,
            handler: (_, h) => h.view('index')
        },
    },
    {
        method: 'GET',
        path: '/assets/{path*}',
        options: {
            auth: false,
            handler: {
                directory: {
                    path: Path.resolve(__dirname, '../public'),
                    listing: false,
                    index: false,
                },
            },
        }
    },
];
