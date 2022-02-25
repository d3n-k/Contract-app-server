const Router = require('express');
const router = new Router();
const journalController = require('../controllers/journalController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', journalController.create);
router.post('/find', checkRole('ADMIN'), journalController.getAll);
router.delete('/delete/:courseId', checkRole('ADMIN'), journalController.deleteAll);


module.exports = router;