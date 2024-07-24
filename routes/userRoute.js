const express = require('express');
const { loginContoller, registerContoller } = require('../controllers/userController');
// router obj
const router = express.Router();
//routers
//POST router || LOGIN USER
router.post('/login', loginContoller)

// POST || REGISTER USER
router.post('/register', registerContoller)


module.exports = router;