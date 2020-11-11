import getters from './getters';
import actions from './actions';
import mutations, { PHA_AUTH_TOKEN } from './mutations';

export default {

  namespaced: true,

  getters,
  actions,
  mutations,

  state() {
    return {
      id: undefined,
      account: undefined,
      busy: false,
      roles: undefined,
      token: undefined,
      error: false,
      [PHA_AUTH_TOKEN]: {},
      savedAccounts: [],
    };
  },

};
