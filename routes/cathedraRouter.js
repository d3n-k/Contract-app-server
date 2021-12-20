const Router = require('express');
const router = new Router();
const cathedraController = require('../controllers/cathedraController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), cathedraController.create);
router.get('/', cathedraController.getAll);
router.delete('/:id', checkRole('ADMIN'), cathedraController.delete);
router.put('/:id', checkRole('ADMIN'), cathedraController.update);
router.get('/:id', cathedraController.getOne);


module.exports = router;