const express = require("express");
const router = express.Router();
const Pelaaja = require("../models/pelaaja");
const Fifa = require("../models/fifa");

router.get("/", async (req, res) =>
{
    const pelaajat = await Pelaaja.find({});

    res.render("pelaajaview/index", 
    {
        pelaajat: pelaajat,
    });
});


router.post("/", async (req, res) =>
{
    if(req.body.pelaajaname.length < 1)
    {
        const pelaajat = await Pelaaja.find({});
        var errorMessage = "Virheellinen syöte";
        
        res.render("pelaajaview/index",
        {
            pelaajat: pelaajat,
            errorMessage: errorMessage
        })
    }
    else
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
    } 
});


router.get("/:id", async (req, res) =>
{
    let searchOptionsPelaaja = {_id: req.params.id};

    const pelaajat = await Pelaaja.find(searchOptionsPelaaja).exec()
    .then(doc => 
        {
            console.log(doc)
            res.status(200).json(doc);
        });


    res.redirect("/pelaaja");
})

router.get("/vs/:id1/:id2", async (req, res) =>
{

    let searchOptionsPelaaja1 = {_id: req.params.id1};
    let searchOptionsPelaaja2 = {_id: req.params.id2};

    const pelaaja1 = await Pelaaja.find({_id: req.params.id1});
    const pelaaja2 = await Pelaaja.find({_id: req.params.id2});

    console.log("YYYYYYYYYYYYYYYYYYYYYY");
    console.log(pelaaja1)
    console.log(pelaaja2)

    const fifasresults = await Fifa.find({pelaajaHome: { "$in": [pelaaja1[0].playerName, pelaaja2[0].playerName]}, pelaajaAway: { "$in": [pelaaja1[0].playerName, pelaaja2[0].playerName]}}).exec()
    .then(doc => 
        {
            console.log(doc)
            res.status(200).json(doc);
        });

    res.redirect("/pelaaja");
})



module.exports = router;