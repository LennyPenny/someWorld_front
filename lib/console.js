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
                console.log("asdasd");
                this.enter();
                this.input.value = "";
            }
        });
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
        this.print(this.getinput());
    }


};

const instance = new Console();
export default instance;
