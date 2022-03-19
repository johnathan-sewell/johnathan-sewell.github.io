'use strict';

var data = {
    name: parent,
    children: [{
        name: "#boyinthedress",
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
    }, {
        name: "#boyinthedress",
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
    }]
};

//add random radii
data.children.forEach(function(d) {
    d.radius = getRandomInt(10, 45);
});

var colourScale = new window.d3.scale.category20b();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var svg = window.d3.select('body').selectAll('svg');

// 1. setup the layout
var pack = window.d3.layout.pack()
    .size([970, 540])
    .value(function(d) {
        return d.radius;
    })
    .sort(function comparator(a, b) {
        return b.value - a.value;
    });

var packedData = pack.nodes(data);

//2. position your elements (ready for the force animation to run)
var nodes = svg.selectAll(".node")
    .data(packedData)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr("fill", function() {
        return colourScale(getRandomInt(0, 19));
    })
    .attr("r", function(d) {
        return d.radius;
    }).attr('cx', function(d) {
        return d.x;
    }).attr('cy', function(d) {
        return d.y;
    });