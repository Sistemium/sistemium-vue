import Vue from 'vue';
import map from 'lodash/map';

import * as g from './getters';

export const AUTHORIZING = 'AUTHORIZING';
export const AUTHORIZED = 'AUTHORIZED';
export const NOT_AUTHORIZED = 'NOT_AUTHORIZED';
export const SAVE_ACCOUNT = 'SAVE_ACCOUNT';
export const PHA_AUTH_TOKEN = 'PHA_AUTH_TOKEN';
// export const SAVE_ACCOUNT = 'SAVE_ACCOUNT';

const LS_KEY_ACCOUNTS = 'stv.accounts';

export default {

  [AUTHORIZING](state, token) {
    Vue.set(state, 'busy', token || false);
  },

  [PHA_AUTH_TOKEN](state, id) {
    notBusy(state);
    Vue.set(state, PHA_AUTH_TOKEN, id);
  },

  [AUTHORIZED](state, data) {
    notBusy(state);
    state[PHA_AUTH_TOKEN] = false;
    Object.keys(data)
      .forEach(key => Vue.set(state, key, data[key]));
  },

  [NOT_AUTHORIZED](state, error) {
    notBusy(state);
    Vue.set(state, 'error', error);
  },

  [SAVE_ACCOUNT](state, { authorization, account }) {
    const saved = saveLoggedAccount(authorization, account);
    state[g.SAVED_ACCOUNTS] = map(saved, a => a.account);
  },

};


function saveLoggedAccount(authorization, account) {
  const saved = getSavedAccounts();
  saved[account.authId || authorization] = { account, authorization };
  localStorage.setItem(LS_KEY_ACCOUNTS, JSON.stringify(saved));
  return saved;
}


function notBusy(state) {
  state.busy = false;
}


export function getSavedAuthorization(account) {
  const allSaved = getSavedAccounts();
  const saved = allSaved[account.authId];
  return saved && saved.authorization;
}

function getSavedAccounts() {
  return JSON.parse(localStorage.getItem(LS_KEY_ACCOUNTS) || '{}') || {};
}


export function clearSavedAccounts() {
  localStorage.removeItem(LS_KEY_ACCOUNTS);
}
