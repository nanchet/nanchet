var price = 108;
var priceUp;
var priceDown;

var ask = {};
var bid = {};
var askr = {};
var bidr = {};
var diff = 0;

var percent = 1;
var precision = 2;

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
        .filter(function (item) {
            return (parseFloat(item[1]) !== 0
                && parseFloat(item[0]) > price
                && parseFloat(item[0]) < priceUp);
        })
        .reduce(function (carry, item) {
            return carry + parseFloat(item[1]);
        }, 0);

    data.b.forEach(item => {
        bid[item[0]] = parseFloat(item[1]);
    });

    bidr = Object.entries(bid)
        .sort(function (a, b) {
            return parseFloat(b[0]) - parseFloat(a[0]);
        })
        .filter(function (item) {
            return (parseFloat(item[1]) !== 0
                && parseFloat(item[0]) < price
                && parseFloat(item[0]) > priceDown);
        })
        .reduce(function (carry, item) {
            return carry + parseFloat(item[1]);
        }, 0);

    diff = askr - bidr;
}

var parsePrice = function (data) {
    priceTime = new Date(data.E);
    price = parseFloat(data.c);

    priceUp = price * ((percent / 100) + 1);
    priceDown = price / ((percent / 100) + 1);
}