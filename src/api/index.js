import http from './http'
import qs from 'qs'
import store from 'store'
let isDebug = true;
export const log = (str) => {
  if (isDebug) {
    console.log(str)
  }
}

let token = store.get('token').token

let getToken = {
  params: {
    token: token
  }
}
/**
 * 登陆获取token
 */
export const login = async(params) => {
  return await http.fetchGet('/auth/token', params);
}

/**
 * 获取服务器转发的数据
 */
export const reqTest = async(data) => {
  return await http.fetchPost(`/test/req?token=${token}`, qs.stringify(data));
}

/**
 * 发送实时流
 */
export const sendSocket = async(data) => {
  return await http.fetchPost(`/test/socket?token=${token}`, qs.stringify(data));
}
