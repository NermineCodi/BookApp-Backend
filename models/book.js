const { Schema, model } = require('mongoose');
const ModelSchema = new Schema({
   title: {
       type: String,
       required: true
   },
   description: String,
   amazonProductUrl: String,
   author: {
       type: Schema.Types.ObjectId,
       ref: 'Author'
   },
   category: [{
       type: Schema.Types.ObjectId,
       ref: 'Category'
   }],
   image: {
       type: Schema.Types.ObjectId,
       ref: 'File'
   },
   isDeleted: {
       type: Boolean,
       default: false
   }
}, {
   collection: 'books',
   timestamps: true
});


ModelSchema.pre(['find', 'findOne'], function () {
  this.populate(['author', 'category', 'image']);
});

const Model = model('Book', ModelSchema);
module.exports = Model;