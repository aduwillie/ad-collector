class BaseService {
    constructor(server, options) {
        this.server = server;
        this.options = options;

        if (typeof this.initialize === 'function') {
            server.ext({
                type: 'onPreStart',
                method: this.initialize,
                options: { bind: this },
            });
        }
    }
}

export default BaseService;