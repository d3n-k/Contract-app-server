const Router = require('express');
const router = new Router();
const adminController = require('../controllers/adminController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), adminController.create);
router.get('/', adminController.getAll);
router.delete('/:id', checkRole('ADMIN'), adminController.delete);


module.exports = router;