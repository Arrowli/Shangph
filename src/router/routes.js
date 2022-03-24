//引入组件
const Home = ()=> import ('@/pages/Home')
const Search  = ()=> import  ('@/pages/Search')
const Login  = ()=> import  ('@/pages/Login')
const Register  = ()=> import  ('@/pages/Register')
const Detail  = ()=> import  ('@/pages/Detail')
const AddCartSuccess  = ()=> import  ('@/pages/AddCartSuccess')
const ShopCart  = ()=> import  ('@/pages/ShopCart')
const Trade  = ()=> import  ('@/pages/Trade')
const Pay  = ()=> import  ('@/pages/Pay')
const PaySuccess  = ()=> import  ('@/pages/PaySuccess')
const Center  = ()=> import  ('@/pages/Center')
const MyOrder  = ()=> import  ('@/pages/Center/MyOrder')
const GroupOrder  = ()=> import  ('@/pages/Center/GroupOrder')


export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        name: 'search', // 是当前路由的标识名称
        path: '/search/:keyword?',
        component: Search,
        props: route => ({ keyword3: route.params.keyword, keyword4: route.query.keyword2 })
    },
    {
        name: 'login', // 是当前路由的标识名称
        path: '/login',
        component: Login,
        meta: {
            hideFooter: true
        }
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/register',
        component: Register,
        meta: {
            hideFooter: true
        }
    },
    {
        name: '/detail',
        path: '/detail/:skuId?',
        component: Detail,
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart') {
                next()
            } else next('/shopcart')
        },
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else next('/trade')
        },
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        beforeEnter: (to, from, next) => {
            if (from.path === '/pay') {
                next()
            } else next('/pay')
        },
    },
    {
        name: 'center',
        path: '/center',
        component: Center,
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '',
                component: MyOrder
            },
        ]
    },
]
