// model -> user.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 数据库字段
  const UserSchema = new Schema(
    {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: String,
    },
    is_deleted: {
      type: Number,
    },
    }{
      versionKey:false
    }
  );
  // 映射到egg-mongo db 库的users表中（不区分大小写）
  const User = mongoose.model('User', UserSchema, 'user');

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
        email: 'test@qq.com',
        password: '3334',
        registrationDate: '2021',
        role: 'admin',
        is_deleted: 1,
      }).save();
    } else {
      console.log('-------------init user successfully--------------');
    }
  });
}

