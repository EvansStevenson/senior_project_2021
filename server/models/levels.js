const mongoos = require("mongoose");
const Schema = mongoos.Schema;

const levelSchema = new Schema({
    caesarLevels: { type: Array, required: true },
    playfairLevels: { type: Array, required: true },
    columnarLevels: { type: Array, required: true },
    railFenceLevels: { type: Array, required: true },
    vigenereLevels: {type: Array, required: true },
    fourSquareLevels: {type: Array, required: true },
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  });
  
  module.exports = mongoose.model('Levels', levelSchema);