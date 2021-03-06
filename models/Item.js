// Item Model

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ItemSchema = Schema({
  itemName: String,
  quantity: Number,
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  padrino: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;

