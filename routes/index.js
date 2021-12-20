const Router = require('express');
const router = new Router();
const adminRouter = require('./adminRouter');
const cathedraRouter = require('./cathedraRouter');
const courseRouter = require('./courseRouter');
const customerRouter = require('./customerRouter');
const userRouter = require('./userRouter');
const announceRouter = require('./announceRouter');
const fileRouter = require('./fileRouter');
const file2Router = require('./file2Router');
const file3Router = require('./file3Router');

router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/cathedra', cathedraRouter);
router.use('/course', courseRouter);
router.use('/customer', customerRouter);
router.use('/announce', announceRouter);
router.use('/files', fileRouter);
router.use('/files2', file2Router);
router.use('/files3', file3Router);



module.exports = router;