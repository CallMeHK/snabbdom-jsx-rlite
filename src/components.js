/** @jsx html */
import { html } from "snabbdom-jsx";
import { h } from "snabbdom";
const Greeting = props => <h3>Welcome {props.name}</h3>;
const Item = props => <li>{props.name}</li>;
const List = props => (
  <ul>
    {props.list.map(item => (
      <Item name={item} />
    ))}
  </ul>
);
const App = (props, updateDOM) => {
  function onClick() {
    let newItem = ["beer", "cheese", "soup"][Math.floor(Math.random() * 2.999)];
    updateDOM(App({ list: [...props.list, newItem] }, updateDOM), 'app');
  }
  return (
    <div key='app'>
      <Greeting name="Ty" />
      <button on-click={onClick}>Add Item</button>
      <p>this is like, writing react, which is super cool.</p>
      <List list={props.list} />
    </div>
  );
};
const Boop = () => <h1>BOOP</h1>;
const Error = () => <h1>404 Not found :/</h1>;
const Header = () => (
  <ul>
    <li>
      <a href="./#/">HOME</a>
    </li>
    <li>
      <a href="./#/boop">BOOP</a>
    </li>
  </ul>
);
const Body = (props,updateDOM) => <div id ='app'>
<Header/>
{props.page ==='home' ? App({list: ['beer','cheese','soup']},updateDOM) : <Boop/>}
</div>
export { App, Boop, Error, Body };
