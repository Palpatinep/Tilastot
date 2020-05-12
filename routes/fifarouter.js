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
});

router.post("/", async (req, res) =>
{
    var WinnerPlayer = "";
    var LoserPlayer = "";
    var DrawnPlayer1 = "";
    var DrawnPlayer2 = "";
    var lumierat = false;
    var asd = 3;
    var asdasdasd;

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


        // console.log("Winner:" + WinnerPlayer)
        // console.log("Loser:" + LoserPlayer)
        // console.log("playerquerywinner:" + playerquerywinner)
        // console.log("playerquerywinner:" + playerquerywinner)
        // console.log("pelaajawinner[0].fifaWins:" + pelaajawinner[0].fifaWins)
        // console.log("pelaajaloser[0].fifaWins:" + pelaajaloser[0].fifaWins)
        // console.log("newWinPercwinner:" + newWinPercwinner)
        // console.log("newWinPercloser:" + newWinPercloser)
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

        // var playerquerywinner = { playerName: WinnerPlayer};
        // var playerqueryloser = { playerName: LoserPlayer};
        // var playerquerydraw1 = { playerName: DrawnPlayer1};
        // var playerquerydraw2 = { playerName: DrawnPlayer2};
        // var newWinNumber = { $inc: {fifaWins: 1}};
        // var newLossNumber = { $inc: {fifaLosses: 1}};
        // var newDrawNumber = { $inc: {fifaDraws: 1}};

        // const pelaaja1 = await Pelaaja.find(playerquerywinner)
        // const pelaaja2 = await Pelaaja.find(playerqueryloser)
        // const pelaaja3 = await Pelaaja.find(playerquerydraw1)
        // const pelaaja4 = await Pelaaja.find(playerquerydraw2)
        
        // await Pelaaja.updateOne(playerquerywinner, newWinNumber);
        // await Pelaaja.updateOne(playerqueryloser, newLossNumber);
        // await Pelaaja.updateOne(playerquerydraw1, newDrawNumber);
        // await Pelaaja.updateOne(playerquerydraw2, newDrawNumber);   

        // console.log("Success");
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