'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hello, egg';
	}
}

module.exports = HomeController;
