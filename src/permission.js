import router from './router'
import store from './store'
// 消息提示框
import { Message } from 'element-ui'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

/**
 * 是否有相应的权限
 * @param {角色} roles
 * @param {角色相应的权限} permissionRoles
 */
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) {
    return true
  }
  if (!permissionRoles) {
    return false
  }
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// 白名单：不需要权限验证
const whiteList = ['/login', '/auth-redirect', '/401', '/404']

router.beforeEach((to, from, next) => {
  // 显示进度条
  NProgress.start()
  // 是否有token
  if (getToken()) {
    // if start 1
    if (to.path === '/login') {
      // if start 2
      // 如果是登录页面请求
      next({ path: '/' })
      NProgress.done()
    } else {
      // 如果角色名单为空,则从服务器获取用户信息
      if (store.getters.roles.length === 0) {
        // if start 3
        store
          .dispatch('GetUserInfo')
          .then(res => {
            const roles = res.data.roles // 获取角色列表
            // 根据roles权限生成可访问的路由列表
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由列表
              next({ ...to, replace: true })
            })
          })
          .catch(err => {
            // catch the GetUserInfo request error
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || '验证失败，请重新登录')
              next({ path: '/' })
            })
          })
      } else {
        // 权限判断
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } })
        }
      } // if end 3
    } // if end 2
  } else {
    // 如果是在白名单列表，无需权限判断，可直接访问系统
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页面
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
}) 
