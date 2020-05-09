const express = require("express");
const router = express.Router();
const Pelaaja = require("../models/pelaaja");

router.get("/", async (req, res) =>
{
    let searchOptions = {};
    searchOptions.playerName = new RegExp(req.query.playerName, "i");

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
        playerName: req.body.pelaajaname
    });

    try
    {
        const newPelaajaSubmit = await newPelaaja.save();
        console.log("New player created");
        res.redirect("/fifa");
    }
    catch
    {
        res.render("/biljardi");
        errorMessage: "Virheellinen syöte"
    }
    
});

module.exports = router;