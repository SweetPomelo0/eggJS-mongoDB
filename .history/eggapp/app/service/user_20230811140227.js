const Service = require('egg').Service;
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

  /**
   * 修改密码
   * @param email
   * @param newPassword
   */
  async updatePasswordByEmail(email, newPassword) {
    // 更新数据库的密码
    const passwordNew = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    await this.ctx.model.User.updateOne({ email }, { password: passwordNew });
  }
}
module.exports = UserService;

