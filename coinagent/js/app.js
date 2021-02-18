var symbol = 'bnbeur';

var depthWS;
var depthURL = 'wss://stream.binance.com:9443/ws/' + symbol + '@depth';
var depthCB = function (data) {
    parseDepth(JSON.parse(data));
};

var tickWS;
var tickURL = 'wss://stream.binance.com:9443/ws/' + symbol + '@ticker';
var tickCB = function (data) {
    parsePrice(JSON.parse(data));
};

$(document).ready(function () {
    depthWS = createWS(depthURL, depthCB);
    tickWS = createWS(tickURL, tickCB);

    renderChart();
});