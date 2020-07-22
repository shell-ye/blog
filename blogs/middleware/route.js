export default function({ isHMR, app, store, route, params, error, redirect }) {
    if (isHMR) return
    // 页面均放在_lang文件夹下，即lang为动态路由参数
    /*if (!params.lang) {  //此写法会出现路由重定向次数过多的问题
        return redirect('/' + defaultLocale + '' + route.fullPath)
    }
    */
    if(route.fullPath == '/user') {
        return redirect('/user/center')
    }
    if(route.fullPath == '/user/article') {
        return redirect('/user/article/manage')
    }
}