const express = require("express");
const router = express.Router();
const UserAuth = require("../middlewares/userAuth");

const UserController = require("../controllers/UserController");

router.get("/:email", UserController.findUser);
router.post("/login", UserController.login);
router.post("/register", UserController.createUser);
router.post("/recoverpassword", UserController.recoverPassword);
router.post("/validaterecovercode", UserController.validateRecoverCode);
router.post("/validate", UserAuth, UserController.validate);
router.patch("/changepassword", UserController.changePassword);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
