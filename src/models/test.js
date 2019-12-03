import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: { type: String , required: true},
  status: { type: String  , required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String , required: true },
});

const Test = mongoose.model('Test', testSchema);

export default Test;
