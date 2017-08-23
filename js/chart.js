var toolbarChart = "pie";
$("#charts").click(function() {
  $("#chartsButton").slideToggle(1000);
  $("#chartsButton").show();
});
$("#pie-chart").click(function(e) {
  $("#chartsButton").slideToggle(1000);
  document.getElementById("chart-icon").className = "fa fa-pie-chart fa-3x";
  $("#inside-catalog .form-group").remove();
  addChartEntry();
  $("#chartDialog").dialog('open');
});
$("#line-chart").click(function(e) {
  toolbarChart = "line";
  $("#chartsButton").slideToggle(1000);
  document.getElementById("chart-icon").className = "fa fa-line-chart fa-3x";
  $("#inside-catalog .form-group").remove();
  addChartEntry();
  $("#chartDialog").dialog('open');
});
$("#area-chart").click(function(e) {
  toolbarChart = "area";
  $("#chartsButton").slideToggle(1000);
  document.getElementById("chart-icon").className = "fa fa-area-chart fa-3x";
  $("#inside-catalog .form-group").remove();
  addChartEntry();
  $("#chartDialog").dialog('open');
});
$("#bar-chart").click(function(e) {
  toolbarChart = "bar";
  $("#chartsButton").slideToggle(1000);
  document.getElementById("chart-icon").className = "fa fa-bar-chart fa-3x";
  $("#inside-catalog .form-group").remove();
  addChartEntry();
  $("#chartDialog").dialog('open');
});

function addChartEntry() {
  $("#inside-catalog").append('<div class="form-group chart-entry"><input type="text" class="form-control chart-label" id="lbl' +
    ($(".chart-entry").length) + '" placeholder="Label" size="10px;">&nbsp;</div><div class="form-group"><input type="text" class="form-control chart-value" id="vlu' +
    ($(".chart-entry").length) + '" placeholder="Value" size="10px;"></div>');
};


$(".AddChartCat").click(function() {
  addChartEntry();
});

$("#chartInsert").click(function(e) {
  newChartId = "new-chart" + $(".chartDiv").length;

  $('<div/>').css({
    'top': 100,
    'left': 100,
    height: 200,
    width: 200,
    'position': 'absolute'
  }).
  addClass('paint-area chartDiv ct-chart ct-golden-section slide-item').attr({
    'id': newChartId
  }).appendTo('.present');
  var chartValues = [];
  $(".chart-value").each(function() {
    chartValues.push(this.value);
  });
  var chartLabels = [];
  $(".chart-label").each(function() {
    chartLabels.push(this.value)
  });

  if (toolbarChart == "pie") {
    var data = {
      labels: chartLabels,
      series: chartValues
    };

    var options = {
      labelInterpolationFnc: function(value) {
        return value[0]
      }
    };

    var responsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
      }]
    ];
    var latestChart = new Chartist.Pie('#' + newChartId, data, options, responsiveOptions);

  } else if (toolbarChart == "line") {
    var data = {
      // A labels array that can contain any sort of values
      labels: chartLabels,
      // Our series array that contains series objects or in this case series data arrays
      series: [
        chartValues
      ]
    };
    var latestChart = new Chartist.Line('#' + newChartId, data);


  } else if (toolbarChart == "area") {

    var latestChart = new Chartist.Line('#' + newChartId, {
      labels: chartLabels,
      series: [
        chartValues
      ]
    }, {
      low: 0,
      showArea: true
    });
  }
  //bar-chart
  else {
    var data = {
      // A labels array that can contain any sort of values
      labels: chartLabels,
      // Our series array that contains series objects or in this case series data arrays
      series: [
        chartValues
      ]
    };
    var latestChart = new Chartist.Bar('#' + newChartId, data);
  }

  $('#' + newChartId).resizable({
    stop: function() {
      latestChart.update();
    }
  });
  $('#' + newChartId).draggable({containment:".present",stack: ".slide-item"});
  // $('#' + newChartId).mouseup(function(e) {
  //   $(".selected-item").removeClass("selected-item");
  //   $('#' + newChartId).addClass("selected-item");
  // });
  $("#chartDialog").dialog('close');

});

jQuery(document).ready(function() {
  jQuery("#chartDialog").dialog({
    autoOpen: false,
    modal: true,
    open: function() {
      jQuery('.ui-widget-overlay').bind('click', function() {
        jQuery('#chartDialog').dialog('close');
      })
    }
  });
});
