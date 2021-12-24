const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', userController.registration);
router.get('/auth', authMiddleware, userController.check);
router.delete('/:id', userController.delete);
router.get('/', userController.getAll);

module.exports = router;