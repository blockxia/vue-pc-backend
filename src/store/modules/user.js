/* eslint-disable */
import * as types from '../mutation-types';
import router from '../../router';

// 数据缓存
import { setLocal, getLocal } from '../../utils/storage';

const state = (() => {
  var user = getLocal('user');
  var state = {
    // 获取token
    token: user ? user.token : '',
    // 用户信息
    userinfo: user ? user : {}
  }
  return state;
})()
// 获取用户信息
const getters = {
  token: state => {
    if (state.userInfo && this.state.userInfo.userCode) {
      return state.userInfo
    } else {
      var user = getLocal("user");
      if (user) {
        state.token = user.token;
        state.userInfo = user;
        return user.token;
      } else {
        return router.push('/login');
      }
    }
  },
  userInfo: state => {
    console.log(state);
    if (state.userInfo && state.userInfo.userCode) {
      return state.userInfo;
    } else {
      var user = getLocal("user");
      if (user) {
        state.userInfo = user;
        state.token = user.token;
        return user;
      } else {
        return router.push('/login');
      }
    }
  }
}
const actions = {
  getLocalUser({
    commit
  }) {
    var user = getLocal("user");
    if (user) {
      commit(types.LOGIN_IN_SUCCESS, user);
    } else {
      return router.push('/login');
    }
  }
}
const mutations = {
  [types.LOGIN_IN_SUCCESS](state, result) {
    state.token = result.token;
    state.userInfo = result;
    setLocal("user", result);
    console.log(result);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
