var depthWS;
var depthURL = 'wss://stream.binance.com:9443/ws/bnbeur@depth';
var depthCB = function (data) {
    parseDepth(JSON.parse(data));
    updateChart();
};

var tickWS;
var tickURL = 'wss://stream.binance.com:9443/ws/bnbeur@ticker'
var tickCB = function (data) {
    parsePrice(JSON.parse(data));
};

$(document).ready(function() {
    depthWS = createWS(depthURL, depthCB);
    tickWS = createWS(tickURL, tickCB);

    renderChart();
});