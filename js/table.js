$("#table").click(function(){
    $( "#TableDialog" ).dialog('open');
});

$('#CreateTable').click(function(){
    newTableId = "new-table" + $(".TableDiv").length;
    $('<div/>').css({
    'top': 100,
    'left': 100,
    width: 200,
    'position': 'absolute'
  }).
  addClass('TableDiv paint-area slide-item').attr({
    'id': newTableId
  }).appendTo('.present');
    var nrofCols = $('#clmn').val();
    if ( nrofCols < 1) nrofCols = 1;
    var nrofRows = $('#row').val();
    if ( nrofRows < 1) nrofRows = 1;
    nrofRows++;
    $('#TableDialog').dialog('close');
    // Init table
    var content = [];
    for (var r = 0; r < nrofRows; r++ ) {
      var row = [];
      for (var c = 0; c < nrofCols; c++) {
        row.push("");
      }
      content.push(row)
    }
    $('#'+newTableId).flextabledit({
      content: content,
      addTableClass: "myTable",
      texts: { cut: 'Couper', copy: 'Copier', paste: 'Coller', insert: 'Insérer', remove: 'Supprimer', columnName: 'Nom' }
    });
      $('#' + newTableId).draggable({
        containment:".present",
        stack: ".slide-item",
        appendTo: 'body',
        start: function(event, ui) {
          isDraggingMedia = true;
        },
        stop: function(event, ui) {
          isDraggingMedia = false;
        }
      });
  });


jQuery(document).ready(function() {
    jQuery("#TableDialog").dialog({
        autoOpen: false,
        modal: true,
        open: function(){
            jQuery('.ui-widget-overlay').bind('click',function(){
                jQuery('#TableDialog').dialog('close');
            })
        }
    });
}); 

