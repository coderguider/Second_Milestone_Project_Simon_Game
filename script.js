var settings = {
    sequence: [],
    round: 0,
    playNumber: 0,
    speed: 1000,
    clicked: 0

}


$(document).ready(function() {
    var audio = $("#sound");

    function animate(divid) {


        // Increase round speed.
        if (settings.round > 5) {
            settings.speed = 500
        }

        if (divid == "a") {
            $("#a").css("background", "#5DADEC");
            $("#tune").attr("src", "http://www.chiptape.com/chiptape/sounds/medium/Sound17.wav");
            setTimeout(function() {
                $("#a").css("background", "#5DADEC");
                $("#a").css("background", "");
            }, 100);
        } else if (divid == "b") {
            $("#b").css("background", "red");
            $("#tune").attr("src", "http://www.chiptape.com/chiptape/sounds/medium/R2chirp.wav");
            setTimeout(function() {
                $("#b").css("background", "red");
                $("#b").css("background", "");
            }, 100);
        } else if (divid == "c") {
            $("#c").css("background", "yellow");
            $("#tune").attr("src", "http://www.chiptape.com/chiptape/sounds/medium/BEEP2.wav");
            setTimeout(function() {
                $("#c").css("background", "yellow");
                $("#c").css("background", "");
            }, 100);
        } else if (divid == "d") {
            $("#d").css("background", "green");
            $("#tune").attr("src", "http://www.chiptape.com/chiptape/sounds/medium/blob.wav");
            setTimeout(function() {
                $("#d").css("background", "green");
                $("#d").css("background", "");
            }, 100);
        } else if (divid == "e") {
            $("#e").css("background", "cyan");
            $("#tune").attr("src", "http://www.chiptape.com/chiptape/sounds/medium/blob.wav");
            setTimeout(function() {
                $("#e").css("background", "cyan");
                $("#e").css("background", "");
            }, 100);
        } else if (divid == "f") {
            $("#f").css("background", "purple");
            $("#tune").attr("src", "http://www.chiptape.com/chiptape/sounds/medium/blob.wav");
            setTimeout(function() {
                $("#f").css("background", "purple");
                $("#f").css("background", "");
            }, 100);
        }
        

        audio[0].pause();
        audio[0].load();
        audio[0].play();

    }




    function letsplay() {
        var text = "";
        var possible = "abcdef";

        for (var i = 0; i < 1; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            settings.sequence.push(text);

        }




        function myLoop() {
            setTimeout(function() {
                animate(settings.sequence[settings.playNumber]);
                settings.playNumber++;
                if (settings.playNumber < settings.sequence.length) {
                    myLoop();
                } else {
                    settings.playNumber = 0;
                    listen();
                }
            }, settings.speed)
        }

        myLoop();

    }


    // LISTEN 

    function listen() {

        $("#a, #b, #c, #d, #e, #f").on("mousedown", function() {


            if (this.id == settings.sequence[settings.clicked]) {

                if (settings.clicked === settings.sequence.length - 1) {
                    $("#a, #b, #c, #d, #e, #f").off("mousedown");
                    settings.clicked = 0;
                    $(".butt.go").trigger("click");
                } else {
                    console.log("Right!");
                    settings.clicked++;
                }



            } else {
                console.log("WRONG");
                $("#fail").show();
                $("#fail").addClass("ItsOver");
                $("#tune").attr("src", "http://www.chiptape.com/chiptape/sounds/medium/MidwaySatanSOUND45.WAV");
                audio[0].pause();
                audio[0].load();
                audio[0].play();
                // sequence[0].pause();
                $("#simon").css("filter", "blur(5px)");
                $("#simon").css("-webkit-filter", "blur(5px)");
                settings.clicked = 0;
                $("#blue, #red, #yellow, #green, #cyan, #purple").off("mousedown");
            }

        });

    }



    //BEGIN GAME

    $("#a, #b, #c, #d, #e, #f").on("click", function() {
        animate(this.id);
    });
    $(".go").on("click", function() {
        $(".dash").css("color", "red");
        $(".title").text("GO!");
        settings.round++;
        letsplay(); // make id and play it
        $(".dash").html(settings.round);
        //playit();




    });

    $("#fail").on("click", function() {
        $("#fail").hide();
        $("#simon").removeAttr("style");
        settings.sequence = [];
        settings.round = 0;
        settings.playNumber = 0,
            settings.speed = 1000;
        settings.clicked = 0;
        // $(".go").trigger("click");
    });

}); //document ready