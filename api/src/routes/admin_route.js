const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');
const notificationController = require('../controllers/notification_controller')
const commentController = require('../controllers/comment_controller')

const uploadImage = require('../middleware/uploadImage');
const checkRole = require('../middleware/checkRole');
const verifyToken = require('../middleware/verifyToken');
const feedbackController = require('../controllers/feedback_controller')

//======================Place=====================//
//insert place
router.post('/place', [verifyToken.verifyToken, checkRole.isAdmin], uploadImage.array('placeImgs'), adminController.insertPlace)
/**
 * update info place with place id
 * @param id
 */
router.put('/place/update/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.updateInfoPlace)

/**
 * Disalbe place
 * param id
 */
router.put('/place/delete/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.deletePlace)
// enable place
router.put('/place/enable/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.enablePlace)

// get All Place
router.get('/places', [verifyToken.verifyToken, checkRole.isAdmin], adminController.getAllPlaces);
// get places by city
router.post('/places/bycity', [verifyToken.verifyToken], adminController.searchAllPlaceByCity)
// get place info and image by place id
router.get("/place/:id", [verifyToken.verifyToken, checkRole.isAdmin], adminController.getPlaceAndImageByPlaceID);
// get image by place id
router.get("/place/images/:id", [verifyToken.verifyToken, checkRole.isAdmin], adminController.getImageByPlaceID);

//upload image places
router.post('/place/image/upload/:id', [verifyToken.verifyToken, checkRole.isAdmin], uploadImage.array("files"), adminController.uploadImagePlace)

/**
 * Disalbe image
 * param id
 */
router.put('/place/image/delete/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.deleteImage)

//======================User=====================//

//get all user
router.get('/users', [verifyToken.verifyToken, checkRole.isAdmin], adminController.getAllUsers);

// disable User
router.put('/disableuser/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.disableUser);
// enable user
router.put('/enableuser/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.enableUser);
//======================Notification=====================//
router.post('/notification/addnew', [verifyToken.verifyToken, checkRole.isAdmin], adminController.addNotification)

router.put('/notification/update/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.updateNotification)

router.delete('/notification/delete/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.deleteNotification)

router.get('/notification', [verifyToken.verifyToken, checkRole.isAdmin], notificationController.getAllNotification)

// ====================Comment=================//
// Comment getALl
router.get('/comment/placeid=:id', [verifyToken.verifyToken, checkRole.isAdmin], commentController.getAllCommentByPlaceID)


//delete comment
router.delete('/comment/:id', [verifyToken.verifyToken, checkRole.isAdmin], commentController.deleteComment)

router.get('/feedback',
    [verifyToken.verifyToken, checkRole.isAdmin],
    feedbackController.adminGetAllFeedback)

//======================Services=====================//
// Get all services
router.get('/services', [verifyToken.verifyToken, checkRole.isAdmin], adminController.getAllServices);
// get service by service id
router.get('/service/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.getServiceAndImageByServiceID)
// Update service by id
router.put('/service/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.updateInfoService)

// disable service
router.put('/service/disable/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.disableService)

// enable service
router.put('/service/enable/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.enableService)

//insert service
router.post('/service', [verifyToken.verifyToken, checkRole.isAdmin], uploadImage.array('files'), adminController.insertService)
//upload image service
router.post('/service/image/upload/:id', [verifyToken.verifyToken, checkRole.isAdmin], uploadImage.array("files"), adminController.uploadImageService)


router.get('/typeservice', [verifyToken.verifyToken, checkRole.isAdmin], adminController.getAllTypeService);

//======================Trip=====================//
// Get ALL trip
router.get('/trip', [verifyToken.verifyToken, checkRole.isAdmin], adminController.getAllTrip);

// disable trip
router.put('/trip/disable/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.disableTrip)

// enable trip
router.put('/trip/enable/:id', [verifyToken.verifyToken, checkRole.isAdmin], adminController.enableTrip)

module.exports = router;