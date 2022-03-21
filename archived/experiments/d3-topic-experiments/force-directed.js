'use strict';

(function(d3) {
    var nodes = [{
        name: 'a'
    }, {
        name: 'b'
    }, {
        name: 'c'
    }, {
        name: 'd'
    }];
    var links = [{
        source: 0,
        target: 1
    }, {
        source: 0,
        target: 2
    }, {
        source: 2,
        target: 3
    }];

    var color = d3.scale.category20();

    var svg = d3.select('svg');

    var force = d3.layout.force()
        .charge(-1000)
        .size([svg.attr('width'), svg.attr('height')])
        .nodes(nodes)
        .links(links)
        .linkDistance(50)
        .start();

    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) {
            return Math.sqrt(d.value);
        });

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 10)
        .style("fill", function(d) {
            return color(d.group);
        })
        .call(force.drag);

    node.append("title")
        .text(function(d) {
            return d.name;
        });

    force.on("tick", function() {
        link.attr("x1", function(d) {
            return d.source.x;
        })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });

        node.attr("cx", function(d) {
            return d.x;
        })
            .attr("cy", function(d) {
                return d.y;
            });
    });
})(window.d3);