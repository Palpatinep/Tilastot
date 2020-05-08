const express = require("express");
const router = express.Router();


router.get("/", async (req, res) =>
{
    res.render("biljardiview/index");

});


module.exports = router;