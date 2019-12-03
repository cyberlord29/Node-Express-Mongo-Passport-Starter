import mongoose from 'mongoose';

import User from './user';
import Booking from './booking';
import Facility from './facility';


const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Booking , Facility};

export { connectDb };

export default models;
