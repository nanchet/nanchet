var price = 108;

var ask = {};
var bid = {};
var askr = {};
var bidr = {};
var diff = 0;

var precision = 1;

var depthTime = new Date();
var priceTime = new Date();

var parseDepth = function (data) {
    depthTime = new Date(data.E);

    data.a.forEach(item => {
        ask[item[0]] = parseFloat(item[1]);
    });

    askr = Object.entries(ask)
        .sort(function (a, b) {
            return parseFloat(a[0]) - parseFloat(b[0]);
        })
        .reduce(function (carry, item,) {
            if (parseFloat(item[0]) > price) {
                var [i, f] = item[0].split('.');
                var v = i + '.' + f.substring(0, precision);

                carry[v] = (carry[v] ?? 0) + parseFloat(item[1]);
            }

            return carry;
        }, {});

    data.b.forEach(item => {
        bid[item[0]] = parseFloat(item[1]);
    });

    bidr = Object.entries(bid)
        .sort(function (a, b) {
            return parseFloat(b[0]) - parseFloat(a[0]);
        })
        .reduce(function (carry, item) {
            if (parseFloat(item[0]) < price) {
                var [i, f] = item[0].split('.');
                var v = i + '.' + f.substring(0, precision);

                carry[v] = (carry[v] ?? 0) + parseFloat(item[1]);
            }

            return carry;
        }, {});

    diff = Object.entries(askr)[0][1] - Object.entries(bidr)[0][1];

    updateChart();
}

var parsePrice = function (data) {
    priceTime = new Date(data.E);
    price = parseFloat(data.c);

    updateChart();
}