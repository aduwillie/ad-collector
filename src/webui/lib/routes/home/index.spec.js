/* global describe beforeAll afterAll it expect */
import init from '../../../server';

describe('Home Route', () => {
    let server = {};

    beforeAll(async () => {
        server = await init(false);
    });

    afterAll(() => {
        server.stop();
    });

    it('should pass', () => {
        expect(true).toEqual(true);
    });
});
