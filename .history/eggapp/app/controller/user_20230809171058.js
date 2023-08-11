const { Controller } = require("egg");

class UserController extends Controller{

  /**
   * 获取用户列表
   */
  async index()
  const { crx } = this;
  //临时数据
const mockUsers = [
  { email: '1@qq.com', password: '123', registrationDate: '2021', role: 'user', is_deleted: '1' },
  { email: '2@qq.com', password: '223', registrationDate: '2022', role: 'admin', is_deleted: '0' },
  { email: '3@qq.com', password: '323', registrationDate: '2023', role: 'user', is_deleted: '1' },
]

ctx.body = {
  code: 0,
  message: 'success',
  data:mockUsers
}


}
module.exports = UserController
