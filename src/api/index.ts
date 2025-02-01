import request from '@/utils/request'
import { Login, User } from '@/types/api'
export default {
  login(params: Login.params) {
    return request.post<string>('users/login', params, { showLoading: true })
  },

  getUserInfo() {
    return request.get<User.UserItem>('users/getUserInfo')
  }
}
