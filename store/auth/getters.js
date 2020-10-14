export const HAS_ROLE = 'HAS_ROLE';
export const SAVED_ACCOUNTS = 'savedAccounts';

export default {

  [HAS_ROLE](state) {
    return role => !!(state.roles && state.roles[role]) || false;
  },

  [SAVED_ACCOUNTS](state) {
    return state[SAVED_ACCOUNTS] || [];
  },

};
