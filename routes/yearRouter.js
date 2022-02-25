const Router = require('express');
const router = new Router();
const yearController = require('../controllers/yearController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', yearController.create );
router.get('/', yearController.getAll );
router.put('/:id', checkRole('ADMIN'), yearController.update );


module.exports = router;