import Console from "lib/console";
import Connector from "lib/connector";
import Timer from "timer.js";
import art from "ascii-art";

Console.print("Welcome to some World.\n\n");

Console.print("Connecting to some world", false);
var connectiontimer = new Timer({
    tick: 1,
    ontick: (sec) =>{ Console.print(".", false); },
    onstop: () => {Console.print(".");},
    onend: () => {Console.print("Something went really wrong, maybe reload")}
}).start(60);

Connector.connect().then(() => {
    connectiontimer.stop()
    Console.print("Success!");
}).catch(() => {
    connectiontimer.stop();
    Console.print("Failed to connect to some World.");
    Console.print("Try reloading the page.");
});
