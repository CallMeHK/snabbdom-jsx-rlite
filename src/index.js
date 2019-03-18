import { init } from "snabbdom";
import rlite from "rlite-router";
import { App, Boop, Error, Body } from "./components";
import '../styles.css';


const patch = init([
  require("snabbdom/modules/class").default, // makes it easy to toggle classes
  require("snabbdom/modules/props").default, // for setting properties on DOM elements
  require("snabbdom/modules/style").default, // handles styling on elements with support for animations
  require("snabbdom/modules/eventlisteners").default // attaches event listeners
]);

let currentNode = null;
// custom patch function to pass to components
const updateDOM = newNode => {
  if (currentNode == null) {
    currentNode = document.querySelector("#app");
  }
  patch(currentNode, newNode);
  currentNode = newNode;
};

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
