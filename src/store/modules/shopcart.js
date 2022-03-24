/* 
vuex管理的shopcart模块
*/

import { reqShopCart, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

const state = {
  shopCartList: []
}

const mutations = {
  GET_SHOPCART(state, shopCart) {
    state.shopCartList = shopCart
    // console.log('mutation没', shopCart)

  }
}

const actions = {
  //异步获取购物车数据
  async getCartList({ commit }) {
    const result = await reqShopCart()
    // console.log('发了没')
    // 2. 如果成功, 提交给mutation
    if (result.code === 200) {
      // console.log('成功没')
      commit('GET_SHOPCART', result.data)
      // console.log(result.data)
    }
  },

  //修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code === 200) {
      // console.log('cgl')
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },

  //修改全部产品的状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    //数组
    let promiseAll = []
    // console.log(commit)
    state.shopCartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('updateCheckedById', {
        skuId: item.skuId,
        isChecked,
      })
      promiseAll.push(promise)
    })
    // console.log(Promise.all(promiseAll))
    return Promise.all(promiseAll)
  },

  //删除全部勾选的产品    
  deleteAllCheckedCart({ dispatch, getters }) {
    //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    //获取购物车中全部的产品（是一个数组）
    let promiseAll = []
    getters.shopCart.cartInfoList.forEach((item) => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      promiseAll.push(promise)
    })
    // console.log(Promise.all(promiseAll))
    return Promise.all(promiseAll)
  },

  //删除一个商品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
}

const getters = {
  shopCart(state) {
    return state.shopCartList[0] || {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}