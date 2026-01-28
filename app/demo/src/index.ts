/*
Use MVC extended framework to storage model.
*/
// 1. Import mvc-extended-framework
import MVC, { Proxy, Service } from "mvc-extended-framework";

console.log(window === MVC.window);
console.log(MVC.uid);
// 2. Declare proxy class.
class ContentProxy extends Proxy {
    text: string = ""
    set($args: string): any {
        this.text = $args.replace(/ /g, "_");
    }

    getText(): any {
        return this.text;
    }
}

class BroadcastService extends Service {
    // Declare member variable
    channel : BroadcastChannel = null;

    // Constructor
    constructor() {
        super()
        this.channel = new BroadcastChannel(`${this.name}-${MVC.uid}`);
        if ( window === MVC.window ) {
            this.channel.onmessage = (e) => {
                this.receive(e);
            }
        }
    }

    send($args: string): any {
        if ( this.channel !== null ) {
            console.log(`BroadcastService send : ${$args}`);
            this.channel.postMessage($args);
        }
    }

    receive($args: any): any {
        console.log(`BroadcastService received : ${$args.data}`);
        MVC.op("ContentProxy", "set", $args.data);
    }
}

// 3. Register proxy to MVC
MVC.register(new ContentProxy());
MVC.register(new BroadcastService());
// console.log(MVC.model.size);
// console.log(MVC.model.has("ContentProxy"));

/*
Input and Output operation.
*/

// Get a reference to the input element
const inputForm: any = document.getElementById('input');
// Get a reference to the output div
const outputDiv: any = document.getElementById('output');

let content: string = ""

// Add an event listener for the 'submit' event
inputForm.addEventListener('submit', function (event: any) {
    // 1. Prevent the default form submission behavior
    event.preventDefault();

    // 2. Get the values from the form inputs
    const contentInput: any = document.getElementById('content');
    content = contentInput.value;

    // 3. Process the data (e.g., log to console, display in UI, send to server)
    console.log('Form Submitted!');
    console.log('Content:', content);

    // 4. Setting value into content proxy
    MVC.op("ContentProxy", "set", content);
    MVC.op("BroadcastService", "send", content);
});

// Declare update UI function
async function updateOutput() {
    let text: any = await MVC.op("ContentProxy", "getText");
    outputDiv.innerHTML = `
        <p>${text}</p>
    `;
}

// Set interval to call update every 33ms (1/30 second)
const intervalId: any = setInterval(updateOutput, 33);

/*
Cross page communication operation.
*/

// Get a reference to the open-iframe button
const opi: any = document.getElementById('open-iframe');
// Get a reference to the open-page button
const opp: any = document.getElementById('open-page');

// Add an event listener for the 'submit' event
opi.addEventListener('click', function (event: any) {
    // 1. Prevent the default form submission behavior
    event.preventDefault();

    // 2. Get the iframe block
    const ib: any = document.getElementById('iframe-block');

    // 3. Update element html and insert iframe element.
    ib.innerHTML = `
        <iframe src="./index.html" style="width: 95vw; height: 65vh;"></iframe>
    `;
});

opp.addEventListener('click', function (event: any) {
    // 1. Prevent the default form submission behavior
    event.preventDefault();

    // 2. Open new page by window
    window.open("./index.html", "_blank");
});
