const express = require("express");
const router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Pelaaja = require("../models/pelaaja");

router.get("/", async (req, res) =>
{

    // const xhttp = new XMLHttpRequest();
    // xhttp.open("GET", "https://learnwebcode.github.io/json-example/animals-1.json");
    

    // xhttp.onload = function()
    // {
    //     if (this.readyState == 4 && this.status == 200)
    //     {
    //         const data = JSON.parse(xhttp.responseText)
    //         console.log(data);
    //     }
    // }

    // xhttp.send();


    // const button = document.getElementById('databutton');
    
    // button.addEventListener('click', function(e) 
    // {
    //     console.log('button was clicked');
    // });

    let searchOptionsPelaaja = {};

    searchOptionsPelaaja.playerName = new RegExp(req.query.playerName, "i");


    const pelaajat = await Pelaaja.find(searchOptionsPelaaja);

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA")
    res.render("biljardiview/index", 
        {
            pelaaja: pelaajat,
            searchOptionsFifa: req.query
        });
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
    res.redirect("/biljardi");

    


});





module.exports = router;