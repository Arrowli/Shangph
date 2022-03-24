/* 
vuex管理的home模块
*/
import {reqBanners, reqBaseCategoryList, reqFloors} from '@/api'

const state = {
  baseCategoryList:[], // 所有分类的数组
  banners:[],
  floors:[],
}

const mutations = {
  RECEIVE_BASE_CATEGORY_LIST(state, categoryList) {
    state.baseCategoryList = categoryList
  }, 

  RECEIVE_BANNERS(state, banners) {
    state.banners = banners
  },

  RECEIVE_FLOORS(state, floors) {
    state.floors = floors
  },
}

const actions = {
  //异步获取首页所有分类
  async getbaseCategoryList({commit}) {
    const result = await reqBaseCategoryList()
    if(result.code === 200){
      commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
    }
  }, 

  //异步获取广告位轮播数据
  async getBanners({commit}){
    const result = await reqBanners()
    if(result.code === 200){
      commit('RECEIVE_BANNERS', result.data)
    }
  }, 

  //异步获取floor数据
  async getFloors({commit}){
    const result = await reqFloors()
    if(result.code ===200){
      commit('RECEIVE_FLOORS', result.data)
    }
  }, 
  
}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}