import CONSTANTS from '../../constants';

const { PROJECT, FORM, DELETE_BEFORE_PUBLISH } = CONSTANTS.ROLES;

export default {
    guest: {
        can: [
            PROJECT.READ,
            FORM.READ,
        ],
    },
    collector: {
        can: [
            FORM.READ,
            FORM.UPDATE,
            {
                name: DELETE_BEFORE_PUBLISH,
                when: ({ user, obj }) => user.id === obj.lastModifiedBy,
            },
        ],
        inherits: ['guest'],
    },
    admin: {
        can: [
            PROJECT.ALL,
            FORM.ALL,
        ],
        inherits: ['collector'],
    },
};
