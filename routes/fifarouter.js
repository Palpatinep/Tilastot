const express = require("express");
const router = express.Router();
const Fifa = require("../models/fifa");

router.get("/", async (req, res) =>
{
    let searchOptions = {};
    if (req.query.result != null && req.query.result !== '')
    {
        searchOptions.result = new RegExp(req.query.result, 'i')
    };
    try
    {
        const fifaResults = await Fifa.find(searchOptions);
        res.render("fifaview/index", 
        {
            fifaResults: fifaResults,
            searchOptions: req.query
        });
    }
    catch
    {
        res.redirect("/");
    }

});

router.post("/", async (req, res) =>
{
    const fifaResult = new Fifa(
        {
            result: req.body.fifaresult
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