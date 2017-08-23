$(document).ready(function(){    
    $("#shape").click(function(){
        $("#ttshape").slideToggle(1000);
        $("#ttshape").show();
    });
    $("#circle").click(function(){
        $("#ttshape").slideToggle(1000);
        document.getElementById("shape-icon").className = "fa fa-circle-thin fa-3x";
    });
    $("#line").click(function(){
        $("#ttshape").slideToggle(1000);
        document.getElementById("shape-icon").className = "fa fa-arrows-h fa-3x";
    });
    $("#square").click(function(){
        $("#ttshape").slideToggle(1000);
        document.getElementById("shape-icon").className = "fa fa-square-o fa-3x";
    });
    $("#star").click(function(){
        $("#ttshape").slideToggle(1000);
        document.getElementById("shape-icon").className = "fa fa-star-o fa-3x";
    });
});
