/** *
 * 初始化测试用户
 * @param User
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

