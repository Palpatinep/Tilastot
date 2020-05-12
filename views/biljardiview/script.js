$(function() {

    $('#get-button').on('click', function() {

        // $("#testtext").text("HEllo world");
        // document.getElementById("testtext2").innerHTML = "Hello world 2";
        // document.getElementById("testtext3").innerHTML = "Hello world 3";
        // document.getElementById("testtext4").innerHTML = "Hello world 4";
        // document.getElementById("testtext5").innerHTML = "Hello world 5";

        $.ajax({
            type: "GET",
            url: "https://learnwebcode.github.io/json-example/animals-1.json",
            success: function(data)
            {
                console.log("success", data);
            }          
        });
    });
});

