// Guest Model

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const GuestSchema = Schema({
  guestName: String,
  guestEmail: String,
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  padrino: Boolean,
  padrinoItem: { type: Schema.Types.ObjectId, ref: 'Item' }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);

const Guest = mongoose.model('Guest', GuestSchema);

module.exports = Guest;