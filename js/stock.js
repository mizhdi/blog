var fund = {
  "fund": [
    [1463097600,1.0000],
    [1463356800,0.9974]
  ],
  "hushen300": [
    [1463097600,1.0000],
    [1463356800,1.0000]
  ]
}

$(function () {
    var seriesOptions = [],
        seriesCounter = 0,
        names = ['fund', 'hushen300'];

    function createChart() {

        $('#container').highcharts('StockChart', {

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        });
    }

    $.each(names, function (i, name) {

      seriesOptions[i] = {
          name: name,
          data: fund[name]
      };

      // As we're loading the data asynchronously, we don't know what order it will arrive. So
      // we keep a counter and create the chart when all the data is loaded.
      seriesCounter += 1;

      if (seriesCounter === names.length) {
          createChart();
      }

    });

});
