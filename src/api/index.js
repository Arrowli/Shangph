/* 
包含所有接口请求函数的模块
*/
import ajax from './ajax'
import mockAjax from './mockAjax'

//获取商品的三级分类列表
export const reqBaseCategoryList = ()=>ajax.get('/product/getBaseCategoryList')

// 获取广告轮播列表
export const reqBanners = () => mockAjax.get('/banners')
// 获取首页楼层列表
export const reqFloors = () => mockAjax.get('/floors')

// 请求搜索匹配的商品相关数据 地址:/api/list  请求方式:post  参数:需要带参数
//当前这个函数需不需要接受外部传递参数
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqSearchList = (searchParams)=>ajax({url:'/list', method:'post', data: searchParams})

//请求商品详情
export const reqGoodsInfo = (skuId)=>ajax({url:`/item/${skuId}`, method:'get'})

//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum)=>ajax({url:`/cart/addToCart/${skuId}/${skuNum}`, method:'post'})

//获取购物车列表
export const reqShopCart = ()=>ajax.get('/cart/cartList')

//删除购物产品的接口
export const reqDeleteCartById = (skuId)=>ajax({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//修改商品的选中状态
export const reqUpdateCheckedById = (skuId,isChecked)=>ajax({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//10.获取订单交易页信息 /api/order/auth/trade
export const reqOrderInfo = ()=>ajax.get('/order/auth/trade')

//获取验证码
export const reqGetCode = (phone)=>ajax({url:`/user/passport/sendCode/${phone}`, method:'get'})

//注册
export const reqUserRegister = ({phone, password, code})=>ajax({url:'/user/passport/register', data:{phone, password, code}, method:'post'})

//登录
export const reqUserLogin = (data)=>ajax({url:'/user/passport/login', data, method:'post'})

//获取用户信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = ()=>ajax({url:'/user/passport/auth/getUserInfo',method:'get'})

//获取用户地址信息
export const reqAddressInfo = ()=>ajax({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//退出登录
export const reqLogout = ()=>ajax({url:'/user/passport/logout',method:'get'})

//12.提交订单
export const reqSubmitOrder = (tradeNo,data)=>ajax({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data, method:'POST'})

//13.获取订单支付信息
export const reqPayInfo = (orderId)=>ajax({url:`/payment/weixin/createNative/${orderId}`, method:'get'})

//14.查询支付订单状态
export const reqPayStatus = (orderId)=>ajax({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//11.获取我的订单列表/api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit)=>ajax({url:`/order/auth/${page}/${limit}`, method:'get'})