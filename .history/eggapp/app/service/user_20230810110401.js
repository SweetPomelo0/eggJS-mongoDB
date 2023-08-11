const Service = require('egg').Service;
const utils = require('utility');

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
    try {
      const results = await this.ctx.model.User.findOne({ email: params.email });
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
    try {
      const newUser = new this.ctx.model.User({
        email: params.email,
        // password: params.password,
        password: utils.md5(params.password),
        registrationDate: Date.now(),
        role: params.role,
        is_deleted: params.is_deleted,
      });

      // 字段校验

      // 判断是否为新用户

      const results = await newUser.save();
      return results;

      // const results = await this.ctx.model.User.create(params);
      // return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }
}
module.exports = UserService;

