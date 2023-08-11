'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/hello', controller.home.index);
  router.resources('tags', '/api/v1/tags', jwt, controller.tags);
};

