const ROLE_FIELDS = ['PROJECT', 'FORM'];

const ROLES = {
    DELETE_BEFORE_PUBLISH: 'delete_before_publish',
};
ROLE_FIELDS.forEach((role) => {
    if (!ROLES[role]) {
        ROLES[role] = {};
    }
    ROLES[role].CREATE = `${role.toLowerCase()}:create`;
    ROLES[role].READ = `${role.toLowerCase()}:read`;
    ROLES[role].UPDATE = `${role.toLowerCase()}:update`;
    ROLES[role].DELETE = `${role.toLowerCase()}:delete`;
    ROLES[role].ALL = `${role.toLowerCase()}:*`;
});

export default {
    DEFAULT_SECRET: 'fake_password',
    EMAIL_REGEX: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    ROLES,
    LOGS: {
        MONGO_LOG: 'mongo:log',
        MONGO_ERROR: 'mongo:error',
    },
};
