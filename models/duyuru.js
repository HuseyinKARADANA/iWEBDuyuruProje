const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const urunSchema = new Schema({
  duyuru_Adi: {
    type: String,
    required: true,
  },
  duyuru: {
    type: String,
    required: true,
  },
  baslangicTarihi: {
    type: Date,
    required: true,
  },
  bitisTarihi: {
    type: Date,
    required: true,
  },
});

module.exports=mongoose.model('Duyuru', urunSchema);