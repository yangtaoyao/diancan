import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export const getToken = () => Cookies.get(TokenKey)
export const setToken = token => Cookies.set(TokenKey, token)
export const removeToken = () => Cookies.remove(TokenKey)

export const getUserInfo = () => {
  let UserInfo = Cookies.getJSON('UserInfo')
  return UserInfo
}
export const setUserInfo = UserInfo => {
  Cookies.set('UserInfo', UserInfo)
}
export const removeUserInfo = () => Cookies.remove('UserInfo')
