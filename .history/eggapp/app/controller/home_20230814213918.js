const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      message: 'success',
    };
  }
}

module.exports = HomeController;

