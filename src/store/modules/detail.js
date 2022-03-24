/* 
vuex管理的detail模块
*/

import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
//封装游客身份模块uuid--->生成一个随机字符串（不能在变了）
import {getUUID} from '@/utils/uuid_token'

const state = {
  goodInfo: {},
  //游客临时身份
  uuid_token:getUUID()
}

const mutations = {
  GET_GOODS_INFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },

}

const actions = {
  //异步获取prodcutlist数据
  async getGoodsInfo({ commit }, skuId) {
    const result = await reqGoodsInfo(skuId)

    // 2. 如果成功, 提交给mutation
    if (result.code === 200) {
      commit('GET_GOODS_INFO', result.data)
    }
  },

  async addOrUpdateShopCart({ commit }, { skuId, skuNum }){
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code === 200) {
      // console.log('jinlaile')
      return 'ok'
    }else {
      return Promise.reject(new Error('fail'))
    }
  }

}

const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },

  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },

  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || {};
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}