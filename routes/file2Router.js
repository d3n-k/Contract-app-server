const Router = require('express');
const router = new Router();
const file2Controller = require('../controllers/file2Controller');

router.post('/', file2Controller.create);
router.get('/', file2Controller.getAll);
router.delete('/:id', file2Controller.delete);


module.exports = router;