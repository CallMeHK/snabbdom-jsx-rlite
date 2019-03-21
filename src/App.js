/** @jsx html */
import { html } from "snabbdom-jsx";
import { h } from "snabbdom";
import { Body } from "./components/Body";
import { Header } from "./components/Header";

const Boop = () => <h1>BOOP</h1>;
const Error = () => <h1>404 Not found :/</h1>;

const App = (props) => (
  <div id="app">
    <Header />
    {props.page === "home" ? (
      <Body
        list={["beer", "cheese", "soup"]}
        updateDOM={props.updateDOM}
        key={"app"}
      />
    ) : (
      <Boop />
    )}
  </div>
);
export { Boop, Error, App };
