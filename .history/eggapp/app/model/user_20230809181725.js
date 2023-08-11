// model -> user.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 数据库字段
  const UserSchema = new Schema({
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    registrationDate: {
      type: Date,
    },
    role: {
      type: String,
    },
    is_deleted: {
      type: Boolean,
    },
  });
  // 映射到egg-mongo db 库的users表中（不区分大小写）
  const User = mongoose.model('Users', UserSchema);

  // init方法放到这里
  initUserData(User);

  return User;
};
/**
 * 初始化一个测试用户
 * @param User
 */
function initUserData(User) {
  User.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      console.log('init user failed');
    } else if (!doc.length) {
      new User({
        name: 'UserInitName',
        age: 23,
        sex: 'girl',
        job: '程序媛',
        lastTime: Date.now(),
      }).save();
    } else {
      console.log('-------------init user successfully--------------');
    }
  });
}

