const Router = require('express');
const router = new Router();
const napravFile1Controller = require('../controllers/napravFile1Controller');

router.post('/', napravFile1Controller.create);
router.get('/', napravFile1Controller.getAll);
router.delete('/:id', napravFile1Controller.delete);


module.exports = router;