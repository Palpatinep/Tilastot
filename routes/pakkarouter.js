const express = require("express");
const router = express.Router();

router.get("/", async (req, res) =>
{
    res.render("pakkaview/index");
});

module.exports = router;