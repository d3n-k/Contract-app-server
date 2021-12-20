const Router = require('express');
const router = new Router();
const file3Controller = require('../controllers/file3Controller');

router.post('/', file3Controller.create);
router.get('/', file3Controller.getAll);
router.delete('/:id', file3Controller.delete);


module.exports = router;