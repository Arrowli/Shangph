/* 
vuex管理的user模块
*/

import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import {setToken, getToken, removeToken} from '@/utils/token'

const state = {
  code: '',
  token: getToken(),
  userInfo:{}
}

const mutations = {
  GET_CODE(state, code) {
    state.code = code
  },

  USERLOGIN(state, token){
    state.token = token
  },

  GETUSERINFO(state, userInfo){
    state.userInfo = userInfo
  },

  CLEAR(state){
    state.token = '',
    state.userInfo = '',
    removeToken()
  }
}

const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    const result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GET_CODE', result.data)
      return "ok";
    }else{
      return Promise.reject(new Error('fail'))
    }
  },

  //用户注册
  async userRegister({ commit }, {phone, password, code}){
    const result = await reqUserRegister({phone, password, code})
    console.log('注册result', result)
    if (result.code === 200) {
      console.log(result)
      return "ok";
    }else{
      return Promise.reject(new Error(result.message))
    }
  },

  //登录业务
  async userLogin({ commit }, data){
    const result = await reqUserLogin(data)
    if (result.code === 200) {
      commit("USERLOGIN", result.data.token);
      setToken(result.data.token);
      return "ok";
    }else{
      return Promise.reject(new Error(result.message))
    }
  },

  //获取用户信息
  async getUserInfo({ commit }){
    const result = await reqUserInfo()
    console.log('获取用户信息result',result)
    if (result.code === 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    }else{
      return Promise.reject(new Error(result.message))
    }
  },

  //退出登录
  async userLogout({ commit }){
    let result = await reqLogout();
    if(result.code==200){
      commit("CLEAR");
      return 'ok';
    }else{
      return Promise.reject(new Error('fail'));
    }
  }
}

const getters = {
  
}

export default {
  state,
  actions,
  mutations,
  getters
}