import escape from "escape-html"

/**
 *Class used to modify the Console
 **/
class ConsoleClass {
    constructor() {
        /***Stores the console div*/
        this.con = document.getElementById("conwrapper");
        /***Stores the input textbox*/
        this.input = document.getElementById("stdin");
        this.input.addEventListener("keyup", (e) => {
            if (e.keyCode == 13) {
                this.enter();
            }
        });

        /***Stores all of the callbacks*/
        this.callbacks = {};
    }

    /**
     * Makes the text appropiate for printing
     * @param {string} text
     * @return {string} text
     **/
    consolify(text) {
        return escape(text).replace(/\n/g, "<br/>");
    }

    /**
     * Prints text to the Console. Second argument is optional.
     * @param {string} text
     * @param {boolean} breakline
     **/
    print(text, breakline = true) {
        var span = document.createElement("span");
        span.innerHTML = this.consolify(text) + (breakline ? "<br>" : "");
        this.con.appendChild(span);
    }

    /**
     * Gets the current input
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

    /**
     * Adds callbacks that are called whem something is entered into the console
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

const Console = new ConsoleClass();
export default Console;
