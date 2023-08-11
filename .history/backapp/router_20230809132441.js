const HomeController = require('./controller/home ');

// router.js
module.exports = app => {
  const { router } = app;
  router.get('/hello', HomeController.home.index);
};
