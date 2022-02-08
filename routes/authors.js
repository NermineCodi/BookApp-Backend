var express = require('express');
var router = express.Router();
var controller = require('../controllers/author');

//get all the authors
router.get('/', controller.getAll )

//get an author by id
router.get('/:id', controller.get)
 
 // creating new author
 router.post('/', controller.post)
 
//update an author by _id
router.put('/:id', controller.put)
 
//delete an author by id
 router.delete('/:id', controller.delete)


module.exports = router;

