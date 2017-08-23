$("#add-step").click(function(e){
 	$("#addStep-dialog").dialog('open');
});



 jQuery(document).ready(function() {
    jQuery("#addStep-dialog").dialog({
        autoOpen: false,
        modal: true,
        open: function(){
            jQuery('.ui-widget-overlay').bind('click',function(){
                jQuery('#addStep-dialog').dialog('close');
            })
        }
    });
}); 
