// Item Model

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ItemSchema = Schema({
  itemName: String,
  quantity: Number,
  eventId: String,
  padrino: String //userId
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;

