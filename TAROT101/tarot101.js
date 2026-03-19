$(document).ready(function(){

    $(".preamble button").click(function(){

        if($(this).attr("data-correct") === "true"){
            $(this).css("background", "rgb(217, 249, 210)");
        } else {
            $(this).css("background", "rgb(251, 226, 226)");
        }

    });

});