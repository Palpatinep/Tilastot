const express = require("express");
const router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Pelaaja = require("../models/pelaaja");
const Biljardi = require("../models/biljardi");
    

router.get("/", async (req, res) =>
{

    const pelaajat = await Pelaaja.find({});
    const biljardipelit = await Biljardi.find({});

    res.render("biljardiview/index", 
        {
            pelaaja: pelaajat,
            biljardipelit: biljardipelit
        });
});


router.post("/", async (req, res) =>
{
    const winner = req.body.winner;
    const loser = req.body.loser;
    var lumierat = false;

    if(req.body.winner == req.body.loser)
    {
        const pelaajat = await Pelaaja.find({});
        const biljardipelit = await Biljardi.find({});
        var errorMessage = "Et voi pelata itseäsi vastaan, yritä uudestaan";
        
        res.render("biljardiview/index",
        {
            pelaaja: pelaajat,
            biljardipelit: biljardipelit,
            errorMessage: errorMessage
        })
    }
    else
    {
        if (req.body.biljardilumieracheckbox)
        {
            lumierat = true;
        }
    
        const newBiljardiResult = new Biljardi(
            {
                game: "Biljardi",
                winner: winner,
                loser: loser,
                lumierat: lumierat,
                MatchDate: new Date()
            });
    
        await newBiljardiResult.save({})
    
        const winnerplayer = await Pelaaja.find({playerName: winner})
        const loserplayer = await Pelaaja.find({playerName: loser})
    
        const newWinPercWinner = (winnerplayer[0].biljardiWins + 1) / (winnerplayer[0].biljardiWins + winnerplayer[0].biljardiLosses + 1);
        const newWinPercLoser = (loserplayer[0].biljardiWins) / (loserplayer[0].biljardiWins + loserplayer[0].biljardiLosses + 1);
    
    
        await Pelaaja.updateOne({playerName: winner}, { $inc: { biljardiWins: 1 }, $set: {biljardiWinPerc: newWinPercWinner}})
        await Pelaaja.updateOne({playerName: loser}, { $inc: { biljardiLosses: 1 }, $set: {biljardiWinPerc: newWinPercLoser}})
    
        const pelaajat = await Pelaaja.find({});
        const biljardipelit = await Biljardi.find({});
    
        res.render("biljardiview/index", 
            {
                pelaaja: pelaajat,
                biljardipelit: biljardipelit
            });
    }
})





module.exports = router;