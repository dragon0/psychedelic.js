function X(x, y){ return x; }; X.toString = function(){ return 'x'; };

function Y(x, y){ return y; }; Y.toString = function(){ return 'y'; };

function Sin(expr){
    var f = function(x, y){ return Math.sin(Math.PI * expr(x, y)); }
    f.toString = function(){return "Math.sin(Math.PI * " +expr.toString()+ ")"}
    return f;
}

function Cos(expr){
    var f = function(x, y){ return Math.cos(Math.PI * expr(x, y)); }
    f.toString = function(){return "Math.cos(Math.PI * " +expr.toString()+ ")"}
    return f;
}

function Times(lhs, rhs){
    var f = function(x, y){ return lhs(x, y) * rhs(x, y); }
    f.toString = function(){return lhs.toString() + " * " + rhs.toString()}
    return f;
}

function buildExpr(prob){
    prob = (prob != undefined)? prob: 0.99;
    if(Math.random() < prob){
        func = Math.ceil(Math.random() * 3);
        switch(func){
            case 1: return Sin(buildExpr(prob*prob));
            case 2: return Cos(buildExpr(prob*prob));
            case 3: return Times(buildExpr(prob*prob), buildExpr(prob*prob));
        }
    }
    else{
        return (Math.random() < 0.5) ? X : Y;
    }
}

function makeImage(pixelsPerUnit, redExpr, greenExpr, blueExpr){
    pixelsPerUnit = pixelsPerUnit || 150;
    var canvasWidth = 2 * pixelsPerUnit;
    var pixbuf = [];
    for(var i = 0; i < canvasWidth; i++){
        var row = [];
        pixbuf.push(row);
        for(var j = 0; j < canvasWidth; j++){
            // transform to range [-1, 1]
            var x = (j - pixelsPerUnit) / pixelsPerUnit
            var y = (i - pixelsPerUnit) / pixelsPerUnit
            var r = redExpr(x, y);
            var g = greenExpr(x, y);
            var b = blueExpr(x, y);
            // transform from range [-1, 1] to [0, 255]
            r = Math.floor(r * 127.5 + 127.5);
            g = Math.floor(g * 127.5 + 127.5);
            b = Math.floor(b * 127.5 + 127.5);
            row.push([r, g, b]);
        }
    }
    return {pixbuf, redExpr, greenExpr, blueExpr};
}

