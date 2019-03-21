/** @jsx html */
import { html } from "snabbdom-jsx";
import { h } from "snabbdom";
import { List } from "./List";
import { Greeting } from "./Greeting";

const Body = (props) => {
  function onClick() {
    let newItem = ["beer", "cheese", "soup"][Math.floor(Math.random() * 2.999)];
    props.updateDOM(<Body list={[...props.list, newItem]} updateDOM={props.updateDOM} key={'app'}/>, "app");
  }
  return (
    <div>
      <Greeting name="Ty" />
      <button on-click={onClick}>Add Item</button>
      <p>this is like, writing react, which is super cool.</p>
      <List list={props.list} />
    </div>
  );
};

export { Body };
