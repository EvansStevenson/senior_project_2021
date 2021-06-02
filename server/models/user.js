const mongoos = require("mongoose");
const Schema = mongoos.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    progress: [{ type: Schema.Types.ObjectId, ref: 'Levels' }],
  });
  
  module.exports = mongoose.model('User', userSchema);