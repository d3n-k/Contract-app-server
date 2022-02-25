const Router = require('express');
const router = new Router();
const docFile2Controller = require('../controllers/docFile2Controller');

router.post('/', docFile2Controller.create);
router.get('/', docFile2Controller.getAll);
router.delete('/:id', docFile2Controller.delete);


module.exports = router;