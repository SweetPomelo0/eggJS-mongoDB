// counter.js
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CounterSchema = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 },
  });

  module.exports = mongoose.model('Counter', CounterSchema);
};

