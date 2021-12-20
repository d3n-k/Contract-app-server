const Router = require('express');
const router = new Router();
const customerController = require('../controllers/customerController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), customerController.create);
router.get('/', customerController.getAll);
router.delete('/:id', checkRole('ADMIN'), customerController.delete);
router.put('/:id', checkRole('ADMIN'), customerController.update)
router.get('/:id', customerController.getOne);


module.exports = router;