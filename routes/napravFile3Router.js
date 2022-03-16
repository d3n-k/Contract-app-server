const Router = require('express');
const router = new Router();
const napravFile3Controller = require('../controllers/napravFile3Controller');

router.post('/', napravFile3Controller.create);
router.get('/', napravFile3Controller.getAll);
router.delete('/:id', napravFile3Controller.delete);


module.exports = router;