/**
 * Created by Shweta on 8/16/16.
 */
(function(){
	"use strict";

	//creating the main app module (parent module)
	angular.module('dcbiApp', [
								'dcbiApp.data',
								'dcbiApp.viz'
	]);

	//using the value provider recipe
	angular.module('dcbiApp').value("MUTATION", 'mutation');
	angular.module('dcbiApp').value("CCN", 'ccn');
	angular.module('dcbiApp').value("BOTH", 'both');



	//main app controller (this is the parent of all controllers)
	angular.module('dcbiApp').controller('dcbiAppController', dcbiAppController);

	dcbiAppController.$inject = ['$scope','dataService', 'queryService'];
	function dcbiAppController($scope,dataService,queryService)
	{
		var dcbiCtrl = this;
		dcbiCtrl.dataService = dataService;

		dcbiCtrl.gene = "";//empty string uninitiated

		dcbiCtrl.createRequest = createRequest;

		function createRequest ()
		{
			queryService.createRequest(dcbiCtrl.gene,dcbiCtrl.type);
		}

	}

})();//will be using the IIFE pattern through out project
/**
 * this d3 file renders a d3 heat map
 *
 * @ author spurushe
 */

if(!this.d3_viz){
	this.d3_viz = {};
}





(function(){

	function BarChart (){



		this._container;
		this._margin;
		this._width;
		this._height;
		this._barchartSvg;

		this._yScale;
		this._xScale;
		this._xAxis;
		this._yAxis;


		this._colorRamp;
		this._colorScale;
		this._toolTip;

		this._data;
		this._labels;


	};

	var p = BarChart.prototype;

	window.d3_viz.BarChart = BarChart;


	//initializes the bar chart
	p.initialize = function(config){

		this._container = config.container;
		this._data = config.data;

		this._margin =  {top: 50, right: 50, bottom: 50, left: 50};

		this._width = this._container.offsetWidth - this._margin.left;
		this._height = this._container.offsetHeight == 0 ? 200 : this._container.offsetHeight - this._margin.top;

		// Scaling Functions
		this._xScale = d3.scale.ordinal()
			.rangeRoundBands([0, this._width], .1);

		this._yScale  = d3.scale.linear()
			.range([this._height, 0]);

		this._xAxis = d3.svg.axis()
			.scale(this._xScale)
			.orient("bottom");

		this._yAxis = d3.svg.axis()
			.scale(this._yScale)
			.orient("left")
			.ticks(10, "%");



		//original SVG
		this._barchartSvg = d3.select(this._container).append("svg")
			.attr("width", this._width + this._margin.left + this._margin.right)
			.attr("height",this._height + this._margin.top + this._margin.bottom )
		.append("g")
			.attr("transform","translate(" + this._margin.left + "," + this._margin.top + ")");


		//toolTip
		this._toolTip = d3.select(this._container)
			.append("div")
			.style("visibility", "hidden")
			.attr("class", "toolTip")
			.text("");
	};

	/**
	 * function to draw a barchart
	 *  dom_element_to_append_to: the HTML element to which the barchart D3 viz is appended
	 */
	p.render = function(){


		if(!this._barchartSvg){
			console.log("Bar chart still initializing");
			setTimeout(p.render, 100);
		}

		var data = this._data;

		this._xScale.domain(data.map(function(d) { return d.label; }));
		this._yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

		this._barchartSvg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + this._height + ")")
			.call(this._xAxis);

		this._barchartSvg.append("g")
			.attr("class", "y axis")
			.call(this._yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Frequency");

		this._barchartSvg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return this._xScale(d.label); }.bind(this))
			.attr("width", this._xScale.rangeBand())
			.attr("y", function(d) { return this._yScale(d.value); }.bind(this))
			.attr("height", function(d) { return this._height - this._yScale(d.value); }.bind(this));




	};


})();

/**
 * this d3 file renders a d3 heat map
 *
 * @ author spurushe
 */

if(!this.d3_viz){
	this.d3_viz = {};
}

(function(){

	function HeatMap ()
	{
		this._container;
		this._margin;
		this._width;
		this._height;
		this._heatMapSvg;

		this._y;
		this._x;


		this._colorScale;
		this._toolTip;

		this._data;
	};

	var p = HeatMap.prototype;

	window.d3_viz.HeatMap = HeatMap;


	//initializes the heat map
	p.initialize = function(config){

		this._container = config.container;
		this._data = config.data;

		this._margin =  {top: 10, right: 10, bottom: 20, left: 100};

		this._width = this._container.offsetWidth - this._margin.left - this._margin.right;
		this._height = this._container.offsetHeight == 0 ? this._data.length * 10 : this._container.offsetHeight - this._margin.top - this._margin.bottom;

		//original SVG
		this._heatMapSvg = d3.select(this._container).append("svg")
			.attr("width", this._width + this._margin.left + this._margin.right)
			.attr("height",this._height  + this._margin.top + this._margin.bottom)
			.append("g")
			.attr("transform", "translate(" + this._margin.left + "," + this._margin.top + ")");


		// Scaling Functions
		this._x = d3.scale.linear().range([0, this._width]);
		this._y = d3.scale.linear().range([ this._height,0]);

		//todo add error checking to ensure, what we get here is numeric columns not string columns
		// Compute the scale domains.
		this._x.domain([d3.min(this._data, function(d) { return d.value; }) , d3.max(this._data, function(d) { return d.value; }) ]);
		this._y.domain(d3.extent(this._data, function(d) { return d.id; }));

		var    yStep = 1;
		var    xStep = 1;
		this._x.domain([this._x.domain()[0] - xStep, this._x.domain()[1] + xStep]);
		this._y.domain([this._y.domain()[0] , this._y.domain()[1] - yStep ]);

		this._xAxis = d3.svg.axis().scale(this._x).orient("bottom").ticks(5);
		this._yAxis = d3.svg.axis().scale(this._y)
			.orient("left")
			.ticks(this._data.length -1)
			.tickFormat(function (col) {
				var record = this._data[col];
				var label = record ? record.key : '';
				return label;
			}.bind(this));

		this._colorScale = d3.scale.linear()
			.domain([-2,-1,0,1, 2])//TODO parameterize this according to the matrix
			.range(["red", "orange", "yellow","lightgreen","green"]);

	};



	/**
	 * function to draw a heatmap
	 *  dom_element_to_append_to: the HTML element to which the heatmap D3 viz is appended
	 */
	p.render = function(){

		var svg = this._heatMapSvg;
		var x = this._x;
		var y = this._y;
		var color = this._colorScale;
		var data = this._data;
		var xStep = 1,
			yStep = 1;

		if(!svg){
			setTimeout(p.render, 100);
		}


		// remove all previous items before render
		if(svg)
			svg.selectAll('*').remove();
		else
			return;


		svg.selectAll(".tile")
			.data(data)
			.enter().append("rect")
			.attr("class", "tile")
			.attr("x",function(d) { return x(d.value); } )
			.attr("y", function(d) { return y(d.id + yStep); })
			.attr("width", x(xStep) - x(0))
			.attr("height",  y(0) - y(yStep))
			.style("fill", function(d) { return color(d.value);});

		// Add an x-axis with label.
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + this._height + ")")
			.call(this._xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", this._width)
			.attr("y", -6)
			.attr("text-anchor", "end")
			.text("CCN");

		// Add a y-axis with label.
		svg.append("g")
			.attr("class", "y axis")
			.call(this._yAxis)
			.append("text")
			.attr("class", "label")
			.attr("y", 6)
			.attr("dy", ".71em")
			.attr("text-anchor", "end")
			.attr("transform", "rotate(-90)")
			.text("Gene ID");




	};


})();
/**
 * Created by Shweta on 8/16/16.
 */
//angular directive for a bar chart
(function(){
	"use strict";
	angular.module('dcbiApp.viz', []);//creating the viz module

	angular.module('dcbiApp.viz').directive('barChart', barChart);

	function barChart (dataService)
	{
		return {
			restrict :'EA',
			templateUrl: 'barChartPartial.html',
			scope:{
				inheritedgene :'=',
				data:'='
			},
			//controller : barChartController,
			link :function (scope, elem ,attrs)
			{
				var config;
				var mydata;
				var dom_element_to_append_to = document.getElementById('BarChart');

				scope.$watch(function(){
					return scope.data;
				}, function(){
					if(scope.data)
					{
						var calculatedData = [];

						for (var key in scope.data)
						{
							if(key.toString() !== 'allGenes')
							{
								calculatedData.push({
									label:key,
									value: Math.round((scope.data[key].length/scope.data.allGenes.length) * 100)//TODO this math should not be hard coded
								});
							}
						}

						var config = {
							data:calculatedData,
							container : dom_element_to_append_to
						};

						var bc = new window.d3_viz.BarChart();//create
						bc.initialize(config);//initialize
						bc.render();//render
					}
				});
			}
		}//the directive definiton object
	}

})();
/**
 * Created by Shweta on 8/18/16.
 */
//angular directive for a heat map
(function(){
	"use strict";

	angular.module('dcbiApp.viz').directive('heatMap', heatMap);

	function heatMap ()
	{
		return {
			restrict :'EA',
			templateUrl: 'heatMapPartial.html',
			scope:{
				inheritedgene :'=',
				data:'='
			},
			//controller : heatMapController,
			//controllerAs : 'hmController',
			bindToController: 'true',
			link :function (scope, elem, attrs)
			{

				var dom_element_to_append_to = document.getElementById('HeatMap');


				scope.$watch(function(){
					return scope.data;
				}, function(){
					if(scope.data)
					{
						var genesCopy = scope.data.allGenes.concat();
						genesCopy.shift();
						genesCopy.shift();
						var config = {
							data:genesCopy,
							container : dom_element_to_append_to
						};

						var hm = new window.d3_viz.HeatMap();//create
						hm.initialize(config);//initialize
						hm.render();//render
					}
				});
			}
		}//the directive definiton object
	}

})();
/**
 * Created by Shweta on 8/16/16.
 */
//angular directive for a text tool
(function(){
	"use strict";

	angular.module('dcbiApp.viz').directive('textTool', textTool);

	function textTool ()
	{
		return {
			restrict :'EA',
			templateUrl: 'textToolPartial.html',
			scope:{
				inheritedgene :'=',
				mutationmetrics:'=',
				copynumberdata:'=',
				type:'='
			},
			link :function ()
			{

			}
		}//the directive definiton object
	}
})();
/**
 * Created by Shweta on 8/16/16.
 */
(function(){
	"use strict";
	angular.module('dcbiApp.data', []);//registering the data module
	angular.module('dcbiApp.data').service('dataService',dataService);


	dataService.$inject = ['$q', '$rootScope', 'MUTATION', 'CCN'];
	function dataService ($q, $rootScope, MUTATION, CCN){
		var that = this;
		that.mutationMetrics;
		that.copyNumberData;

		/*this function processes the tabbed data format to give us a reusable json structure
		* */
		that.parseDataToObject = function(tabbedFormat,type)
		{

			var geneCollection = [];//flushing out for new loops

			//new lines//TODO figure out a way not to hard code indices
			var lines = tabbedFormat.split('\n');
			var dataType = lines[0];
			var metadata = lines[1];
			var geneIds = lines[2].split('\t');
			var values = lines[3].split('\t');

			var geneCount = geneIds.length;
			for(var i = 0; i < geneCount ; i++)
			{
				var obj = {};
				obj.id=i;
				obj.key = geneIds[i];
				obj.value = values[i];
				geneCollection[i] = obj;
			}

			if(type == MUTATION)
			{
				that.mutationMetrics  = {
					validMutations : _.filter(geneCollection, function(o){return !o.value.toString().match("NaN"); }),
					allGenes: geneCollection
				};
			}else if(type == CCN)
			{

				// todo: rather than multiple filter use single forloop to collect these information
				that.copyNumberData  = {
					deletedSingleCopy : _.filter(geneCollection, function(o){return o.value.toString().match("-1"); }),
					deletedBothCopies : _.filter(geneCollection, function(o){return o.value.toString().match("-2"); }),
					gainedSingleCopy : _.filter(geneCollection, function(o){return o.value.toString().match("1"); }),
					gainedBothCopies : _.filter(geneCollection, function(o){return o.value.toString().match("2"); }),
					noChange : _.filter(geneCollection, function(o){return o.value.toString().match("NA"); }),
					allGenes: geneCollection
				};
			}
		}
	}
})();
/**
 * Created by Shweta on 8/16/16.
 */
(function(){
	"use strict";
	//registers the data module of the dcbiApp
	//angular.module('dcbiApp.data', []);
})();
(function(){
	//this service will be used to use ANY RESt API.
	"use strict";
	angular.module('dcbiApp.data').service('queryService', queryService);


	queryService.$inject = ['$http', 'dataService', 'MUTATION', 'CCN', 'BOTH'];
	function queryService($http, dataService, MUTATION, CCN, BOTH)
	{
		var that = this;//storing this because refernce to 'this' is lost during a promise
		that.dataService = dataService;

		//creates the config required for making a web service request
		that.createRequest = function(gene,type)
		{
			if(gene.indexOf(' ') > 0){
				var re = / /g;
				gene = gene.replace(re,'+');
			}
			var ccnUrl = 'http://www.cbioportal.org/webservice.do?cmd=getProfileData&genetic_profile_id=gbm_tcga_gistic&id_type=gene_symbol&gene_list='+gene+'&case_set_id=gbm_tcga_cnaseq';
			var mutationUrl = 'http://www.cbioportal.org/webservice.do?cmd=getProfileData&genetic_profile_id=gbm_tcga_mutations&id_type=gene_symbol&gene_list='+gene+'&case_set_id=gbm_tcga_cnaseq';
			switch(type)
			{
				case MUTATION:
					that.makeRequest([mutationUrl], type);
					break;
				case CCN:
					that.makeRequest([ccnUrl], type);
					break;
				case BOTH:
					that.makeRequest([mutationUrl, ccnUrl], type);
					break;
			}

		};

		//the actual request(s)
		that.makeRequest = function (urls, type)
		{
			//make the appropriate number of web service calls
			var urlCounter = urls.length;
			for(var i=0; i< urlCounter; i++)
			{
				$http({
					method: 'GET',
					url:urls[i]
				}).then(function successCallback(response) {// this callback will be called asynchronously when the response is available

					that.dataService.parseDataToObject(response.data,type);

				}, function errorCallback(response) {// called asynchronously if an error occurs or server returns response with an error status.
					console.log("error", response);
				});
			}
		}



	}

})();