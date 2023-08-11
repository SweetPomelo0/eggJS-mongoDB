const Service = require('egg').Service;
// const utils = require('utility');
const bcrypt = require('bcryptjs');

class UserService extends Service {
  /**
   * 查询所有的user -测试
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
   * @param email
   */
  async findByEmail(email) {
    const user = await this.ctx.model.User.findOne({ email });
    return user;
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
        // password: utils.md5(params.password),
        password: bcrypt.hashSync(params.password, bcrypt.genSaltSync(10)),
        registrationDate: Date.now(),
        role: params.role,
        is_deleted: params.is_deleted,
      });

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

  // 验证邮箱格式
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
module.exports = UserService;

