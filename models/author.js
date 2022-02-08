const { Schema, model } = require('mongoose');

const ModelSchema = new Schema({
   firstName: {
       type: String,
       required: true
   },
   lastName: {
       type: String,
       required: true
   }
}, {
   collection: 'authors'
});

const Model = model('Author', ModelSchema);
module.exports = Model;