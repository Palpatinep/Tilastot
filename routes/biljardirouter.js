const express = require("express");
const router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Pelaaja = require("../models/pelaaja");

router.get("/", async (req, res) =>
{
    const pelaajat = await Pelaaja.find({});

    res.render("biljardiview/index", 
        {
            pelaaja: pelaajat,
        });
});


router.get("/Arza", async (req, res) =>
{
    let searchOptionsPelaaja = {playerName: "Arza"};

    const pelaajat = await Pelaaja.find(searchOptionsPelaaja).exec()
    .then(doc => 
        {
            console.log(doc)
            res.status(200).json(doc);
        });

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA")
    res.redirect("/biljardi");

    


});





module.exports = router;