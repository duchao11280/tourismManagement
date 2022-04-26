const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const serviceController = require('../controllers/service_controller');
//get service by placeID
router.post('/:id',[verifyToken.verifyToken], serviceController.getAllServiceAndImagesByPlaceIDAndTypeService);

    
module.exports = router;