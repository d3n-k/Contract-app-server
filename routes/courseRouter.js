const Router = require('express');
const router = new Router();
const courseController = require('../controllers/courseController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), courseController.create);
router.get('/', courseController.getAll);
router.delete('/:id', checkRole('ADMIN'), courseController.delete);
router.put('/:id', checkRole('ADMIN'), courseController.update);
router.get('/:id', courseController.getOne);
router.get('/num/:number', courseController.getByNumber);


module.exports = router;