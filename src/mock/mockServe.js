//先引入mockjs模块
import Mock from "mockjs";
//把JSON数据格式引入进来[JSON数据格式根本没有对外暴露，但是可以引入]
//webpack默认对外暴露的：图片、JSON数据格式
import banners from './banners.json'
import floors from './floors.json'
import shopcart from './shopcart'

//mock数据:第一个参数请求地址   第二个参数：请求数据
Mock.mock('/mock/banners', {code:200, data: banners})//模拟首页大的轮播图的数据
Mock.mock('/mock/floors', {code:200, data: floors})
Mock.mock('/mock/shopcart', {code:200, data: shopcart})