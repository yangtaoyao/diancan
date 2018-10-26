import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export const getToken = () => sessionStorage.getItem(TokenKey)

export const setToken = token => { sessionStorage.setItem(TokenKey, token) }
export const removeToken = () => sessionStorage.removeItem(TokenKey)

export const getUserInfo = () => {
  let UserInfo = Cookies.getJSON('UserCusInfo')
  return UserInfo
}
export const setUserInfo = UserInfo => {
  Cookies.set('UserCusInfo', UserInfo)
}
export const removeUserInfo = () => Cookies.remove('UserCusInfo')
