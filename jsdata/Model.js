/* eslint-disable no-param-reassign */
import Vue from 'vue';
import isFunction from 'lodash/isFunction';
// import store from 'sistemium-telegram/jsdata/store';
import Model from 'sistemium-jsdata/lib/Model';
// import log from 'sistemium-telegram/services/log';
// import { serverDateTimeFormat } from 'sistemium-telegram/services/moments';

// const { debug } = log('model');

export default class VueManagedModel extends Model {

  constructor(config) {

    super(config);

    this.offs = {};

  }

  mon(event, callback) {
    const listener = (name, data) => name === this.name && callback(name, data);
    this.store.on(event, listener);
    return () => this.store.off(event, listener);
  }

  bind(component) {

    const cid = componentId(component);

    const onDataChange = () => {
      // debug('bind:onDataChange', this.name, component.$vnode.tag);
      setTimeout(() => component.$forceUpdate());
    };

    this.offs[cid] = this.offs[cid] || {};
    const offs = this.offs[cid];

    if (offs[undefined]) {
      this.unbind(component, undefined);
    }

    offs.$$$ = [
      this.mon('groupBy', onDataChange),
      this.mon('add', onDataChange),
      this.mon('remove', onDataChange),
    ];

  }

  /**
   * Binds a components's property to the store record set by the specified filter
   * @param {Object} component
   * @param {Object} query
   * @param {string} property
   * @param {Function} [onChange]
   * @returns {*}
   */
  bindAll(component, query, property, onChange) {

    const cid = componentId(component);

    const onDataChange = () => {
      const res = this.filter(query);
      Vue.set(component, property, res);
      if (onChange) {
        onChange(res);
      }
      // debug('bind:onDataChange', this.name, component.$vnode.tag);
      setTimeout(() => component.$forceUpdate());
      return res;
    };

    this.offs[cid] = this.offs[cid] || {};
    const offs = this.offs[cid];

    if (offs[property]) {
      this.unbind(component, property);
    }

    offs[property] = [
      this.mon('add', onDataChange),
      this.mon('remove', onDataChange),
    ];

    return onDataChange();

  }

  /**
   * Binds a components's property to the store record
   * @param {Object} component
   * @param {(string|Function)} idOrFunction
   * @param {string} [property]
   * @param {Function} [onChange]
   * @returns {*}
   */
  bindOne(component, idOrFunction, property, onChange) {

    const fn = isFunction(idOrFunction) && idOrFunction;
    const id = !fn && idOrFunction;
    const cid = componentId(component);

    const getDataById = () => {
      const itemId = id || fn();
      // eslint-disable-next-line
      // console.info('getDataById', this.name, itemId);
      return itemId ? this.store.get(this.name, itemId) : null;
    };

    const onDataChange = () => {
      const data = getDataById();
      // eslint-disable-next-line
      // console.info('onDataChange', this.name, property, data);
      if (property) {
        Vue.set(component, property, data);
      } else {
        component.$forceUpdate();
      }
      if (onChange) {
        onChange(data);
      }
      return data;
    };

    this.offs[cid] = this.offs[cid] || {};
    const offs = this.offs[cid];

    const bindKey = property || idOrFunction;

    if (offs[bindKey]) {
      this.unbind(component, bindKey);
    }

    offs[bindKey] = [
      this.mon('add', onDataChange),
      this.mon('remove', onDataChange),
    ];

    return onDataChange();

  }

  /**
   * Cleanup property bindings for the component
   * @param {Object} component
   * @param {String} property
   */

  unbind(component, property) {
    const cid = componentId(component);
    const offs = this.offs[cid];
    offs[property].forEach(off => off());
    delete offs[property];
  }

  /**
   * Removes all components's model bindings
   * @param {Object} component
   * @returns {*}
   */
  unbindAll(component) {

    const cid = componentId(component);

    if (!this.offs[cid]) {
      return;
    }

    Object.keys(this.offs[cid])
      .forEach(property => this.unbind(component, property));

    delete this.offs[cid];

  }

}

function componentId(component) {
  // TODO: refactor without private property usage
  // eslint-disable-next-line
  return component._uid;
}
