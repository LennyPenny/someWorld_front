import escape from "escape-html"

/**
 *Class used to modify the Console
 **/
class Console {
    constructor() {
        /***Stores the console div*/
        this.con = document.getElementById("conwrapper");
        this.input = document.getElementById("stdin");
        this.input.addEventListener("keyup", (e) => {
            if (e.keyCode == 13) {
                this.enter();
            }
        });

        this.callbacks = {};
    }

    /**
     * Prints text to the Console.
     * @param {string} text
     * @param {boolean} breakline
     **/
    print(text, breakline = true) {
        this.con.innerHTML += escape(text) + (breakline ? "<br>" : "");
    }

    /**
     * Gets the current input.
     * @return {string} input
     **/
    getinput() {
        return this.input.value;
    }

    /***Called when enter is hit from the console input*/
    enter() {
        this.callcallbacks(this.getinput());
        this.input.value = "";
        window.scroll(window.scrollX, document.body.scrollHeight);
    }

    addcallback(id, callback) {
        this.callbacks[id] = callback;
    }

    removecallback(id) {
        delete this.callbacks[id];
    }

    callcallbacks(...args) {
        for (let id of Object.keys(this.callbacks)) {
            this.callbacks[id](...args);
        }
    }
};

const instance = new Console();
export default instance;
