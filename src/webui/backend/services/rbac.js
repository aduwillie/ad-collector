import BaseService from './base';
import Roles from '../lib/configs/roles';

class RbacService extends BaseService {
    async initialize() {
        return new Promise((resolve) => {
            this.roles = {};
            Object.keys(Roles).forEach((roleKey) => {
                const roleObjToCopy = Roles[roleKey];
                const roleObj = {
                    can: {},
                    inherit: roleObjToCopy.inherits,
                };
                roleObjToCopy.can.forEach((operation) => {
                    if (typeof operation === 'string') roleObj.can[operation] = 1;
                    else if (typeof operation.name === 'string' && typeof operation.when === 'function') {
                        roleObj.can[operation.name] = operation.when;
                    }
                });
                this.roles[roleKey] = roleObj;
                resolve();
            });
        });
    }

    async can(role, operation, params) {
        const foundRole = this.roles[role];
        if (!foundRole) return Promise.resolve(false);

        // case when operation is not inherited
        const foundOperation = foundRole.can[operation];
        if (foundOperation) {
            if (typeof foundOperation !== 'function') return Promise.resolve(true);
            return Promise.resolve(foundOperation(params));
        }

        // case when operation is inherited
        if (foundRole.inherits && foundRole.inherits.length) {
            for (let i = 0; i < foundRole.inherits.length; i++) {
                const childRole = foundRole.inherits[i];
                const canRunOperation = await this.can(childRole, operation, params);
                if (canRunOperation) return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }
}

export default RbacService;
