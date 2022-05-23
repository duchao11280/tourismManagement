const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const serviceController = require('../controllers/service_controller');
//get service by placeID
router.post('/:id', [verifyToken.verifyToken], serviceController.getAllServiceAndImagesByPlaceIDAndTypeService);

//get all services 
router.post('/hotel/searchbycity', [verifyToken.verifyToken], serviceController.getHotelByCity);
// router.post('/', [verifyToken.verifyToken], placeController.getAllPlaceAndImagesByCity);
router.post('/otherservices/searchbycity', [verifyToken.verifyToken], serviceController.getServicesByCity);
// router.post('/otherservices/', [verifyToken.verifyToken], serviceController.getOtherServicesByCity);

// search around
router.get('/searchwithinradius/:latitude/:longitude/:distance', [verifyToken.verifyToken], serviceController.searchServicesWithinRadiusWithLatLong)

module.exports = router;