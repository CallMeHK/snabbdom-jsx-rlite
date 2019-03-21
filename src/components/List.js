/** @jsx html */
import { html } from "snabbdom-jsx";
import { h } from "snabbdom";

const Item = props => <li>{props.name}</li>;

const List = props => (
  <ul>
    {props.list.map(item => (
      <Item name={item} />
    ))}
  </ul>
);

export { List }