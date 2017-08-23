$(document).ready(function(){
    $("#shtool").click(function(){
        $("#tool").slideToggle(1000);
        $('#tt').hide();
        $('#ttshape').hide();
        if (document.getElementById("eye").className == "fa fa-eye-slash fa-3x") {
            document.getElementById("eye").className = "fa fa-eye fa-3x";
        }
        else {
            document.getElementById("eye").className = "fa fa-eye-slash fa-3x";
        }
        
    });
});