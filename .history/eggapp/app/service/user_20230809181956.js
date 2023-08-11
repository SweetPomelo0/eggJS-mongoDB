const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 查询所有的user
   */
  async find() {
    // 临时数据
    const users = await this.ctx.model.find({});

    return Object.assign(
      {},
      {
        pageNum: 1,
        pageSize: 10,
        list: mockUsers,
      }
    );
  }
}
module.exports = UserService;

