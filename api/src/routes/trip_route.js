const express = require('express');
const router = express.Router();


const verifyToken = require('../middleware/verifyToken');
const tripController = require('../controllers/trip_controller')
// get trip by city
router.post('/getbycity', [verifyToken.verifyToken], tripController.getTripEnableByCity)

router.get('/getdetailbyid/:id', [verifyToken.verifyToken], tripController.getTripDetailById)

module.exports = router;