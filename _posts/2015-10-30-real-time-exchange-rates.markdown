---
layout: post
title:  "Real time exchange rates with node.js and facebook react!"
date:   2015-10-30 15:38:12
categories: js react node parsing
---

Today i want to create some sort of dashboard with exchange rates. It’s really actual information because  rates changes avery hour, sometimes even every minute)

I’m going to use:

- `Request` (node module) to get webpage with required data
- `Cheerio` (node module) to parse it & get scrap some values
- `React.js` to create active element and update it state when ajax get new data from server.
- `PM2` process manager to run node.js app on server.

Ok. Lets start:

{% highlight js %}
var request = require("request"),
    cheerio = require("cheerio"),
    fs = require("fs"),
    url = "http://finance.tut.by/kurs/",
    exchangeRate = {}; //create object to hold rates


request(url, function (error, response, body) { //getting page from url
  if (!error) {
    var $ = cheerio.load(body); //parse page with cheerio
    var dollarSell = $(".cursList_table tbody tr big").slice(1,2).text();
    exchangeRate.dollarSell = dollarSell;

    console.log(exchangeRate.dollarSell);

  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
{% endhighlight %}

{% highlight bash %}
hatter$ node simple_get_value.js
17 690
{% endhighlight %}


Now i want ad function for saving rate in JSON file:


{% highlight js %}
var request = require("request"),
    cheerio = require("cheerio"),
    fs = require("fs"),
    url = "http://finance.tut.by/kurs/",
    exchangeRate = {}; //create object to hold rates

// this function will get data from server 
// and save it to json file
function getData(){
  request(url, function (error, response, body) { //getting page from url
    if (!error) {
      var $ = cheerio.load(body); //parse page with cheerio
      var dollarSell = $(".cursList_table tbody tr big").slice(1,2).text();
      exchangeRate.dollarSell = dollarSell;
      createJSONfile(exchangeRate); //create json file to hold rate

    } else {
      console.log("We’ve encountered an error: " + error);
    }
  });
}


// additional function for saving .json file
function createJSONfile(data){
  var outputFilename = "public/curs_json.json";
  var outputJson = JSON.stringify(data, null, 4);

  fs.writeFile(outputFilename, outputJson, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
  }); 
}

setInterval(getData, 5000);
{% endhighlight %}


And now we can create simple page that will show us the rate!

First let’s create index.html file

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <title>Hello React</title>
    <!-- Not present in the tutorial. Just for basic styling. -->
    <script src="shared/thirdparty/es5-shim.min.js"></script>
    <script src="shared/thirdparty/es5-sham.min.js"></script>
    <script src="shared/thirdparty/console-polyfill.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.0/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.0/JSXTransformer.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <script type="text/jsx;harmony=true" src="scripts/example.js"></script>
  </body>
</html>
{% endhighlight %}

Now we can create new react component!


{% highlight js %}
var Curs_holder = React.createClass({
  loadCursFromServer: function() {
    $.ajax({
      url: this.props.url,
      beforeSend: function(xhr){
        if (xhr.overrideMimeType)
        {
          xhr.overrideMimeType("application/json");
        }
      },
      dataType: 'json',
      cache: false,
      success: function(data) {
       this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
       console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
  },


  componentDidMount: function() {
    this.loadCursFromServer();
    setInterval(this.loadCursFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <h2>{this.state.data.dollarSell}</h2>
    );
  }

});

React.render(
  <Curs_holder url="curs_json.json" pollInterval={2000} />,
  document.getElementById('content')
);
{% endhighlight %}
