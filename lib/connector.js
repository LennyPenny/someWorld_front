import WebSocket from "ws";

/**
 * Class used to manage the websocket connection to some world. It's your gate
 **/
class ConnectorClass {
    constructor() {
        /** Stores whether we are connected*/
        this.connected = false;

        /***Stores all of the callbacks*/
        this.callbacks = {};
    }

    /**
     * Tries to connect to some world. Returns a promise that resolves upon connection.
     * @return {Promise} promise
     **/
    connect() {
        if (this.ws) {
            this.ws.close();
            delete this.ws;
        }

        var host = window.document.location.host.replace(/:.*/, "");
        if (host != "127.0.0.1")
            host = "ws" + host;

        /** stores the websocket*/
        this.ws = new WebSocket("ws://" + host + ":1337");
        this.ws.onmessage = (msg) => {
            this.callcallbacks(msg.data);
        }
        return new Promise((resolve, reject) => {
            this.ws.onopen = () => {
                this.connected = true;
                resolve();
            };
        });
    }

    /**
     * Disconnects from some World.
     * @return {Promise} Resolves upon closing
     **/
    disconnect() {
        return new Promise((resolve, reject) => {
            if (this.ws && this.ws.readyState == WebSocket.OPEN) {
                this.ws.onclose = () => {
                    this.connected = false;
                    resolve();
                }
                this.ws.close();
            } else {
                reject("No conncetion to close");
            }
        });
    }

    /**
     * Sends something to some World
     * @arg {String} Text to send
     **/
    send(text) {
        if (this.isconnected())
            this.ws.send(text)
    }

    /**
     * Returns whether you are connected to some world.
     * @return {boolean} isconnected
     **/
    isconnected() {
        return this.connected;
    }

    /**
     * Adds callbacks that are called whem something is received from some World
     * @param {string} id
     * @param {function} callback
     **/
    addcallback(id, callback) {
        this.callbacks[id] = callback;
    }

    /**
     * Removes a callback
     * @param {string} id
     **/
    removecallback(id) {
        delete this.callbacks[id];
    }

    /**
     * Calls all callbacks with a variable amount of arguments
     * @param args
     **/
    callcallbacks(...args) {
        for (let id of Object.keys(this.callbacks)) {
            this.callbacks[id](...args);
        }
    }
};

var Connector = new ConnectorClass();
export default Connector;
