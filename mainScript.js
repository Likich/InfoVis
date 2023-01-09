
    // external loading, aka not for maps data 
    function retrievePopulationData(country, callback) {
        d3.tsv("/course_files/data/owid-co2-data.tsv")
          .row(
            d => ({
              country: d['#country'],
              iso3: d.iso_code,
              co2: +d.co2,
              trade_co2: +d.trade_co2,
              co2_per_capita: +d.co2_per_capita,
              year: +d.year,
              population: +d.population,
              gdp: +d.gdp
            }))
          .get(function (data) {
            data = data.filter(d => { return (d.year == 2019 && d.country == country); });
            if (data.length > 0) {
              var populationData = data[0].population;
              callback(populationData);
            }
          });
      }
  
      function retrieveGdpData(country, callback) {
        d3.tsv("/course_files/data/owid-co2-data.tsv")
          .row(
            d => ({
              country: d['#country'],
              iso3: d.iso_code,
              co2: +d.co2,
              trade_co2: +d.trade_co2,
              co2_per_capita: +d.co2_per_capita,
              year: +d.year,
              population: +d.population,
              gdp: +d.gdp
            }))
          .get(function (data) {
            data = data.filter(d => { return (d.year == 2018 && d.country == country); });
            if (data.length > 0) {
              var gdpData = data[0].gdp; // parse the GDP data as a number
              callback(gdpData);
            }
          });
      }
  
      function retrieveCo2Data(country, callback) {
        d3.tsv("/course_files/data/owid-co2-data.tsv")
          .row(
            d => ({
              country: d['#country'],
              iso3: d.iso_code,
              co2: +d.co2,
              trade_co2: +d.trade_co2,
              co2_per_capita: +d.co2_per_capita,
              year: +d.year,
              population: +d.population,
              gdp: +d.gdp,
              consumption_co2_per_capita: +d.consumption_co2_per_capita
            }))
          .get(function (data) {
            data = data.filter(d => { return (d.year == 2019 && d.country == country); });
            if (data.length > 0) {
              var co2Data = data[0].consumption_co2_per_capita; // parse the GDP data as a number
              callback(co2Data);
            }
          });
      }
  
  
      google.charts.load('current', {
        'packages': ['geochart'],
      });
      google.charts.setOnLoadCallback(drawRegionsMap);
  
      function drawRegionsMap() {
  
        d3.tsv("/course_files/data/owid-co2-data.tsv")
          .row(
            d => ({
              country: d['#country'],
              iso3: d.iso_code,
              co2: +d.co2,
              trade_co2: +d.trade_co2,
              co2_per_capita: +d.co2_per_capita,
              year: +d.year,
              population: +d.population,
              gdp: +d.gdp,
            }))
          .get(function (data) {
            data = data.filter(d => { return (d.year == 2019); });
            console.log(data);
            // data = data.map(d=>([d.country, 1_000_000*d.co2/d.population]));
            // data = data.map(d=>([d.country, d.co2_per_capita]));
            data = data.map(d => ([d.country, d.co2_per_capita]));
  
            // data = [["Country", "co2Emission/capita (ton/hab)"]].concat(data);
            data = [["Country", "co2Emission/capita (ton/hab)"]].concat(data);
            data = google.visualization.arrayToDataTable(data);
  
            var options = {
              colorAxis: { minValue: 0, maxValue: 27 }
            };
  
            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  
            chart.draw(data, options);
  
            google.visualization.events.addListener(chart, 'select', function () {
              var selection = chart.getSelection();
              // check if a selection was made
              if (selection.length > 0) {
                // get the selected row
                var row = selection[0].row;
                // get the data for the selected row
                var countryData = data.getValue(row, 0);
                addPie(countryData);
                var co2EmissionsData = data.getValue(row, 1);
                // retrieve consumption based data
                retrieveCo2Data(countryData, function (co2Data) {
                  // retrieve the population data
                  retrievePopulationData(countryData, function (populationData) {
                    // retrieve the GDP data
                    retrieveGdpData(countryData, function (gdpData) {
                      // show the info window and set the content
                      document.getElementById("info-window").style.display = "block";
                      document.getElementById("info-country").innerHTML = countryData;
                      document.getElementById("info-co2-emissions").innerHTML = co2EmissionsData;
                      document.getElementById("info-population").innerHTML = populationData;
                      document.getElementById("info-gdp").innerHTML = gdpData;
                      document.getElementById("info-co2-emissions-consumption").innerHTML = co2Data;
                    });
                  });
                });
              }
  
            });
  
          });
      }

      document.querySelector("#info-window #close-button").addEventListener("click", function () {
        document.getElementById("info-window").style.display = "none";
      });

      pieIds = ["", "", "", ""];

      function getEmptyPieId(){
        for (let i = 0;i<3;i++){
            if (pieIds[i] == ""){
                return i;
            }
        }
        return 3;
      }

      function addPie(countryData){
        if (pieIds.includes(countryData)){
            return;
        }
        let currentIdx = getEmptyPieId();
        pieIds[currentIdx] = countryData;
        console.log(pieIds);
        let child = document.getElementById("pieGrid").children[currentIdx];
        let newChild = document.getElementById("pieTemplate").cloneNode(true);
        newChild.setAttribute("id", "pie" + countryData)
        newChild.querySelector("p").innerHTML = countryData + " piechart placeholder";
        let b = document.createElement("button");
        b.setAttribute("id", "close-button");
        newChild.appendChild(b)
        newChild.querySelector("#close-button").addEventListener("click", function () {
            pieIds[currentIdx] = "";
            let n = document.getElementById("pieTemplate").cloneNode(true);
            n.style.display = "inline";
            document.getElementById("pieGrid").replaceChild(n, newChild);
          });
        newChild.style.display = "inline";
        document.getElementById("pieGrid").replaceChild(newChild, child);
      }