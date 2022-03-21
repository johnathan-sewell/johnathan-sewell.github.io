'use strict';

(function(d3) {
    var nodes = [{
        name: 'HTML5',
        volume: 50
    }, {
        name: 'CSS3',
        volume: 60
    }, {
        name: 'JSON',
        volume: 30
    }, {
        name: 'JavaScript',
        volume: 40
    }, {
        name: 'd3.js',
        volume: 50
    }, {
        name: 'svg',
        volume: 50
    }];

    var topics = [{
        name: 'History API'
    }, {
        name: 'Canvas'
    }, {
        name: 'Offline'
    }, {
        name: 'JavaScript daily'
    }, {
        name: 'Rounded corners'
    }, {
        name: 'Transitions'
    }, {
        name: 'AJAX'
    }, {
        name: 'Transmit Data'
    }, {
        name: 'Mike Bostock'
    }, {
        name: 'Data Visualisation'
    }, {
        name: 'XML-based vector image format'
    }];

    var links = [{
        source: 0,
        target: nodes.length + 0
    }, {
        source: 0,
        target: nodes.length + 1
    }, {
        source: 0,
        target: nodes.length + 2
    }, {
        source: 1,
        target: nodes.length + 3
    }, {
        source: 1,
        target: nodes.length + 4
    }, {
        source: 1,
        target: nodes.length + 5
    }, {
        source: 2,
        target: nodes.length + 3
    }, {
        source: 2,
        target: nodes.length + 6
    }, {
        source: 2,
        target: nodes.length + 7
    }, {
        source: 3,
        target: nodes.length + 3
    }, {
        source: 3,
        target: nodes.length + 6
    }, {
        source: 4,
        target: nodes.length + 8
    }, {
        source: 4,
        target: nodes.length + 9
    }, {
        source: 5,
        target: nodes.length + 9
    }, {
        source: 5,
        target: nodes.length + 10
    }];

    var color = d3.scale.category20();

    var svg = d3.select('svg');

    var force = d3.layout.force()
        .charge(-1000)
        .size([svg.attr('width'), svg.attr('height')])
        .nodes(nodes.concat(topics))
        .links(links)
        .linkDistance(100)
        .start();

    var link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link')
        .style('stroke-width', function(d) {
            return Math.sqrt(d.value);
        }).style('stroke', function(d) {
            return color(d.source.index);
        });

    var node = svg.selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .call(force.drag);

    node.append('circle')
        .attr('r', function(d) {
            return d.volume;
        })
        .style('fill', function(d, i) {
            return color(i);
        });

    node.append('text')
        .text(function(d) {
            return d.name;
        })
        .attr('text-anchor', 'middle');

    var topic = svg.selectAll('.topic')
        .data(topics)
        .enter()
        .append('g')
        .attr('class', 'topic')
        .call(force.drag);

    topic.append('text')
        .text(function(d) {
            return d.name;
        })
        .attr('text-anchor', 'middle');


    force.on('tick', function() {
        link.attr('x1', function(d) {
            return d.source.x;
        })
            .attr('y1', function(d) {
                return d.source.y;
            })
            .attr('x2', function(d) {
                return d.target.x;
            })
            .attr('y2', function(d) {
                return d.target.y;
            });

        node.attr('transform', function(d) {
            return 'translate(' + d.x + ', ' + d.y + ')';
        });

        topic.attr('transform', function(d) {
            return 'translate(' + d.x + ', ' + d.y + ')';
        });

    });
})(window.d3);