const Router = require('express');
const router = new Router();
const docFile1Controller = require('../controllers/docFile1Controller');

router.post('/', docFile1Controller.create);
router.get('/', docFile1Controller.getAll);
router.delete('/:id', docFile1Controller.delete);


module.exports = router;