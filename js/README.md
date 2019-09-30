# Javascript
It's difficult to summerize an entire language brefly, but here are a few important things to know about Javascript:
* Javascript is not strictly object-oriented, though internally almost everything is treated like an object.
* Javascript is loosley typed.
* Javascript is interpreted
* Javascript is single-threaded and uses an event-loop to acheive the appearance of multi-threading.
* You can input Javascript directly into your browsers inspect element console to test simple statements if you're unsure of how something will work.
* The super technical name for Javascript is ECMAScript or ES.

Here is the basic syntax:
```javascript
let myVariable = "true";
let yourVariable = 1;

let myArray = [1, 2, 3, 4];
myArray[0]; //This would parse to 1 because CS indexing

let myJSONObject = {"name":"Jason", "recursion":{"survey-says":true}}l;
myJSONObject["name"]; //Jason
myJSONObject["recursion"]["survey-says"]; //true

if(myVariable == yourVariable){
    console.log("1. True");
}
```
This outputs 
```javascript
1. True
``` 
because Javascript is loosley typed and dynamically casts the values to equivalent booleans (true).

---

# Mithril.JS
Mithril is a Javascript framework for building single page applications. IE; when the user clicks around they never actually load a different page. The page may change completetly, but all the changes are generated locally rather than loading an entire different page from the webserver. Javascript may request information from the server which is used in rendering the page, but the client never actually navigates away from the original page.

### Key Concepts
* DOM
* Virtual DOM & Vnodes
* Components
* Autoredraw

---

### DOM - Document Object Model
[DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) is a way of portraying markup langauges like HTML and XML such that other programming languages can interface with them. For the purposes of web development, the DOM is effectivly an object that represents everythign rendered to the page. The DOM can be though of a free or a JSON object and will contain all properties of all the elements on the page; styling, attributes, tag types, and hierarchy.

[A web browser works](https://blog.logrocket.com/how-browser-rendering-works-behind-the-scenes-6782b0e8fb10/) by parsing .HTML files it receives to generate the DOM, and then it uses the DOM to generate the webpage which users see. After the initial page load, any changes to the DOM will generally trigger a complete reconstruction of the DOM tree and then a redrawing of the webpage.

### Virtual DOM
The [virtual DOM](https://mithril.js.org/vnodes.html) is a concept specific to Mithril. The virtual DOM is a copy of the actual DOM that Mithril uses as a sort of working space. Modifying the actual DOM is a computationally expensive process, where as modifying the virtual DOM is computationally cheap. With this, Mithril will makes changes to the virtual DOM it maintains, and use an efficient differentiation algorithim to make "batched" and "precies" changes to the actual DOM. 

The actual DOM is made of nodes and the virtual DOM is made of virtual nodes or vnodes. A node is essentially an the objective representation of a visual element on the screen. IE; a paragraph of text, an image, a header, etc. In Mithril the `m()` function is used to create virtual DOM elements that Mithril will use in its virtual DOM.

###### Models
The `models` folder is for functional elements of the page - IE things that do something which is not seen. Primarly, these are data objects or networking objects that communicate with the backend. 

###### Views
The `views` folder is for viewable elements of the page - IE components with a `view` method. Many of these elements will get their data values from `models`.

### Components
In this context, [components](https://mithril.js.org/components.html) are also a Mithril term. A component is an object that can be rendered to a virtual DOM node. This just means it as a `view: () => {}` function attatched to it that returns a vnode (`return m(...something...);`). It is useful to package vnodes into components because components can be used to tie logic or state to vnodes. A trivial, but effective example is a counter that incriments everytime a user clicks a button. A variable tracking the number of times the button has been clicked and the function which incriments that counter can be attatched to the component.

### Auto Redraw
The [auto redraw system](https://mithril.js.org/autoredraw.html) is also a Mithril concept. Essentially, whenever something meaningful changes in the application, Mithril will regenerate the virtual DOM and run the diffing algorithm to check if the page needs to be updated. See the official Mithril documentation for exactly what events trigger a redraw, but odds are if you need it to happen, Mithril will do it automatically. If it is not redrawing automatically, you're missusing something.