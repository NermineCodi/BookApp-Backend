const { Schema, model } = require('mongoose');

const ModelSchema = new Schema({
   name: {
       type: String,
       required: true
   },
   slug: {
       type: String,
       required: true
   }
}, {
   collection: 'categories',
   toJSON: { virtuals: true },
   toObject: { virtuals: true }
});

ModelSchema.virtual('books', {
    ref: 'Book', //Model to populate from 
    localField: '_id', // field in Current Model = Category
    foreignField: 'category' // field in Book Model
})
  


const Model = model('Category', ModelSchema);
module.exports = Model;



