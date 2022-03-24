/* 
vuex管理的home模块
*/

import { reqSearchList } from '@/api'

const state = {
  searchList: {}
}

const mutations = {
  RECEIVE_PRODUCT_LIST(state, searchList) {
    state.searchList = searchList
  },

}

const actions = {
  //异步获取prodcutlist数据
  async getSearchList({ commit }, searchParams = {}) {
    //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
    //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象

    // 1. ajax请求, 获取数据
    const result = await reqSearchList(searchParams)
    // 2. 如果成功, 提交给mutation
    if (result.code === 200) {
      const searchList = result.data
      commit('RECEIVE_PRODUCT_LIST', searchList)
    }
  },

}

const getters = {
  //当前形参state，当前仓库中的state，并非大仓库中的那个state
  goodsList(state) {
    //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
    //假如网络不给力|没有网state.searchList.goodsList应该返回的是undefined
    //计算新的属性的属性值至少给人家来一个数组
    return state.searchList.goodsList || [];
  },

  // 返回品牌列表
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },

  // 返回属性列表
  attrsList(state) {
    return state.searchList.attrsList || []
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}