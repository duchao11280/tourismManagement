const express = require('express');
const router = express.Router();

const placeController = require('../controllers/place_controller');

const checkRole = require('../middleware/checkRole');
const verifyToken = require('../middleware/verifyToken');


//search place by city
router.post('/', [verifyToken.verifyToken], placeController.getAllPlaceAndImagesByCity);
// get place id and name
router.get('/idandname', [verifyToken.verifyToken], placeController.getAllPlaceIDandName)

router.get('/imgservice', [verifyToken.verifyToken], placeController.getImageService)

module.exports = router;