/***
 * 初始化测试用户
 */
function initUserData(User) {
  User.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      console.log('init user failed');
    } else if (!doc.length) {
    }
  });
}

