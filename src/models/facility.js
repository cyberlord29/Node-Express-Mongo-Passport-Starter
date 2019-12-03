import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Facility = mongoose.model('facility', facilitySchema);

export default Facility;
