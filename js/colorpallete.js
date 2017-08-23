function componentToHex(c) 
		{
		    var hex = c.toString(16);
		    return hex.length == 1 ? "0" + hex : hex;
		}
function rgbToHex(r, g, b) 
		{
    		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}

$(document).ready(function(){
    	$("input").change(function(){
		    	var x = ($("#CP").css("background-color"));
		    	var rgb = x.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',');
		  		var red = parseInt(rgb[0]);
		  		var green = parseInt(rgb[1]);
		  		var blue = parseInt(rgb[2]);
		  		var y = rgbToHex(red, green, blue);
		        document.getElementsByName("customizable")[0].setAttribute("data-color", y);
		        var myElement = document.querySelector(".color-9");
		        myElement.style.backgroundColor = y;
		        var myElement2 = document.querySelector("#CP");
		        myElement2.style.color = y;
    		});
    		$("#CPSH").click(function(){
        		$("#CPall").fadeToggle(1000);
    		});
		});

