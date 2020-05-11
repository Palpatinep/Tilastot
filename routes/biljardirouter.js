const express = require("express");
const router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

router.get("/", async (req, res) =>
{

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://learnwebcode.github.io/json-example/animals-1.json");
    

    xhttp.onload = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            const data = JSON.parse(xhttp.responseText)
            console.log(data);
        }
    }

    xhttp.send();


    // const button = document.getElementById('databutton');
    
    // button.addEventListener('click', function(e) 
    // {
    //     console.log('button was clicked');
    // });

    

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA")
    res.sendFile("/Panu/Documents/Visual Studio/Tilastot/views/biljardiview/index2.html")
});





module.exports = router;