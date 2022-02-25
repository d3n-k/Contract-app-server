const Router = require('express');
const router = new Router();
const docFile3Controller = require('../controllers/docFile3Controller');

router.post('/', docFile3Controller.create);
router.get('/', docFile3Controller.getAll);
router.delete('/:id', docFile3Controller.delete);


module.exports = router;