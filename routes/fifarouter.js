const express = require("express");
const router = express.Router();
const Fifa = require("../models/fifa");
const Pelaaja = require("../models/pelaaja");

router.get("/", async (req, res) =>
{
    const pelaajat = await Pelaaja.find( { }, {_id: 0, playerName: 1});
    let searchOptions = {};
    if (req.query.resultHome != null && req.query.resultAway != null && req.query.resultHome !== '' && req.query.resultAway !== '')
    {
        searchOptions.resultHome = new RegExp(req.query.resultHome, 'i')
        searchOptions.resultAway = new RegExp(req.query.resultAway, 'i')
        searchOptions.pelaajaHome = new new RegExp(req.query.pelaajaHome, 'i')
        searchOptions.pelaajaAway = new new RegExp(req.query.pelaajaAway, 'i')
    };
    try
    {
        const fifaResults = await Fifa.find(searchOptions);
        res.render("fifaview/index", 
        {
            pelaaja: pelaajat,
            fifaResults: fifaResults,
            searchOptions: req.query
        });
    }
    catch
    {
        res.redirect("/");
    }
    res.render("fifaview/index");

});

router.post("/", async (req, res) =>
{
    const fifaResult = new Fifa(
        {
            resultHome: req.body.fifaresulthome,
            resultAway: req.body.fifaresultaway,
            pelaajaHome: req.body.pelaajahome,
            pelaajaAway: req.body.pelaajaaway
        }
    );
    try
    {
        const newFifaResult = await fifaResult.save();
        console.log("Success");
        res.redirect("/fifa");
    }
    catch
    {
        res.render("/biljardi");
        errorMessage: "Virheellinen syöte"
    }
});


module.exports = router;