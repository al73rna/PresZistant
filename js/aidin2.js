$(document).click(function(e) {

  if (typeof(e.target.parentNode.className) === 'undefined' || (e.target.className.indexOf("selected-item") === -1 && e.target.parentNode.className.indexOf("selected-item") === -1)) // ... nor a descendant of the container
  {
    $('.selected-item').removeClass("selected-item");
  }
});

function AddText(enable) {
  if (enable == true) {
    var left1 = 0;
    var left2 = 200;
    var top1 = 0;
    var top2 = 200;
    var id = "TextDiv" + ($('.TextDiv').size() + 1);
    var parentOffset = $('.present').offset();

    $('.present').on("mousedown", function(e) {
      if (e.which == 1) {
        left1 = e.pageX + $(window).scrollLeft() - parentOffset.left;
        top1 = e.pageY + $(window).scrollTop() - parentOffset.top;
        left1p = e.pageX + $(window).scrollLeft();
        top1p = e.pageY + $(window).scrollTop();
      }
    });
    $('.present').on("mousemove", function(e) {

      if (e.which == 1) {
        left2 = e.pageX + $(window).scrollLeft() - parentOffset.left;
        top2 = e.pageY + $(window).scrollTop() - parentOffset.top;
        left2p = e.pageX + $(window).scrollLeft()
        top2p = e.pageY + $(window).scrollTop()

        $('#holder').css({
          'top': top1p,
          'left': left1p,
          'height': (top2p - top1p),
          'width': (left2p - left1p),
          'position': 'absolute',
          'display': 'block'
        });
      }
    });

    $('.present').on("mouseup", function(e) {

      if (e.which == 1) {
        if (top2 - top1 > 100 && left2 - left1 > 100) {
          h = top2 - top1
          w = left2 - left1
        } else {
          h = 100
          w = 100
        }
        $('<div/>').css({
          'top': top1,
          'left': left1,
          height: h,
          width: w,
          'position': 'absolute'
        }).
        addClass('TextDiv paint-area  slide-item').attr({
          'id': id
        }).appendTo('.present');
        $('<div/>').css({
          'position': 'relative',
          'font-size':'18px',
          height: "inherit",
          width: "inherit"
        }).
        addClass('TextDiv paint-area ').attr({
          'id': id + 'edit'
        }).text('Enter your text here').appendTo('#' + id);
        $('#holder').css({
          'display': 'none'
        });
      }


      $('#' + id + "edit").dblclick(function() {
        //	$(this).attr({'contenteditable':'true'});
        $('#' + id).resizable("disable");
        $('#' + id).draggable("disable");
        tinymce.get(id + 'edit').show();
      });

      $('#' + id).mouseup(function(e) {
        $(".selected-item").removeClass("selected-item");
        $('#' + id).addClass("selected-item");
      });
      $('#' + id).focusout(function() {
        //$('#'+id).css({'border':'none'});
        $('#' + id).resizable("enable");
        //tinymce.get(id+'edit').hide();
        $('#' + id).draggable("enable");
      });


      AddText(false);
      $('#' + id).resizable();
      $('#' + id).draggable({
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

      tinymce.init({
        selector: '#' + id + 'edit',
        inline: true,
        menubar: false,
        plugins: 'code advlist hr textcolor colorpicker link',
        toolbar1: 'forecolor backcolor fontselect fontsizeselect | bold italic link',
        toolbar2: 'alignleft aligncenter alignright alignjustify | code bullist numlist | undo redo | styleselect'
      });

      e.stopPropagation();

    });
  } else {
    $('.present').unbind('mousedown mousemove mouseup');
  }

}

$(document).ready(function() {
  $("#addText").click(function() {
    AddText(true);
  })
})
