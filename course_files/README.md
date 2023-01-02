# 2022-cgge

CO2 Greenhouse Gas Emissions 2022.
Data gathered by [Our World in Data](https://github.com/owid/co2-data/).

## Content

* **data/** the data in [tsv](https://bl.ocks.org/mbostock/3305937).
	* **owid-co2-data.tsv** main dataset
	* **owid-co2-codebook.tsv** codebook for the main dataset
	* **iso3.tsv** country codes
* **viz/** sample visualisations
* **vendor/** vendorized d3 v7.6.1 library

## Data license

All data produced by _Our World in Data_ are completely open access under the [Creative Commons BY license](https://creativecommons.org/licenses/by/4.0/). You have the permission to use, distribute, and reproduce these in any medium, provided the source and authors are credited.


## Data structure

The main attributes present in the **owid-co2-data** table are:

* **#country** Geographic location (source: Our World in Data)
* **year** Year of observation (source: Our World in Data)
* **iso_code** ISO 3166-1 alpha-3, three-letter country codes. (source: International Organization for Standardization)
* **population** Population of each country or region (source: Our World in Data based on different sources (https://ourworldindata.org/population-sources)
* **gdp** Gross domestic product measured in international-$ using 2011 prices to adjust for price changes over time (inflation) and price differences between countries. Calculated by multiplying GDP per capita with population. (source: Maddison Project Database 2020 (Bolt and van Zanden, 2020))
* **co2** Annual production-based emissions of carbon dioxide (CO2), measured in million tonnes. This is based on **territorial emissions, which do not account for emissions embedded in traded goods**. (source: Global Carbon Project)
* **trade_co2** Annual net carbon dioxide (CO2) emissions embedded in trade, measured in million tonnes. Net CO2 emissions embedded in trade is the net of CO2 which is imported or exported via traded goods with an economy. A positive value denotes a country or region is a net importer of CO2 emissions; a negative value indicates a country is a net exporter.
* other attributes (breakdown by main emissions domains, e.g. cement, coal, consumption, etc.) are given in the **[owid-co2-codebook](./data/owid-co2-codebook.csv)** table.

This dataset consists in 246 countries/regions × [70-270] years ~ **26000** records.


The attributes present in the **iso3** table are:

* **#alpha3** the [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) country code (156 values)
* **country** name of the country in english
* **subregion** world subregion (~sub continent)
* **region** world region (~continent)


## Sample visualizations

Visualisation made with [D3.js](https://d3js.org/).

* **viz/0-top20.html** a HTML list of the global emissions top-20 countries filtered for a given year.
* **viz/1-emissions.html** a simple line graph of co2 emissions timeseries in SVG.
* **viz/2-cumulated.html** a HTML list of the cumulated emissions, sorted in descending order.
