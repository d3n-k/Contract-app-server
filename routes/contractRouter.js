const Router = require('express');
const router = new Router();
const contractController = require('../controllers/contractController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', contractController.create);
router.post('/find', checkRole('ADMIN'), contractController.getAll);
router.delete('/:id', checkRole('ADMIN'), contractController.delete);
router.put('/:id', checkRole('ADMIN'), contractController.update);
router.get('/:id', contractController.getOne);
router.delete('/delete/:courseId', checkRole('ADMIN'), contractController.deleteAll);


module.exports = router;