/* 
vuex管理的trade模块
*/

import { reqOrderInfo, reqAddressInfo } from '@/api'

const state = {
  orderInfo: {},
  address:[]
}

const mutations = {
  GET_ORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  },

  GET_ADDRESS_INFO(state, address) {
    state.address = address
  },
}

const actions = {
  //异步获取购物车数据
  async getOrderInfo({ commit }) {
    const result = await reqOrderInfo()
    if (result.code === 200) {
      console.log('异步获取购物车数据',result)
      commit('GET_ORDERINFO', result.data)
    } else {
      alert(result.message)
    }
  },

  //获取用户地址信息
  async getUserAddress({ commit }) {
    const result = await reqAddressInfo()
    if (result.code === 200) {
      console.log('地址信息',result)
      commit('GET_ADDRESS_INFO', result.data)
    } else {
      alert(result.message)
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