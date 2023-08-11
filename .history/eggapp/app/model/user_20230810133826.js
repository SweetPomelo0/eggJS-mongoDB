// model -> user.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // 导入计数器模型
  const Counter = require('./counter');

  // 数据库字段
  const UserSchema = new Schema({
    // _id: { type: Number }, // 指定 _id 字段为 Number 类型
    userId: { type: Number, unique: true }, // 自增 ID 存储在 userId 字段
    email: {
      type: String,
    },
    password: {
      type: String,
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
  });

  // 在保存用户之前获取下一个自增 ID 值
  UserSchema.pre('save', async next => {
    const doc = this;

    try {
      // 查找并更新计数器
      const counter = Counter.findByIdAndUpdate(
        { _id: 'userId' }, // 根据需要自行设置一个唯一的 ID
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );

      doc.userId = counter.sequence_value;
      next();
      console.log(doc.userId);
      console.log('Counter:', counter);
    } catch (error) {
      return next(error);
    }
  });
  // 映射到egg-mongo db 库的users表中（不区分大小写）
  const User = mongoose.model('User', UserSchema, 'user');

  // init方法放到这里
  // initUserData(User);

  return User;
};
// /**
//  * 初始化一个测试用户
//  * @param User
//  */
// function initUserData(User) {
//   User.find({}, (err, doc) => {
//     if (err) {
//       console.log(err);
//       console.log('init user failed');
//     } else if (!doc.length) {
//       new User({
//         email: 'test@qq.com',
//         password: '3334',
//         registrationDate: Date.now(),
//         role: 'admin',
//         is_deleted: 1,
//       }).save();
//     } else {
//       console.log('-------------init user successfully--------------');
//     }
//   });
// }

