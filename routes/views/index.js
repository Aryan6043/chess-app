const {Router} = require("express");
const { getLoginPage, getRegisterPage } = require("../../controllers/views");

const router = Router()

router.get("/register", getRegisterPage)

router.get("/login", getLoginPage)

module.exports = router;