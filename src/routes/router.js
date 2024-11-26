
const express = require("express");
const getAllUsers = require("../services/service");
const  router = express.Router();

const validateUser = require("../middlewares/authvalidation");

router.get("/", (req, res) => {
    res.send("Welcome to the API").status(200)
});

router.post("/signup", validateUser, getAllUsers().userSignUp);
router.post("/signin", validateUser, getAllUsers().signUserIn);

router.get("/allUsers",validateUser, getAllUsers().alloftheusers);

module.exports = router;