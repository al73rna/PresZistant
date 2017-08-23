/**
 * Created by Aidin on 1/29/2016.
 */
function createSlideElement(x,y,z,rotate,rotateX,rotateY,rotateZ,scale,animationDelay,slideDelay){//creates default slide element
        var slide = document.createElement("div");
        slide.classList.add("slide","z-depth-5", "paint-area", "waves-light");
        slide.id = "slide" + window.performance.now();
        slide.id = slide.id.replace(".","-");
        slide.dataset.x = x;
        slide.dataset.y = y;
        slide.dataset.z = z;
        slide.dataset.rotateX = rotateX;
        slide.dataset.rotateY = rotateY;
        slide.dataset.rotateZ = rotateZ;
        slide.dataset.scale = scale;
        slide.dataset.animation_delay = animationDelay;
        slide.dataset.slide_delay = slideDelay;
        var textDiv1Id = window.performance.now().toString();
        var textDiv2Id = window.performance.now().toString();
        textDiv1Id = textDiv1Id.replace(".","-");
        textDiv2Id = textDiv2Id.replace(".","-");
        var inner = '<div class="TextDiv paint-area paint-area--text ui-resizable ui-draggable ui-draggable-handle'
                   + 'selected-item headerText" id="TextDiv' + textDiv1Id + '" style="position: absolute;"><div class="TextDiv paint-area'
                   + 'paint-area--text mce-content-body mce-edit-focus" id="TextDiv' + textDiv1Id + 'edit" style="position: relative;'
                   + ' height: inherit; width: inherit;" contenteditable="true" spellcheck="false"><p>Enter Text</p>'
                   + '</div><div class="ui-resizable-handle ui-resizable-e" style="z-index: 90;"></div><div class='
                   + '"ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><div class="ui-resizable-handle'
                   + ' ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;"></div></div> <div '
                   + 'class="TextDiv paint-area paint-area--text ui-resizable ui-draggable ui-draggable-handle'
                   + 'selected-item contentText" id="TextDiv' + textDiv2Id + '" style="position: absolute;"><div class="TextDiv paint-area'
                   + ' paint-area--text mce-content-body mce-edit-focus" id="TextDiv' + textDiv2Id + 'edit" style="position: relative; '
                   + 'height: inherit; width: inherit;" contenteditable="true" spellcheck="false"><p>Enter Text</p>'
                   + '</div><div class="ui-resizable-handle ui-resizable-e" style="z-index: 90;"></div><div class='
                   + '"ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><div class="ui-resizable-handle'
                   +' ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;"></div></div>';
        //slide.innerHTML = inner;
        return slide;

}


$('#next').click(function(){
    var destEl = press.getCurrentSlide().next.element;
    destEl.style.display = "block";
    var element = press.getCurrentSlide().element;
    element.addEventListener("transitionend", hideIt);
    destEl.removeEventListener("transtioned",hideIt);
    press.nextSlide();
});
$('#prev').click(function(){
    var destEl = press.getCurrentSlide().previous.element;
    destEl.style.display = "block";

    var element = press.getCurrentSlide().element;
    element.addEventListener("transitionend", hideIt);
    destEl.removeEventListener("transtioned",hideIt);
    press.previousSlide();
});
function hideIt(){
    $('.previous').hide();
    $('.next').hide();
}


$('#add-slide-button').click(function(){
  $( "#addSlide-dialog" ).dialog('open');
    
});

$('#remove-slide-button').click(function(){
    var el = press.removeSlide();
    el.element.style.display = "block";
    el.element.removeEventListener("transitioned",hideIt);

    press.goTo(el.id);        
});


jQuery(document).ready(function() {
    jQuery("#addSlide-dialog").dialog({
        autoOpen: false,
        modal: true,
        open: function(){
            jQuery('.ui-widget-overlay').bind('click',function(){
                jQuery('#addSlide-dialog').dialog('close');
            })
        }
    });
}); 

function addSlide(){
  var x = $('#xval').val();
  var y = $('#yval').val();
  var z = $('#zval').val();
  var rotx = $('#rxval').val();
  var roty = $('#ryval').val();
  var rotz = $('#rzval').val();
  var animDelay = $('#adval').val();
  var slideDelay = $('#sdval').val();
  var scale = $('#scaleval').val();
  var el = createSlideElement(x,y,z,0,rotx,roty,rotz,scale,animDelay,slideDelay);
  press.addSlide(el);
  jQuery('#addSlide-dialog').dialog('close');
  $('#xval').val("");
  $('#yval').val("");
  $('#zval').val("");
  $('#rxval').val("");
  $('#ryval').val("");
  $('#rzval').val("");
  $('#scaleval').val("1");
  $('#adval').val("1000");
  $('#sdval').val("500");
}

function getHTML(){
  template = '<!doctype html><html lang="en" class="no-js"><head> <meta charset="utf-8"> <title>Demo</title> <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> <link type="text/css" rel="stylesheet" href="materialize/css/materialize.min.css" media="screen,projection"/> <link rel="stylesheet" type="text/css" href="font-awesome-4.4.0/css/font-awesome.min.css"/> <link rel="stylesheet" type="text/css" href="css/style.css"/> <link rel="stylesheet" type="text/css" href="css/chartist.min.css"/> <link rel="stylesheet" type="text/css" href="css/service.flextabledit.jquery.css"/></head><body style="overflow: hidden;"><div class="container">!$!<div class="NPslides"><span class="waves-effect waves-light" style="padding-right:10px; padding-left:8px;"><a id="previousSlide" style="text-decoration:none;" data-toggle="tooltip" data-placement="top" onclick="javascript: press.previousSlide();" title="Previous"><i class="fa fa-angle-left fa-5x" style="color:white"></i></a></span> <span class="waves-effect waves-light" style="padding-left:10px; padding-right:8px;"><a id="nextSlide" style="text-decoration:none;" data-toggle="tooltip" data-placement="top" onclick="javascript: press.nextSlide();" title="Next"><i class="fa fa-angle-right fa-5x" style="color:white"></i></a></span></div></div><script src="js/pressistant.js"></script><script src="js/chartist.min.js"></script><script type="text/javascript">press.init();</script></body></html>';
  return press.getRawHtml(template);
}