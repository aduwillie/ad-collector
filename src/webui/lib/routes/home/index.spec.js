/* global describe beforeAll afterAll afterEach it expect jest */
import Path from 'path';

import init from '../../../server';
import Routes from './index';

describe('Home Route', () => {
    let server = {};

    beforeAll(async () => {
        server = await init(false);
    });

    afterAll(() => {
        server.stop();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should GET / route', async () => {
        const route = Routes.find(r => r.path === '/');
        expect(route).toBeDefined();
        expect(route.options.auth).toEqual(false);
        const mockReponseToolkit = {
            redirect: jest.fn(),
        };
        await route.options.handler({}, mockReponseToolkit);
        expect(mockReponseToolkit.redirect).toHaveBeenCalled();
        expect(mockReponseToolkit.redirect).toHaveBeenCalledTimes(1);
        expect(mockReponseToolkit.redirect.mock.calls[0][0]).toEqual('/login');
    });

    it('should GET /login route', async () => {
        const route = Routes.find(r => r.path === '/login');
        expect(route).toBeDefined();
        expect(route.options.auth).toEqual(false);
        const mockReponseToolkit = {
            view: jest.fn(),
        };
        await route.options.handler({}, mockReponseToolkit);
        expect(mockReponseToolkit.view).toHaveBeenCalled();
        expect(mockReponseToolkit.view).toHaveBeenCalledTimes(1);
        expect(mockReponseToolkit.view.mock.calls[0][0]).toEqual('login');
    });

    it('should GET /register route', async () => {
        const route = Routes.find(r => r.path === '/register');
        expect(route).toBeDefined();
        expect(route.options.auth).toEqual(false);
        const mockReponseToolkit = {
            view: jest.fn(),
        };
        await route.options.handler({}, mockReponseToolkit);
        expect(mockReponseToolkit.view).toHaveBeenCalled();
        expect(mockReponseToolkit.view).toHaveBeenCalledTimes(1);
        expect(mockReponseToolkit.view.mock.calls[0][0]).toEqual('register');
    });

    it('should GET /dashboard route', async () => {
        const route = Routes.find(r => r.path === '/dashboard');
        expect(route).toBeDefined();
        expect(route.options.auth).toEqual(false);
        const mockReponseToolkit = {
            view: jest.fn(),
        };
        await route.options.handler({}, mockReponseToolkit);
        expect(mockReponseToolkit.view).toHaveBeenCalled();
        expect(mockReponseToolkit.view).toHaveBeenCalledTimes(1);
        expect(mockReponseToolkit.view.mock.calls[0][0]).toEqual('dashboard/index');
    });

    it('should GET /{path*} (other static assets) route', async () => {
        const route = Routes.find(r => r.path === '/{path*}');
        expect(route).toBeDefined();
        expect(route.options.auth).toEqual(false);
        expect(route.options.handler.directory.path).toEqual(Path.resolve(__dirname, '../../../public'));
        expect(route.options.handler.directory.path.includes('/public')).toBeTruthy();
        expect(route.options.handler.directory.listing).toEqual(false);
        expect(route.options.handler.directory.index).toEqual(false);
    });
});
