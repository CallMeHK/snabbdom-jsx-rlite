/** @jsx html */
import { html } from "snabbdom-jsx";
import { h } from "snabbdom";

const Greeting = props => <h3>Welcome {props.name}</h3>;

export { Greeting }