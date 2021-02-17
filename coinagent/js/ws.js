function createWS(url, callback) {
    var connected = false;
    var ws = new WebSocket(url);

    ws.onopen = function() {
        console.log('OPENED: ' + url);
        connected = true;
    };

    ws.onclose = function() {
        if (ws) {
            console.log('CLOSING ...');
            ws.close();
        }
        connected = false;
    };

    ws.onmessage = function(event) {
        callback(event.data);
    };

    ws.onerror = function(event) {
        alert(event.data);
    };

    return ws;
}
