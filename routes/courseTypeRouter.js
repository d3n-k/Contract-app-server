const Router = require('express');
const router = new Router();
const courseTypeController = require('../controllers/courseTypeController');
//const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', courseTypeController.getAll);
router.get('/:id', courseTypeController.getOne);


module.exports = router;