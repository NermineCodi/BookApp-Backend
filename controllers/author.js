const Model = require('../models/author');

class Controller {
// callback functions used in author routes
//get all the authors
getAll (req, res, next) {
  Model.find({}, (err, response) =>{
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  })
    
}

//get an author by id
get(req, res, next) {
  let { id } = req.params;
  Model.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
  });
}

  // creating new author
post(req, res, next) {
  let body = req.body;
  let doc = new Model(body);
  doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
  });
}

//update an author by _id
put(req, res, next) {
  let { id } = req.params;let body = req.body;
  Model.updateOne({ _id: id }, {
      $set: body}, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
  });
}


//delete an author by id
 delete(req, res, next) {
  let { id } = req.params;
  Model.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
  })
}


}

const controller = new Controller();
module.exports = controller;
