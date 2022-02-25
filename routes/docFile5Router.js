const Router = require('express');
const router = new Router();
const docFile5Controller = require('../controllers/docFile5Controller');

router.post('/', docFile5Controller.create);
router.get('/', docFile5Controller.getAll);
router.delete('/:id', docFile5Controller.delete);


module.exports = router;