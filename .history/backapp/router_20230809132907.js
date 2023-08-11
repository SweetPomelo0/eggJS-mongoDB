
// router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/hello', HomeController.home.index);
};
