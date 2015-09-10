/**
 * Created by Shweta on 9/9/2015.
 */
if (!this.d3_viz)
    this.d3_viz = {};
(function(){
    //constructor
    function planetarium (){
        this._svg ;
        this._t0;
        this._margin;
        this._width;
        this._height;
        this._container;
        this._home;
        this._menuOptions;

    }

    window.d3_viz.planetarium = planetarium;

    var p = planetarium.prototype;

    p.initialize_planetarium = function (config){
        this._margin =  {top: 20, right: 20, bottom: 20, left: 20};
        this._container = config.container;
        this._width = this._container.offsetWidth - this._margin.left - this._margin.right;
        this._height = this._container.offsetHeight - this._margin.top - this._margin.bottom;
        this._menuOptions = config.menu_Options;
        this._home = config.home;

        this._svg = d3.select(this._container).insert('svg')
            .attr('width', this._width)
            .attr('height', this._height);

        //this._svg.append('circle')
        //    .attr("r", this._home.r)
        //    .attr("cx", this._width/2)
        //    .attr("cy", this._height/2)
        //    .attr("fill", this._home.color)
        //this._svg.append('g')
        //    .attr("x", this._width/2)
        //    .attr("y", this._height/2)
        //    .attr("width", 20).attr("height", 20)
        //    .append("span")
        //    .attr("class", "fa fa-home");

    };

    p.render_planetarium = function (){
       var pl = this;
        pl._t0 = Date.now();

       pl._container = pl._svg.append('g')
            .attr("transform", "translate(" + pl._width/2 + "," + pl._height/2 + ")");

        //pl._container.append('g')
        //    .attr("x", this._width/2)
        //    .attr("y", this._height/2)
        //    .attr("width", "20px").attr("height", "20px")
        //    .append("span")
        //    .attr("class", "fa fa-home");

        var g = pl._container.selectAll('g.menuOpts').data(pl._menuOptions).enter()
            .append('g')//this g contains the menu circles and their labels
            .on("mouseover", pl.stop_animation)
            .on("mouseout", pl.start_animation);

           g.each(function(d){
                d3.select(this).append('circle').attr('class', 'menuOrbits').attr("r", d.R );
                d3.select(this).append('g').attr('id', 'menuG')
                    .append('circle').attr("id", "menuC")
                    .attr("r", d.r).attr('cx', d.R).attr('cy', 0).attr("fill", d.color);

            });

        d3.timer(function() {
            var delta = (Date.now() - pl._t0);
            pl._svg.selectAll("#menuC").attr("transform", function(d) {
                return "rotate(" + d.phi0 + delta* d.speed/400 + ")";
            });
        })
    };
    p.start_animation = function (){
        var mc = d3.select(this).selectAll('#menuC');
        mc.transition().duration(1000).attr('r', function(d){return d.r; });
        d3.selectAll("text").remove();
    };

    p.stop_animation = function (){
        var mc = d3.select(this).selectAll('#menuC');
        var mg = d3.select(this).selectAll('#menuG');
        mc.transition().attr('r', 30);
        mg.append("text").text(function(d){return d.text})
            .attr('fill', (function(d){return d.color}))
            .attr('class', 'menuFonts');//appending text to g not circle
    };

})();