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

let currentNode = null;

const findAndReplaceKey = (node, key) => {
  console.log(node);
  let knode;

  if (node.key === key) {
    knode = node;
  } else {
    node.children.forEach(n => {
      if (n.key === key) {
        knode = n;
      } else {
        knode = findAndReplaceKey(n, key);
      }
    });
    return knode;
  }
};
// custom patch function to pass to components
const updateDOM = newNode => {
  if (newNode === false) {
    return findAndReplaceKey(currentNode, "app");
  }
  if (currentNode == null) {
    currentNode = document.querySelector("#app");
  }
  patch(currentNode, newNode);
  currentNode = newNode;
};

updateDOM(Body({ page: "home" }, updateDOM));
