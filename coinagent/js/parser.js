var price = 108;

var askr = [];
var bidr = [];
var diff = 0;

var precision = 1;

var depthTime = new Date();
var priceTime = new Date();

var parseDepth = function (data) {
    depthTime = new Date(data.E);

    askr = data.a
        .reduce(function (carry, item) {
            if (parseFloat(item[0]) > price) {
                var [i, f] = item[0].split('.');
                var v = i + '.' + f.substring(0, precision);
            
                carry[v] = (carry[v] ?? 0) + parseFloat(item[1]);
            }

            return carry;
        }, []);

    bidr = data.b
        .reduce(function (carry, item) {
            if (parseFloat(item[0]) < price) {
                var [i, f] = item[0].split('.');
                var v = i + '.' + f.substring(0, precision);
            
                carry[v] = (carry[v] ?? 0) + parseFloat(item[1]);
            }
        
            return carry;
        }, []);
    
    diff = Object.entries(askr)[0][1] - Object.entries(bidr)[0][1];

    updateChart();
}

var parsePrice = function (data) {
    priceTime = new Date(data.E);
    price = parseFloat(data.c);

    updateChart();
}