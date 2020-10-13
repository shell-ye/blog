// 路由表
const Index = () => import(/* webpackChunkName: "group-foo" */ '../views/index.vue')
const Login = () => import(/* webpackChunkName: "group-foo" */ '../views/Login/index.vue')

// user
const User = () => import(/* webpackChunkName: "group-foo" */ '../views/User/index.vue')
const User_Center = () => import(/* webpackChunkName: "group-foo" */ '../views/User/Center/index.vue')
const User_Article = () => import(/* webpackChunkName: "group-foo" */ '../views/User/Article/index.vue')
const User_Article_manage = () => import(/* webpackChunkName: "group-foo" */ '../views/User/Article/Manage.vue')
const User_Article_write = () => import(/* webpackChunkName: "group-foo" */ '../views/User/Article/Write.vue')
const User_Article_update = () => import(/* webpackChunkName: "group-foo" */ '../views/User/Article/Update.vue')

// article 
const Article = () => import(/* webpackChunkName: "group-foo" */ '../views/Article/index.vue')

// notes
const Notes = () => import(/* webpackChunkName: "group-foo" */ '../views/Notes/index.vue')

// auther
const Author = () => import(/* webpackChunkName: "group-foo" */ '../views/Author/index.vue')

// categories
const Categories = () => import(/* webpackChunkName: "group-foo" */ '../views/Categories/index.vue')

// search
const Search = () => import(/* webpackChunkName: "group-foo" */ '../views/Search/index.vue')

// friends
const Friends = () => import(/* webpackChunkName: "group-foo" */ '../views/Friends/index.vue')

// mobile
// login
const MobileLogin = () => import(/* webpackChunkName: "group-foo" */ '../views/Mobile/Login/index.vue')
// register
const MobileRegister = () => import(/* webpackChunkName: "group-foo" */ '../views/Mobile/Register/index.vue')
// user
const MobileUserCenter = () => import(/* webpackChunkName: "group-foo" */ '../views/Mobile/User/Center/index.vue')
const MobileUserLikes = () => import(/* webpackChunkName: "group-foo" */ '../views/Mobile/User/Likes/index.vue')


const routeTable = [
    { path: '/', redirect: '/index'},
    { path: '/index', component: Index, name: 'index'},
    { path: '/login', component: Login, name: 'login'},
    { path: '/user', component: User, name: 'user', redirect: '/user/center', children: [
        { path: 'center', component: User_Center, name: 'userCenter'},
        { path: 'article', component: User_Article, name: 'userArticle', redirect: '/user/article/manage', children: [
            { path: 'manage', component: User_Article_manage, name: 'userArticleManage'},
            { path: 'write', component: User_Article_write, name: 'userArticleWrite'},
            { path: 'update', component: User_Article_update, name: 'userArticleUpdate'}
        ]},
    ]},
    { path: '/article/:id', component: Article, name: 'article'},
    { path: '/notes', component: Notes, name: 'notes'},
    { path: '/author', component: Author, name: 'author'},
    { path: '/categories', component: Categories, name: 'categories'},
    { path: '/search', component: Search, name: 'search'},
    { path: '/friends', component: Friends, name: 'friends'},

    // mobile
    { path: '/mobile/login', component: MobileLogin, name: 'mobileLogin'},
    { path: '/mobile/register', component: MobileRegister, name: 'mobileRegister'},
    // mobile user center
    { path: '/mobile/user/center', name: 'mobileUserCenter', component: MobileUserCenter },
    { path: '/mobile/user/likes', name: 'mobileUserLikes', component: MobileUserLikes }
]

// 导出路由表
export default routeTable