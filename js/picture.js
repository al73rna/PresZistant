$("#picture").click(function(){
    $( "#picDialog" ).dialog('open');
});


jQuery(document).ready(function() {
    jQuery("#picDialog").dialog({
        autoOpen: false,
        modal: true,
        open: function(){
            jQuery('.ui-widget-overlay').bind('click',function(){
                jQuery('#picDialog').dialog('close');
            })
        }
    });
}); 




$("#Video").click(function(){
    $( "#VidDialog" ).dialog('open');
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




