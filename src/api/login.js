import request from '@/utils/request'

/**
 * 通过用户名和密码登录
 * @param {用户名} username
 * @param {密码} password
 */
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

/**
 * 通过token获取用户的基本信息
 * @param {token} token
 */
export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
