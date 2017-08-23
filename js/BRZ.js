      $(document).ready(function () {
          var imgCount = 0
          $("#submit").click(function () {
              var filepath = $("#fn").val().replace(/C:\\fakepath\\/i, '');
              var fileName = filepath.substr(0, filepath.lastIndexOf('.'))
              var picTag = '<div id="' + fileName + imgCount.toString() + '" class="paint-area ui-widget-content slide-item" style="position:absolute;"><img src="' + filepath + '" class= "SASEPIC"/></div>';
              $('.present').append(picTag);
          $(function() {
            $('#' + fileName + imgCount.toString()).draggable({containment:".present",stack: ".slide-item"});
            $('#' + fileName + imgCount.toString()).resizable({containment:".present"});
          });
              /*$('#' + fileName + imgCount.toString()).draggable({ cursor: "move", animate: true });
              $('#' + fileName + imgCount.toString()).resizable();*/
              imgCount += 1;
              jQuery('#picDialog').dialog('close');
              //alert("images-" + press.getPresentationNumber().toString());
          });
      });


/*

                var img = document.getElementById('"images-"' + press.getPresentationNumber().toString());
                img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'+
                'AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO'+
                '9TXL0Y4OHwAAAABJRU5ErkJggg==';
                 window.location.href = img.src.replace('image/png', 'image/octet-stream');*/