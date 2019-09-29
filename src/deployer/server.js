require('dotenv').config();
import Hapi from '@hapi/hapi';
// import Joi from '@hapi/joi';

// import { existsSync, mkdirSync } from 'fs';
import { spawn } from 'child_process';
// import { PassThrough } from 'stream';

const DEFAULT_PORT = 3000;
const DEFAULT_HOST = '0.0.0.0';
// const BASE_DIR = '/repos';

export const init = async (env, shouldStart = true) => {
    const server = Hapi.server({
        port: env.PORT || DEFAULT_PORT,
        host: env.HOST || DEFAULT_HOST,
    });

    // adding routes
    server.route({
        method: 'GET',
        path: '/health',
        options: {
            handler: async () => ({ 
                server: 1
            }),
        },
    });

    server.route({
        method: 'GET',
        path: '/deploy',
        options: {
            validate: {
                // params: {
                //     repo: Joi.string().required(),
                // },
            },
            handler: (req, h) => {
                // const repoPath = `${BASE_DIR}/${req.params.repo}`;
                // if (!existsSync()) mkdirSync(repoPath);

                const command = 'ansible-playbook playbooks/docker_playbook.yml';
                // const command = 'ansible-playbook --version';
                // const channel = new PassThrough();

                const childProcess = spawn(command, {
                    // stdio: 'inherit',
                    shell: true,
                    cwd: './deployer',
                });
                return h.response(childProcess.stdout)
                    .type('text/event-stream')
                    .header('Connection', 'keep-alive')
                    .header('Cache-Control', 'no-cache');
            },
        },
    });

    await server.register([]);

    if (shouldStart) {
        await server.start();
        console.log('Server running on %s', server.info.uri);
    }
    return server;
};

process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit(1);
});
