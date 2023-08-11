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
 */
function initUserData(User) {}

