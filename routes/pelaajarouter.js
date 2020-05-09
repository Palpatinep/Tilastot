const express = require("express");
const router = express.Router();
const Pelaaja = require("../models/pelaaja");

router.get("/", async (req, res) =>
{
    res.render("pelaajaview/index");

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
        res.redirect("/biljardi");
    }
    catch
    {
        res.render("/biljardi");
        errorMessage: "Virheellinen syöte"
    }
    
});

module.exports = router;