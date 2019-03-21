import setUpRouter from "./router";
import { updateDOM } from "./patch";
import { Error, App } from "./App";
import "../styles.css";


// Route function to pass to setuprouter
const routes = {
  "": function() {
    return updateDOM(App({ page: "home", updateDOM }));
  },
  boop: function() {
    return updateDOM(App({ page: "nothome", updateDOM }));
  }
};

// Sets up router
setUpRouter(routes, () => updateDOM(Error()));
