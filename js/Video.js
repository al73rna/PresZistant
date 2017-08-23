$(document).ready(function () {
var VidCount = 0
$("#Video").click(function(){
    $( "#VidDialog" ).dialog('open');
});
$("#submitVideo").click(function () {
              var filepath2 = $("#fn3").val().replace(/C:\\fakepath\\/i, '');
              var fileName2 = filepath2.substr(0, filepath2.lastIndexOf('.'))
              var VidTag = '<div class="video-class paint-area ui-widget-content slide-item" style="position:absolute; height:60%; width:60%;"><video width="100%" height="100%" controls><source src="' + filepath2 + '"></video></div>';
              $('.present').append(VidTag);
$(function() {
            $('.video-class').draggable({containment:".present",stack: ".slide-item"});
            $('.video-class').resizable({containment:".present"});
          });
VidCount += 1;
jQuery('#VidDialog').dialog('close');


});
});
jQuery(document).ready(function() {
    jQuery("#VidDialog").dialog({
        autoOpen: false,
        modal: true,
        open: function(){
            jQuery('.ui-widget-overlay').bind('click',function(){
                jQuery('#VidDialog').dialog('close');
            })
        }
    });
}); 


