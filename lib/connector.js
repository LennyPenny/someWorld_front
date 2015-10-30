import WebSocket from "ws";

/**
 * Class used to manage the websocket connection to some world. It's your gate
 **/
class ConnectorClass {
    constructor() {
        /** Stores whether we are connected*/
        this.connected = false;
    }

    /**
     * Tries to connect to some world. Returns a promise that resolves upon connection.
     * @return {Promise} promise
     **/
    connect() {
        if (this.ws) {

        }

        var host = window.document.location.host.replace(/:.*/, "");
        /** stores the websocket*/
        this.ws = new WebSocket("ws://" + host + ":1337");

        return new Promise((resolve, reject) => {
            this.ws.onopen = () => {
                this.connected = true;
                resolve();
            };
        });
    }

    /**
     * Returns whether you are connected to some world.
     * @return {boolean} isconnected
     **/
    isconnected() {
        return this.connected;
    }
};

var Connector = new ConnectorClass();
export default Connector;
