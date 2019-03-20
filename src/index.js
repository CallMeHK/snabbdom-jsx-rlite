import { init } from "snabbdom";
import rlite from "rlite-router";
import { App, Boop, Error, Body } from "./components";
import "../styles.css";

// Patching function with class, props, style, and event listeners
const patch = init([
  require("snabbdom/modules/class").default, // makes it easy to toggle classes
  require("snabbdom/modules/props").default, // for setting properties on DOM elements
  require("snabbdom/modules/style").default, // handles styling on elements with support for animations
  require("snabbdom/modules/eventlisteners").default // attaches event listeners
]);

// Utility function for finding and replacing path to thing in json
function setToValue(obj, value, path) {
  let i;
  for (i = 0; i < path.length - 1; i++)
      obj = obj[path[i]];

  obj[path[i]] = value;
}

// This is the current node of the application for patching, do not 
// mutate in other funcs
let currentNode = null;

// This find and replace function uses current node, a comp, and a key 
// to find and create a new stupid vdom for diffing.  
const findAndReplaceKey = (node, key, path, comp) => {
  let newNode
  if (node.key === "app") {
    newNode = JSON.parse(JSON.stringify(currentNode))
    setToValue(newNode, comp, path)
  } else {
    if (node.children !== undefined) {
      node.children.forEach((n, i) => {
        newNode = findAndReplaceKey(n, key, [...path, 'children', i],comp);
      });
    }
  }
  return newNode
};

// Patch function that takes a new node and optionally, a key.  if a key 
// is provided, adjusts current vdom instead
const updateDOM = (newNode, key) => {
  // if passed a key, find and replace the key in currentNode with the provided component
  if (key) {
    newNode = findAndReplaceKey(JSON.parse(JSON.stringify(currentNode)), "app", [], newNode);
  } 
  //if currentnode is null, go replace div#app
  if (currentNode == null) {
    currentNode = document.querySelector("#app");
  }
  // patch dom, then set current node to new node
  patch(currentNode, newNode);
  currentNode = newNode;
};

//updateDOM(Body({ page: "home" }, updateDOM));
const route = rlite(notFound, {
  // Default route
  "": function() {
    return updateDOM(Body({page:'home'},updateDOM))
  },
  // #inbox
  boop: function() {
    return updateDOM(Body({page:'nothome'},updateDOM))
  }
});

function notFound() {
  return updateDOM(Error())
}

// Hash-based routing
function processHash() {
  const hash = location.hash || "#";

  // Do something useful with the result of the route
  route(hash.slice(1));
  //run()
}

window.addEventListener("hashchange", processHash);
processHash();