const Model = require('../models/category');

class Controller {

  getTreeWithAggregate(req, res, next) {
    Model.aggregate([
        {
            $lookup: {
                from: 'books',
                as: 'bookssss',
                let: { "catId": "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ["$$catId", "$category"]
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: 'authors',
                            localField: 'author',
                            foreignField: '_id',
                            as: 'author'
                        }
                    },
                    {
                        $addFields: {
                            "author": {
                                $arrayElemAt: ["$author", 0]
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: 'categories',
                            localField: 'category',
                            foreignField: '_id',
                            as: 'category'
                        }
                    },
                    {
                        $lookup: {
                            from: 'files',
                            localField: 'image',
                            foreignField: '_id',
                            as: 'image'
                        }
                    }
                    ,
                    {
                        $addFields: {
                            "image": {
                                $arrayElemAt: ["$image", 0]
                            }
                        }
                    }
                ]
            }
        }
    ], (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
}

  getTree(req, res, next) {
    Model.find({}).populate('books').exec((err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
}

  getAll(req, res, next) {
    Model.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  get(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id }).populate('books').exec((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  post(req, res, next) {
    let body = req.body;
    let doc = new Model(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  
  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Model.updateOne({ _id: id }, {
      $set: body
    }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

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