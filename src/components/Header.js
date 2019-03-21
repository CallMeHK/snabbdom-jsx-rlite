/** @jsx html */
import { html } from "snabbdom-jsx";
import { h } from "snabbdom";

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

  export { Header }