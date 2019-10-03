import Schmervice from 'schmervice';
import Promise from 'bluebird';

import Roles from '../configs/roles';

class RbacService extends Schmervice.Service {
    async initialize() {
        this.roles = {};
        Object.keys(Roles).forEach((roleKey) => {
            const roleObjToCopy = Roles[roleKey];

            const roleObj = {
                can: {},
                inherit: roleObjToCopy.inherits,
            };
            
            roleObjToCopy.can.forEach((operation) => {
                if (typeof operation === 'string') roleObj.can.operation = 1;
                else if (typeof operation.name === 'string' && typeof operation.when === 'function') {
                    roleObj.can[operation.name] = operation.when;
                }
            });

            this.roles[roleKey] = roleObj;
        });
    }

    async can(role, operation, params) {
        const foundRole = this.roles[role];
        if (!foundRole) return Promise.resolve(false);

        // case when operation is not inherited
        const foundOperation = foundRole.can[operation];
        if (foundOperation) {
            if (typeof foundOperation === 'string') return Promise.resolve(true);
            return Promise.resolve(foundOperation(params));
        }

        // case when operation is inherited
        if (!foundRole.inherits || !foundRole.inherits.length) return false;
        return Promise.any(Promise.map(foundRole.inherits, childRole => this.can(childRole, operation, params)));
    }
}

export default RbacService;
