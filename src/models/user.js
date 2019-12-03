import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  name: { type: String },
  createdDate: { type: Date, default: Date.now }
});

userSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({
    username: login,
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

userSchema.pre('remove', function(next) {
  this.model('Booking').deleteMany({ user: this._id }, next);
});

userSchema.statics.authenticate = async function({ username, password }) {
  const user = await User.findOne({ username:username });
  console.log('hey',username)
  if (user && bcrypt.compareSync(password, user.hash)) {
      const { hash, ...userWithoutHash } = user.toObject();
      const token = jwt.sign({ sub: user.username }, process.env.secret);
      return {
          ...userWithoutHash,
          token
      };
  }
}

userSchema.statics.create = async function(userParam){
  if (await User.findOne({ username: userParam.username })) {
    console.log('throw')
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  if (userParam.password) {
      user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  let newUser = await user.save();
  return newUser
}

userSchema.statics.getById = async function getById(id) {
  return await User.find({username:id}).select('-hash');
}

const User = mongoose.model('User', userSchema);

export default User;