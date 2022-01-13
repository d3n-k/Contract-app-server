const Router = require('express');
const router = new Router();
const allCourseController = require('../controllers/allCourseController');

router.get('/', allCourseController.getAllWithoutLimit);


module.exports = router;