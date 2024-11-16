const express = require("express");
const router = express.Router();
const {
    allusers,
    userform,
    saveuser,
    editUser,
    updateUser,
    viewUser,
    deleteUser
} = require("../controller/usercontroller");

// Route to display all users
router.get("/", allusers);

router.get("/create", userform);

router.post("/create", saveuser);

router.get("/edit/:id", editUser);

router.post("/update/:id", updateUser);

router.get("/user/:id", viewUser);

router.get("/delete/:id",  deleteUser);

module.exports = router;
