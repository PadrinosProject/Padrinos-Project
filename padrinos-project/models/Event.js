// Event Model

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EventSchema = Schema({
  owner:    String, //idUser
  category: String,
  date:     Number,
  //guests:  [idUsers],
  //administradores:[idUsers],
  //location: [latitude, longitude]
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;