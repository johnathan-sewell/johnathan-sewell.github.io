    // initialise a box with a top left coordiante, and a bottom right coordinate
    function GeometricBox(x1, y1, x2, y2) {
        if (!_.isNumber(x1) || isNaN(x1) || !_.isFinite(x1)) {
            throw new Error('x1 must be a valid numeric coordinate');
        }
        if (!_.isNumber(x2) || isNaN(x2) || !_.isFinite(x2)) {
            throw new Error('x2 must be a valid numeric coordinate');
        }
        if (!_.isNumber(y1) || isNaN(y1) || !_.isFinite(y1)) {
            throw new Error('y1 must be a valid numeric coordinate');
        }
        if (!_.isNumber(y2) || isNaN(y2) || !_.isFinite(y2)) {
            throw new Error('y2 must be a valid numeric coordinate');
        }
        if (x1 >= x2 || y1 >= y2) {
            throw new Error('invalid coordinates for a box');
        }
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    GeometricBox.prototype.width = function() {
        return this.x2 - this.x1;
    };
    GeometricBox.prototype.height = function() {
        return this.y2 - this.y1;
    };
    GeometricBox.prototype.intersects = function(box) {
        var noHorizontalIntersect,
            noVerticalIntersect;

        //check for overlap
        // http://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other
        noHorizontalIntersect = (box.x1 > this.x2 || box.x2 < this.x1);
        noVerticalIntersect = (box.y1 > this.y2 || box.y2 < this.y1);
        return !(noVerticalIntersect || noHorizontalIntersect);
    };