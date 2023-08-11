const Service = require('egg').Service;

class UserService extends Service {
  // /**
  //  * 查询所有的user
  //  */
  // async find() {
  //   // 临时数据
  //   const users = await this.ctx.model.find({});

  //   return Object.assign(
  //     {},
  //     {
  //       pageNum: 1,
  //       pageSize: 10,
  //       list: users,
  //     }
  //   );
  // }

  /**
   * 根据邮箱查找用户
   * @param params
   */
  async find(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.User.findOne({ email: params.email });
      return results.toArray();
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }
  /**
   * 用户注册
   * @param params
   */
  async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.User.insertOne(Object.assign({}, params));
      return results.toArray();
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }
}
module.exports = UserService;

