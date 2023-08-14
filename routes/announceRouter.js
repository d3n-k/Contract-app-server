const Router = require('express');
const router = new Router();
const announceController = require('../controllers/announceController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', announceController.create);
router.get('/', announceController.getAll);
router.put('/:id', checkRole('ADMIN'), announceController.update );


module.exports = router;