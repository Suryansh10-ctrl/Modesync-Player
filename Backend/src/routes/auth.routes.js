const {Router} = require('express');
const router = Router();
const authcontroller = require('../controller/auth.controller');
const authUser = require('../middleware/auth.middleware');



router.post('/register', authcontroller.registerController);
router.post("/login", authcontroller.loginController)
router.get("/get-me", authUser, authcontroller.getMecontroller)
router.post("/logout", authcontroller.logoutController)




module.exports = router;