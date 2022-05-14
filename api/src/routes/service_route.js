const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const serviceController = require('../controllers/service_controller');
//get service by placeID
router.post('/:id', [verifyToken.verifyToken], serviceController.getAllServiceAndImagesByPlaceIDAndTypeService);

//get all services 
router.get('/services/1', [verifyToken.verifyToken], serviceController.getAllHotel);


router.get('/services/2', [verifyToken.verifyToken], serviceController.getAllOtherServices);

// search around
router.get('/searchwithinradius/:latitude/:longitude/:distance', [verifyToken.verifyToken], serviceController.searchServicesWithinRadiusWithLatLong)

module.exports = router;