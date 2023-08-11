const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 查询所有的user
   */
  async findAll() {
    // 临时数据
    const users = await this.ctx.model.User.find({});

    return {
      pageNum: 1,
      pageSize: 10,
      list: users,
    };
  }

  /**
   * 根据邮箱查找用户
   * @param params
   */
  async find(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.User.findOne({ email: params.email });
      return results;
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
  async createUser(params) {
    const user = await this.ctx.model.User.find({});
    // const { ctx } = this;
    try {
      // const newUser = new ctx.model.User({
      //   email: params.email,
      //   password: params.password,
      //   registrationDate: Date.now(),
      //   role: params.role,
      //   is_deleted: params.is_deleted,
      // });

      // const results = await newUser.save();
      // return results;

      const results = await newUser.create(params);
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }
}
module.exports = UserService;

