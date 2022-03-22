const Model = require('../models/file');
const multer = require('multer');
const fs = require('fs');
const path = "public/uploads";

class Controller {

    constructor() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path);
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            }
        });
        this.upload = multer({ storage });
    }

    getAll(req, res, next) {
        Model.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
    get(req, res, next) {
        let { id } = req.params;
        Model.findOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    post(req, res, next) {
        console.log("****", JSON.stringify(req.body))
        let { filename: name, mimetype: type } = req.file || {};
        //get the extension from the end of the filename (after last '.'),
        // if the name doesn't exist then it's = ''
        let extension = name ? name.split('.').pop() : '';
        //create new model and save it
        let doc = new Model({ name, type, extension, destination: 'uploads' });
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        Model.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) return next(err);
            fs.unlink(`${path}/${response?.name}`, (err) => {
                if (err) return next(err);
                res.status(200).send({ success: true, response });
            });
        });
    }

}

const controller = new Controller();
module.exports = controller;