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
    
    var errorMessage = "";
    try
    {
        const fifaResults = await Fifa.find(searchOptionsFifa);

        res.render("fifaview/index", 
        {
            errorMessage: errorMessage,
            pelaaja: pelaajat,
            fifaResults: fifaResults,
            searchOptionsFifa: req.query
        });
    }
    catch
    {
        res.redirect("/");
    }
});

router.post("/", async (req, res) =>
{
    var WinnerPlayer = "";
    var LoserPlayer = "";
    var DrawnPlayer1 = "";
    var DrawnPlayer2 = "";
    var lumierat = false;

    if(req.body.pelaajahome == req.body.pelaajaaway)
    {
        const pelaajat = await Pelaaja.find({});
        const fifaResults = await Fifa.find({});
        var errorMessage = "Et voi pelata itseäsi vastaan, yritä uudestaan";
        
        res.render("fifaview/index",
        {
            fifaResults: fifaResults,
            pelaaja: pelaajat,
            errorMessage: errorMessage
        })
    }

    else
    {

        if(req.body.fifaresulthome != req.body.fifaresultaway)
        {
            if (req.body.fifaresulthome > req.body.fifaresultaway)
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

            var playerquerywinner = { playerName: WinnerPlayer};
            var playerqueryloser = { playerName: LoserPlayer};

            const pelaajawinner = await Pelaaja.find(playerquerywinner)
            const pelaajaloser = await Pelaaja.find(playerqueryloser)

            var newWinPercwinner = (pelaajawinner[0].fifaWins + 1) / (pelaajawinner[0].fifaWins + pelaajawinner[0].fifaLosses + pelaajawinner[0].fifaDraws + 1)
            var newWinPercloser = pelaajaloser[0].fifaWins / (pelaajaloser[0].fifaWins + pelaajaloser[0].fifaLosses + pelaajaloser[0].fifaDraws + 1)

            await Pelaaja.updateOne(playerquerywinner, {$inc: {fifaWins: 1}, $set: {fifaWinPerc: newWinPercwinner}});
            await Pelaaja.updateOne(playerqueryloser, {$inc: {fifaLosses: 1}, $set: {fifaWinPerc: newWinPercloser}});
        }

        else
        {
            DrawnPlayer1 = req.body.pelaajahome;
            DrawnPlayer2 = req.body.pelaajaaway;
            console.log("Tasapeli");

            var playerquerydraw1 = { playerName: DrawnPlayer1};
            var playerquerydraw2 = { playerName: DrawnPlayer2};

            const pelaajadrawnhome = await Pelaaja.find(playerquerydraw1)
            const pelaajadrawnaway = await Pelaaja.find(playerquerydraw2)

            var newWinPercwinner = pelaajadrawnhome[0].fifaWins / (pelaajadrawnhome[0].fifaWins + pelaajadrawnhome[0].fifaLosses + pelaajadrawnhome[0].fifaDraws + 1)
            var newWinPercloser = pelaajadrawnaway[0].fifaWins / (pelaajadrawnaway[0].fifaWins + pelaajadrawnaway[0].fifaLosses + pelaajadrawnaway[0].fifaDraws + 1)
        
            await Pelaaja.updateOne(playerquerydraw1, {$inc: {fifaDraws: 1}, $set: {fifaWinPerc: newWinPercwinner}});
            await Pelaaja.updateOne(playerquerydraw2, {$inc: {fifaDraws: 1}, $set: {fifaWinPerc: newWinPercloser}});
        }

        if(parseInt(req.body.fifaresulthome) > parseInt(req.body.fifaresultaway) + 2 || parseInt(req.body.fifaresulthome) + 2 < parseInt(req.body.fifaresultaway))
        {
            lumierat = true;
        }

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

            res.redirect("/fifa");
        }
        catch
        {
            res.render("/biljardi");
            errorMessage: "Virheellinen syöte"
            console.log("Virheellinen syöte");
        }
    }
    

    
});


module.exports = router;