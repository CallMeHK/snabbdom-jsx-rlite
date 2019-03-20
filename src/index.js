import { init } from "snabbdom";
import rlite from "rlite-router";
import { App, Boop, Error, Body } from "./components";
import "../styles.css";

const patch = init([
  require("snabbdom/modules/class").default, // makes it easy to toggle classes
  require("snabbdom/modules/props").default, // for setting properties on DOM elements
  require("snabbdom/modules/style").default, // handles styling on elements with support for animations
  require("snabbdom/modules/eventlisteners").default // attaches event listeners
]);

function setToValue(obj, value, path) {
  let i;
  for (i = 0; i < path.length - 1; i++)
      obj = obj[path[i]];

  obj[path[i]] = value;
}

let currentNode = null;
// const currentNodeConst = () => Object.create(currentNode)
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
// custom patch function to pass to components
const updateDOM = (newNode, key) => {
  if (key) {
    newNode = findAndReplaceKey(JSON.parse(JSON.stringify(currentNode)), "app", [], newNode);
  } 
  if (currentNode == null) {
    currentNode = document.querySelector("#app");
  }
  patch(currentNode, newNode);
  currentNode = newNode;
};

updateDOM(Body({ page: "home" }, updateDOM));
