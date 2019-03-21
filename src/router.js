import rlite from "rlite-router";

export default function setUpRouter(routes, error) {
  const route = rlite(error, routes);

  // Hash-based routing
  function processHash() {
    const hash = location.hash || "#";

    // Do something useful with the result of the route
    route(hash.slice(1));
    //run()
  }

  window.addEventListener("hashchange", processHash);
  processHash();
}
