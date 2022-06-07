const express = require('express');
const router = express.Router();


const checkRole = require('../middleware/checkRole');
const verifyToken = require('../middleware/verifyToken');
const commentController = require('../controllers/comment_controller')
const checkDelete = require('../middleware/checkDeleteComment')
// Comment getAll comment by place id
router.get('/placeid=:id', [verifyToken.verifyToken], commentController.getAllCommentByPlaceID)

// Insert Comment
router.post('/', [verifyToken.verifyToken], commentController.insertComment)

// user delete comment
router.delete('/:id', [verifyToken.verifyToken, checkDelete.checkDelete], commentController.deleteComment)

// admin delete comment
router.delete('/deletecomment/:id', [verifyToken.verifyToken], commentController.deleteComment)

module.exports = router;