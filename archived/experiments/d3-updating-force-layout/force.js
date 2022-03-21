'use strict';

var json = [{
    name: "#boyinthedress"
}, {
    name: "#socialmatters"
}, {
    name: "#eastenders"
}, {
    name: "#happyvalley"
}, {
    name: "#bbcelections"
}, {
    name: "#tbt"
}, {
    name: "#yearzero"
}, {
    name: "#vote2014"
}, {
    name: "#fromtheretohere"
}, {
    name: "#nascar"
}, {
    name: "#yyc"
}, {
    name: "#stampede2014"
}, {
    name: "#yearzero"
}, {
    name: "#bettertogether"
}, {
    name: "#covertconcert"
}, {
    name: "#tbt"
}, {
    name: "#openhappiness"
}, {
    name: "#vote2014"
}, {
    name: "#eastenders"
}, ];

var data = [];
var colourScale = new window.d3.scale.category20();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateSvgWithElements() {
    var nodes = svg.selectAll(".node");

    nodes = nodes.data(data);

    var g = nodes.enter()
        .append('g')
        .attr('class', 'node');

    g.append('circle')
        .attr("fill", function() {
            return colourScale(getRandomInt(0, 19));
        })
        .attr("r", function(d) {
            return d.radius;
        });

    g.append('text')
        .text(function(d) {
            return d.name;
        }).style('text-anchor', 'middle');
}

function tick(e) {
    var nodes = svg.selectAll('.node')
        .data(data); //the update selection

    nodes.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });
}

var svg = window.d3.select('body').selectAll('svg');

//add random radii
json.forEach(function(d) {
    d.radius = getRandomInt(20, 60);
});

// 1. setup the force layout
//The general pattern for constructing force-directed layouts is to set all the configuration properties, and then call start:
var force = window.d3.layout.force()
    .nodes(data)
    .charge(function(d) {
        return d.radius * -30;
    })
    .gravity(0.2)
    .size([970, 540])
    .on("tick", tick); //on each tick of the animation each node will get updated x and y properties

//2. position your elements (ready for the force animation to run)
updateSvgWithElements();

//3. start the animation
force.start();

var interval = window.setInterval(function() {
    if (json.length === 0) {
        return window.clearInterval(interval);
    }
    data.push(json.shift());

    updateSvgWithElements();

    force.start(); //run the force layout with the updated data array
}, 1000);