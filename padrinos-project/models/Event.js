// Event Model

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EventSchema = Schema({
  owner:    Schema.Types.ObjectId, //idUser
  category: String,
  date:     {
    type:Date,
    default: new Date()
  }
  // guests:  [idUsers],
  // administradores:[idUsers],
  // location: [latitude, longitude]
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;