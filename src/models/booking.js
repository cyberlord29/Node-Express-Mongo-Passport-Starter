import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  facility : {type:String, required:true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startTime: mongoose.Schema.Types.Date,
  endTime: mongoose.Schema.Types.Date,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;