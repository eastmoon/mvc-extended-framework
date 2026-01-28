/*
Singleton pattern.

ref: https://en.wikipedia.org/wiki/Singleton_pattern
author: jacky.chen
*/

// Declare module variable
let instances : { [key: string]: Singleton } = {};
let rootWin : any = null;
let uid : string = btoa("SingletonRetrieveInstances");

// Declare function
// Cross iframe page singleton pattern
// 0. Define retrieve root window function
function getRootWindow() {
    let win: any = ( typeof window === "undefined" ) ? null : window;
    if ( win !== null ) {
        try {
            // 0. declared variable
            let doc: any = document;
            // let par = win.parent.document;
            let par: any = win.parent.document;
            // 1. find root document.
            while (doc !== par) {
                win = win.parent;
                doc = par;
                par = win.parent.document;
            }
        } catch (err) {
            // error code : 18, SecurtityError, webkit cross cross domain error. When website call parent, but parent is webkit.
            console.log(err)
        }
    }
    return win;
}

// 1. Define retrieve instance mapping object function.
// 1-1. using root window to saving all singleton class instance.
// 1-2. every iframe have one singleton class, and it need  retrieve instance mapping object from root window.
interface SingletonInstances {
  instances: any;
}

function getRootInstance() {
    // f0. declared variable
    const win: any = getRootWindow();
    let result: any = instances;
    if (win) {
        // let firstCreateFlag = false;
        console.log(uid);
        const event = new CustomEvent<SingletonInstances>(uid, {
          detail: { instances: null}
        });
        if (win === window) {
            // f1. if owner window is root, add event listancer
            // f1-1. create root instance mapping
            result = instances;
            // f1-2. add event listancer, that children could retrieve instance mapping
            win.addEventListener(event.type, ($event: CustomEvent<SingletonInstances>) => {
                $event.detail.instances = instances;
            });
        } else {
            // f2. if owner window is not root, retrieve instance mapping from root by custom event.
            // f2-1. retrieve instance mapping object, if right window is children window.
            win.dispatchEvent(event);
            result = event.detail.instances;
        }
    }
    return result;
}

// If window exist then retrieve instance from root window.
rootWin = getRootWindow();
if ( rootWin !== null ) {
    uid = btoa(`${navigator.userAgent}, ${navigator.languages}, ${new Date().getTimezoneOffset()}, ${window.navigator.platform}`);
    instances = getRootInstance();
}

// Singleton class
export default class Singleton {
    // Declare constructor function
    constructor() {
        // Set object isn't first create
        // Make sure every time new object will be the same instance
        // In here, this is instance object.
        if (typeof instances[this.constructor.name] === "undefined" || instances[this.constructor.name] === null) {
            instances[this.constructor.name] = this;
        }
        return instances[this.constructor.name];
    }

    // Declare static accessor
    static get instance() : any {
        // Class.instance, use static attribute to retrieve instance
        if (typeof instances[this.name] === "undefined" || instances[this.name] === null) {
            instances[this.name] = new this();
        }
        return instances[this.name];
    }
    static get window() : any {
        return rootWin;
    }
    static get uid() : any {
        return uid;
    }
}
