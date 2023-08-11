// router.js
module.exports = app => {
  const { router } = app;
  router.get('/hello', controller.home.index);
};
