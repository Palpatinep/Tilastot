const express = require("express");
const router = express.Router();
const Pelaaja = require("../models/pelaaja");

router.get("/", async (req, res) =>
{
    let searchOptions = {};
    
    const pelaajat = await Pelaaja.find(searchOptions);

     
    res.render("pelaajaview/index", 
    {
        pelaajat: pelaajat,
        searchOptions: req.query
    });
});


router.post("/", async (req, res) =>
{

    const newPelaaja = new Pelaaja(
    {
        playerName: req.body.pelaajaname,
        fifaWins: 0,
        fifaLosses: 0,
        fifaDraws: 0
    });

    try
    {
        await newPelaaja.save();
        console.log("New player created");
        res.redirect("/pelaaja");
    }
    catch
    {
        res.render("/biljardi");
        errorMessage: "Virheellinen syöte"
    }
    
});

module.exports = router;