// Event Model

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EventSchema = Schema({
  owner: Schema.Types.ObjectId,
  name: String,
  category: String,
  date:     {
    type:Date,
    default: new Date()
  },
  //location: [latitude, longitude],
  photo: String,
  description: String,
  guests: [],
  items: Schema.Types.ObjectId
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;