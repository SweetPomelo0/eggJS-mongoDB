const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 查询所有的user
   */
  async find() {
    // 临时数据
    const mockUsers = [
      { email: '1@qq.com', password: '123', registrationDate: '2021', role: 'user', is_deleted: '1' },
      { email: '2@qq.com', password: '223', registrationDate: '2022', role: 'admin', is_deleted: '0' },
      { email: '3@qq.com', password: '323', registrationDate: '2023', role: 'user', is_deleted: '1' },
    ];

    return Object.assign(
      {},
      {
        pageNum: 1,
        pageSize: 10,
        list: mockUsers,
      }
    );
  }

module.exports = UserService;

