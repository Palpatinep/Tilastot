const express = require("express");
const router = express.Router();
const Fifa = require("../models/fifa");
const Pelaaja = require("../models/pelaaja");

router.get("/", async (req, res) =>
{
    
    let searchOptionsFifa = {};
    let searchOptionsPelaaja = {};

    searchOptionsPelaaja.playerName = new RegExp(req.query.playerName, "i");

    if (req.query.resultHome != null && req.query.resultAway != null && req.query.resultHome !== '' && req.query.resultAway !== '')
    {
        searchOptionsFifa.resultHome = new RegExp(req.query.resultHome, 'i')
        searchOptionsFifa.resultAway = new RegExp(req.query.resultAway, 'i')
        searchOptionsFifa.pelaajaHome = new RegExp(req.query.pelaajaHome, 'i')
        searchOptionsFifa.pelaajaAway = new RegExp(req.query.pelaajaAway, 'i')
        searchOptionsFifa.winner = new RegExp(req.query.winner, 'i')
        searchOptionsFifa.loser = new RegExp(req.query.loser, 'i')
    };

    const pelaajat = await Pelaaja.find(searchOptionsPelaaja);
    

    try
    {
        const fifaResults = await Fifa.find(searchOptionsFifa);

        res.render("fifaview/index", 
        {
            pelaaja: pelaajat,
            fifaResults: fifaResults,
            searchOptionsFifa: req.query
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
    var WinnerPlayer = "";
    var LoserPlayer = "";
    var lumierat = false;
    var asd = 3;
    var asdasdasd;

    if(req.body.fifaresulthome > req.body.fifaresultaway)
    {
        WinnerPlayer = req.body.pelaajahome;
        LoserPlayer = req.body.pelaajaaway;
        console.log("Voittaja");
    }
    else if(req.body.fifaresulthome < req.body.fifaresultaway)
    {
        WinnerPlayer = req.body.pelaajaaway;
        LoserPlayer = req.body.pelaajahome;
        console.log("Häviäjä");
    }
    else
    {
        WinnerPlayer = "draw";
        LoserPlayer = "draw";
        console.log("Tasapeli");
    }

    if(parseInt(req.body.fifaresulthome) > parseInt(req.body.fifaresultaway) + 2 || parseInt(req.body.fifaresulthome) + 2 < parseInt(req.body.fifaresultaway))
    {
        lumierat = true;
    }

    console.log(req.body.fifaresultaway)

    const fifaResult = new Fifa(
        {
            resultHome: req.body.fifaresulthome,
            resultAway: req.body.fifaresultaway,
            pelaajaHome: req.body.pelaajahome,
            pelaajaAway: req.body.pelaajaaway,
            winner: WinnerPlayer,
            loser: LoserPlayer,
            lumierat: lumierat
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
        console.log("Virheellinen syöte");
    }
});


module.exports = router;