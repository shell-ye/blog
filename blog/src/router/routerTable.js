// 路由表
const Index = () => import(/* webpackChunkName: "group-foo" */ '../views/index.vue')
const Login = () => import(/* webpackChunkName: "group-foo" */ '../views/login.vue')

// user
const User = () => import(/* webpackChunkName: "group-foo" */ '../views/user/index.vue')
const User_Center = () => import(/* webpackChunkName: "group-foo" */ '../views/user/center.vue')
const User_Article = () => import(/* webpackChunkName: "group-foo" */ '../views/user/article/index.vue')
const User_Article_manage = () => import(/* webpackChunkName: "group-foo" */ '../views/user/article/manage.vue')
const User_Article_write = () => import(/* webpackChunkName: "group-foo" */ '../views/user/article/write.vue')
const User_Article_update = () => import(/* webpackChunkName: "group-foo" */ '../views/user/article/update.vue')

// article 
const Article = () => import(/* webpackChunkName: "group-foo" */ '../views/article/index.vue')

// notes
const Notes = () => import(/* webpackChunkName: "group-foo" */ '../views/notes/index.vue')

// auther
const Author = () => import(/* webpackChunkName: "group-foo" */ '../views/author/index.vue')

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
    { path: '/author', component: Author, name: 'author'}
]

// 导出路由表
export default routeTable