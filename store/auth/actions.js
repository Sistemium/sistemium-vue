import { authorize as authorizeJSDataStore } from 'sistemium-jsdata/lib/store';
import { confirm, login, roles } from 'sistemium-jsdata/lib/auth';

import * as m from './mutations';
import { isNative, getRoles } from '../../services/native';

const LS_KEY = 'stv.authorization';

export const AUTH_INIT = 'AUTH_INIT';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_CONFIRM = 'AUTH_REQUEST_CONFIRM';
export const LOGOFF = 'LOGOFF';
export const CLEAR_ERROR = '';
export const LOG_ACCOUNT = 'LOG_ACCOUNT';

export default {

  /*
  Get account info and roles by an authorization token
   */

  async [AUTH_INIT]({ commit }, accessToken) {

    const token = accessToken || localStorage.getItem(LS_KEY) || isNative();

    commit(m.AUTHORIZING, token);

    if (!token) {
      return Promise.resolve();
    }

    const rolesPromise = isNative() ? getRoles() : roles(token);

    // await new Promise(resolve => setTimeout(resolve, 500));

    return rolesPromise
      .then(res => {
        const { id: gotToken } = res;
        localStorage.setItem(LS_KEY, gotToken);
        authorizeJSDataStore(gotToken, res.account.org);
        commit(m.AUTHORIZED, res);
        commit(m.SAVE_ACCOUNT, { authorization: gotToken, account: res.account });
      })
      .catch(error => commit(m.NOT_AUTHORIZED, error));

  },

  async [LOG_ACCOUNT]({ dispatch }, account) {

    if (!account) {
      throw new Error('Account to log in must be not empty');
    }

    const token = m.getSavedAuthorization(account);

    if (!token) {
      throw new Error('No saved account info');
    }

    await dispatch(AUTH_INIT, token);

  },

  /*
  Request phone authorization code
   */

  [AUTH_REQUEST]({ commit }, { value, input: phone }) {

    commit(m.PHA_AUTH_TOKEN, {});
    commit(m.AUTHORIZING, phone);

    const res = login(`8${value}`)
      .then(id => commit(m.PHA_AUTH_TOKEN, { id, phone }));

    res.catch(() => commit(m.NOT_AUTHORIZED, 'Неизвестный номер'));

    return res;

  },

  /*
  Confirm phone authorization code
   */

  [AUTH_REQUEST_CONFIRM]({ state, dispatch, commit }, { value: code }) {

    commit(m.AUTHORIZING, code);

    const res = confirm(code, state[m.PHA_AUTH_TOKEN].id)
      .then(({ accessToken }) => dispatch(AUTH_INIT, accessToken));

    res.catch(() => commit(m.NOT_AUTHORIZED, 'Неправильный пароль'));

    return res;

  },

  /*
  Clean up
   */

  [LOGOFF]({ commit }) {
    commit(m.AUTHORIZED, { account: false, roles: false });
    localStorage.removeItem(LS_KEY);
    m.clearSavedAccounts();
  },

  [CLEAR_ERROR]({ commit }) {
    commit(m.NOT_AUTHORIZED, false);
  },

};
