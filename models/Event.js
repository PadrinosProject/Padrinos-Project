const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = Schema({  
  owner: Schema.Types.ObjectId,
  name: String,
  category: String,
  date: {
    type:Date,
    default: new Date()
  }, 
  photo: String,
  description: String,
  guests: [],
  items: []
  }, {
  timestamps: { 
    createdAt: "created_at",
    updatedAt: "updated_at" 
  }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
