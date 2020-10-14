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
      account: undefined,
      error: false,
      [PHA_AUTH_TOKEN]: {},
      savedAccounts: [],
    };
  },

};
