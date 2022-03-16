const Router = require('express');
const router = new Router();
const napravFile2Controller = require('../controllers/napravFile2Controller');

router.post('/', napravFile2Controller.create);
router.get('/', napravFile2Controller.getAll);
router.delete('/:id', napravFile2Controller.delete);


module.exports = router;