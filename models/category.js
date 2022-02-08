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
   collection: 'categories'
});
const Model = model('Category', ModelSchema);
module.exports = Model;



