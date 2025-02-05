import request from '@/utils/request'
import { Dashboard, Dept, Login, Menu, ResultData, Role, User } from '@/types/api'
export default {
  login(params: Login.params) {
    return request.post<string>('users/login', params, { showLoading: true })
  },

  getUserInfo() {
    return request.get<User.UserItem>('users/getUserInfo')
  },

  getReportData() {
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  },
  getLineData() {
    return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
  },

  getPieCityData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieCityData')
  },
  getPieAgeData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieAgeData')
  },
  getRadarData() {
    return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
  },
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>('/users/list', params)
  },
  createUser(params: User.CreateParams) {
    return request.post('/users/create', params)
  },
  editUser(params: User.EditParams) {
    return request.post('/users/edit', params)
  },
  delUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>('/users/getPermissionList')
  },
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>('/dept/list', params)
  },
  getAllUserList() {
    return request.get<User.UserItem[]>('/users/all/list')
  },
  createDept(params: Dept.CreateParams) {
    return request.post('/dept/create', params)
  },
  editDept(params: Dept.EditParams) {
    return request.post('/dept/edit', params)
  },
  deleteDept(params: Dept.DelParams) {
    return request.post('/dept/delete', params)
  },
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>('/menu/list', params)
  },
  createMenu(params: Menu.CreateParams) {
    return request.post('/menu/create', params)
  },
  editMenu(params: Menu.EditParams) {
    return request.post('/menu/edit', params)
  },
  deleteMenu(params: Menu.DelParams) {
    return request.post('/menu/delete', params)
  },
  getRoleList(params: Role.Params) {
    return request.get<ResultData<Role.RoleItem>>('/roles/list', params)
  },
  createRole(params: Role.CreateParams) {
    return request.post('/roles/create', params)
  },
  editRole(params: Role.EditParams) {
    return request.post('/roles/edit', params)
  },
  delRole(params: { _id: string }) {
    return request.post('/roles/delete', params)
  },
  updatePermission(params: Role.CreatePermission) {
    return request.post('/roles/update/permission', params)
  },
  getAllRoleList() {
    return request.get<Role.RoleItem[]>('/roles/allList')
  }
}
