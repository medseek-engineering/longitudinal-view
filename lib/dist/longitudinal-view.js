// angular.module('longitudinalView', []);
(function() {
  'use strict';
  var eventMetricHeight = 30;

  var localeFormatter = d3.locale({
    'decimal': ',',
    'thousands': '.',
    'grouping': [2],
    'currency': ['$', ''],
    'dateTime': '%a %b %e %X %Y',
    'date': '%b %d, %Y',
    'time': '%I:%M:%S %p',
    'periods': ['AM', 'PM'],
    'days': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'shortDays': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'shortMonths': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  })

  var largeTickFormat = localeFormatter.timeFormat.multi([
      ['%I:%M%p', function(d) { return d.getMinutes(); }],
      ['%I%p', function(d) { return d.getHours(); }],
      ['%a %d', function(d) { return d.getDay() && d.getDate() != 1; }],
      ['%b %d', function(d) { return d.getDate() != 1; }],
      ['%B', function(d) { return d.getMonth(); }],
      ['%Y', function() { return true; }]
  ]);

  var smallTickFormat = localeFormatter.timeFormat.multi([
      ['', function(d) { return d.getSeconds(); }],
      ['', function(d) { return d.getHours(); }],
      ['', function(d) { return d.getMinutes(); }],
      ['', function(d) { return d.getDay() && d.getDate() != 1;  }],
      ['', function(d) { return d.getDate() != 1; }],
      ['', function(d) { return d.getMonth(); }]
  ]);

  var chart = {
    settings: {
      id: '#chartArea',
      margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
      },
      w: 800,
      h: 450
    },
    metrics: [
      {
        Key: 'weights',
        metricProperties: ['weight'],
        type: 'trend',
        Records: [
          {
            'date': '2015-12-31T15:55:17',
            'bmi': 22.24,
            'weight': 120
          },
          {
            'date': '2016-01-06T15:55:17',
            'bmi': 22.24,
            'weight': 155
          },
          {
            'date': '2016-01-07T15:55:17',
            'bmi': 22.24,
            'weight': 200
          },
          {
            'date': '2016-01-09T15:55:17',
            'bmi': 22.24,
            'weight': 200
          },
          {
            'date': '2016-01-11T15:55:17',
            'bmi': 22.24,
            'weight': 195
          }
        ]
      },
      {
        Key: 'bloodPressures',
        metricProperties: ['systolic', 'diastolic'],
        type: 'trend',
        Records: [
          {
            'id': '791',
            'date': '2016-01-06T18:10:39',
            'pulse': '120',
            'systolic': 130,
            'diastolic': 110
          },
          {
            'id': '828',
            'date': '2016-01-07T15:56:15',
            'pulse': '120',
            'systolic': 125,
            'diastolic': 110
          },
          {
            'id': '1195',
            'date': '2016-01-08T13:50:50',
            'pulse': '88',
            'systolic': 117,
            'diastolic': 76
          },
          {
            'id': '198',
            'systolic': 120,
            'diastolic': 70,
            'pulse': '72',
            'date': '2016-01-09T09:53:00'
          },
          {
            'id': '198',
            'systolic': 104,
            'diastolic': 70,
            'pulse': '72',
            'date': '2016-01-10T09:53:00'
          },
          {
            'id': '198',
            'systolic': 140,
            'diastolic': 90,
            'pulse': '72',
            'date': '2016-01-11T09:53:00'
          },
          {
            'id': '198',
            'systolic': 170,
            'diastolic': 120,
            'pulse': '72',
            'date': '2016-01-12T09:53:00'
          },
          {
            'id': '198',
            'systolic': 195,
            'diastolic': 140,
            'pulse': '72',
            'date': '2016-01-13T09:53:00'
          }
        ]
      },
      {
        Key: 'medications',
        type: 'event',
        Records: [
          {
            'date': '2016-01-05T19:55:17'
          },
          {
            'date': '2016-01-07T05:55:17'
          },
          {
            'date': '2016-01-08T20:55:17'
          },
          {
            'date': '2016-01-10T04:55:17'
          },
          {
            'date': '2016-01-11T09:55:17'
          },
          {
            'date': '2016-01-12T18:55:17'
          }
        ]
      },
      {
        Key: 'encounter',
        type: 'event',
        Records: [
          {
            'date': '2016-01-05T15:55:17'
          },
          {
            'date': '2016-01-07T15:55:17'
          },
          {
            'date': '2016-01-08T15:55:17'
          },
          {
            'date': '2016-01-10T15:55:17'
          },
          {
            'date': '2016-01-11T15:55:17'
          },
          {
            'date': '2016-01-12T15:55:17'
          }
        ]
      },
      {
        Key: 'tasks',
        type: 'event',
        Records: [
          {
            'date': '2016-01-09T09:55:17'
          },
          {
            'date': '2016-01-08T19:55:17'
          },
          {
            'date': '2016-01-12T15:55:17'
          }
        ]
      }
    ]
  };

  chart.settings.w = chart.settings.w - chart.settings.margin.left - chart.settings.margin.right;

  chart.settings.h = chart.settings.h - chart.settings.margin.top - chart.settings.margin.bottom;



  var height = chart.settings.h +
          chart.settings.margin.top +
          chart.settings.margin.bottom;
  var width = chart.settings.w +
          chart.settings.margin.left +
          chart.settings.margin.right;

  
  _.each(chart.metrics, function(metric) {
    // clean dates
    _.each(metric.Records, function(reading, readingIndex) {
      reading.date = new Date(reading.date); 
    });
    metric.Records.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });
  });


  function buildDomain(dataset, metrics) {
    var fullDomain=[];
    _.each(dataset, function (datum) {
      _.each(metrics, function(metric) {
        fullDomain.push(datum[metric]);
      });
    });
    
    fullDomain.push(0);
    return fullDomain;
  }

  function enterCircle(selection, className) {
    selection
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('class', 'circle ' + className);
  }

  function placeCircles(circles, metricY) {
    circles
      .attr('cx', function(d){
        return chart.xScale(d.date);
      })
      .attr('cy', metricY);
  }

  chart.dates =
    _.chain(chart.metrics)
      .reduce(function(a,b) {
        return a.concat(b.Records);
      }, [])
      .pluck('date')
      .value();

  var dateRange = d3.extent(chart.dates);

  var minN = dateRange[0].getTime(),
      maxN = dateRange[1].getTime();

  var minDate = new Date(minN - 8.64e7),
      maxDate = new Date(maxN + 8.64e7);

  function setupScales(setXScale) {
    chart.dates =
      _.chain(chart.metrics)
        .reduce(function(a,b) {
          return a.concat(b.Records);
        }, [])
        .pluck('date')
        .value();
    
    
    if (setXScale) {
      chart.xScale = d3.time.scale()
          .domain([minDate, maxDate])
          .range([0, chart.settings.w]);
    }
    
    
    chart.eventMetrics = chart.metrics.filter(function(metric) {
      return !metric.metricProperties || !metric.metricProperties.length;
    });

    chart.trendMetrics = chart.metrics.filter(function(metric) {
      return metric.metricProperties && metric.metricProperties.length;
    });
  }

  function updateTrends(metric) {
    metric.domain = buildDomain(metric.Records, metric.metricProperties);

    metric.yScale = d3.scale.linear()
      .domain(d3.extent(metric.domain))
      .range([chart.settings.h, (chart.eventMetrics.length)*eventMetricHeight]);

    _.each(metric.metricProperties, function(propertyName) {

      metric[propertyName].circles = metric[propertyName].metricWrap
        .selectAll('.'+metric[propertyName].circleClass)
        .data(metric.Records)
        .call(enterCircle, metric[propertyName].circleClass);

      metric[propertyName].line = d3.svg.line()
        .x(function(d) {
          return chart.xScale(d.date);
        })
        .y(function(d) {
          return metric.yScale(d[propertyName]);
        });

      metric[propertyName].path
        .datum(metric.Records)
        .attr('d', metric[propertyName].line);

      metric[propertyName].circles
        .call(placeCircles, function(d) {
          return metric.yScale(d[propertyName]);
        });
    });
  }

  function updateEvents(metric, metricIndex) {
    metric.circles = metric.metricWrap
      .selectAll('.'+metric.circleClass)
      .data(metric.Records)
      .call(enterCircle, metric.circleClass);

    metric.circles
      .call(placeCircles, function(d) {
        return eventMetricHeight * metricIndex;
      });
  }

  function update() {
    
    setupScales(false);
    
    _.each(chart.trendMetrics, function(metric) {
      updateTrends(metric);
    });
    _.each(chart.eventMetrics, function(metric, metricIndex) {
      updateEvents(metric, metricIndex);
    });

    chart.largeTicks.call(chart.largeTicksScale);
    chart.smallTicks.call(chart.smallTicksScale);
  }


  function makeChart(selection) {
    var container;
    selection
      .each(function(data) {
        container = d3.select(this);
        chart.eventMetrics = data.filter(function(metric) {
          return !metric.metricProperties || !metric.metricProperties.length;
        });

        chart.trendMetrics = data.filter(function(metric) {
          return metric.metricProperties && metric.metricProperties.length;
        });

        chart.eventMetrics.forEach(function(metric, metricIndex) {
          metric.circleClass = 'circle-'+metric.Key;
          metric.metricWrap = chart.svg
            .append('g')
            .attr('class', 'metric-event metric-'+metric.Key);
          updateEvents(metric, metricIndex);
        });

        chart.trendMetrics.forEach(function(metric) {
          metric.metricProperties.forEach(function(propertyName) {
            metric[propertyName] = {};
            metric[propertyName].pathClass = 'path-'+propertyName;
            metric[propertyName].circleClass = 'circle-'+propertyName;

            metric[propertyName].metricWrap = chart.svg
              .append('g')
              .attr('class', 'metric-trend metric-'+propertyName);

            metric[propertyName].path = metric[propertyName].metricWrap
              .append('path')
              .attr('class', 'path '+metric[propertyName].pathClass)
              .datum(metric.Records);
          });
          updateTrends(metric);
        });
      });
  }

  function updateZoomFromChart() {

    zoom.x(chart.xScale);
    
    var fullDomain = maxDate - minDate,
        currentDomain = chart.xScale.domain()[1] - chart.xScale.domain()[0];

    var minScale = currentDomain / fullDomain,
        maxScale = minScale * 20;

    zoom.scaleExtent([minScale, maxScale]);
  }


  setupScales(true);

  chart.outerSvg = d3
    .select(chart.settings.id)
    .append('svg')
    .attr('preserveAspectRatio', 'none')
    .attr('viewBox', '0 0 ' + width +' ' + height);

  chart.svg = chart.outerSvg.append('g')
    .attr('transform',
          'translate(' +
          chart.settings.margin.left +
          ', ' +
          chart.settings.margin.top +
          ')');

  chart.smallTicksScale = d3.svg.axis()
    .scale(chart.xScale)
    .orient('bottom')
    .ticks(20)
    .tickSize(4, 0)
    .tickPadding(10)
    .tickFormat('');



  chart.largeTicksScale = d3.svg.axis()
    .scale(chart.xScale)
    .orient('bottom')
    .ticks(10)
    .tickSize(10, 0)
    .tickPadding(10)
    .tickFormat(largeTickFormat);


  chart.xAxis = chart.svg
    .append('g')
    .attr('class', 'axis axis-x')
    .attr('transform', 'translate(0, '+ (chart.settings.h + 0) + ')');
    

  chart.smallTicks = chart.xAxis
    .append('g')
    .attr('class', 'ticks-small')
    .call(chart.smallTicksScale);

  chart.largeTicks = chart.xAxis
    .append('g')
    .attr('class', 'ticks-large')
    .call(chart.largeTicksScale);

  chart.svg
    .datum(chart.metrics)
    .call(makeChart);


  var zoom = d3.behavior.zoom()
    .x(chart.xScale)
    .on('zoom', function() {
      var x;
      if (chart.xScale.domain()[0] < minDate) {
        x = zoom.translate()[0] - chart.xScale(minDate) + chart.xScale.range()[0];
        zoom.translate([x, 0]);
      } else if (chart.xScale.domain()[1] > maxDate) {
        x = zoom.translate()[0] - chart.xScale(maxDate) + chart.xScale.range()[1];
        zoom.translate([x, 0]);
      }
      update();
    });

  chart.outerSvg
    .append('g')
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'chart-overlay')
    .call(zoom);

  updateZoomFromChart();

})();


