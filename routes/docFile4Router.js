const Router = require('express');
const router = new Router();
const docFile4Controller = require('../controllers/docFile4Controller');

router.post('/', docFile4Controller.create);
router.get('/', docFile4Controller.getAll);
router.delete('/:id', docFile4Controller.delete);


module.exports = router;