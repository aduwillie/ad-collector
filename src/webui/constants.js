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

export default ROLES;
