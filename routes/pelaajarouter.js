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
    res.redirect("/pelaaja");



});


router.get("/Panu", async (req, res) =>
{
    let searchOptionsPelaaja = {playerName: "Panu"};

    const pelaajat = await Pelaaja.find(searchOptionsPelaaja).exec()
    .then(doc => 
        {
            console.log(doc)
            res.status(200).json(doc);
        });

    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
    res.redirect("/pelaaja");



});

module.exports = router;