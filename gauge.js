<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
<script type='text/javascript' src='https://www.google.com/jsapi'></script>
<script type='text/javascript'>

  // set your channel id here
  var channel_id = 33251;
  // set your channel's read api key here if necessary
  var api_key = '9VGQ4X79MQJC90RD';
  // maximum value for the gauges
  var max_gauge_value = 130;
  // name of the gauges
  var gauge_in = 'Inside';
  var gauge_ou = 'Outside';
  var gauge_at = 'Attic';

  // global variables
  var chart_at,chart_ou,chart_in, charts, data;

  // load the google gauge visualization
  google.load('visualization', '1', {packages:['gauge']});
  google.setOnLoadCallback(initChart);

  // display the data
  function displayData(point,cht) {
    if(cht==1) {
       data.setValue(0, 0, gauge_at);
       data.setValue(0, 1, point);
       chart_at.draw(data, options);
    }
    else if(cht==2) {
       data.setValue(0, 0, gauge_ou);
       data.setValue(0, 1, point);
       chart_ou.draw(data, options);
    }
    else if(cht==3) {
       data.setValue(0, 0, gauge_in);
       data.setValue(0, 1, point);
       chart_in.draw(data, options);
    }
  }

  // load the data
  function loadData() {
    // variable for the data point
    var p_at,p_ou,p_in;

    // get the data from thingspeak
    $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/feed/last.json?api_key=' + api_key, function(data) {

      // get the data point
      p_at = data.field3;
      p_ou = data.field2;
      p_in = data.field1;

      // if there is a data point display it
      if (p_at) {
        displayData(p_at,1);
      }
      if (p_ou) {
        displayData(p_ou,2);
      }
      if (p_in) {
        displayData(p_in,3);
      }

    });
  }

  // initialize the chart
  function initChart() {

    data = new google.visualization.DataTable();
    data.addColumn('string', 'Label');
    data.addColumn('number', 'Value');
    data.addRows(1);

    chart_at = new google.visualization.Gauge(document.getElementById('gauge_at'));
    chart_ou = new google.visualization.Gauge(document.getElementById('gauge_ou'));
    chart_in = new google.visualization.Gauge(document.getElementById('gauge_in'));
    options = {width: 125, height: 125, redFrom: 100, redTo: 130, yellowFrom:85, yellowTo: 100, minorTicks: 5, max: 130, min: 35};

    loadData();

    // load new data every 60 seconds
    setInterval('loadData()', 60000);
  }

</script>

