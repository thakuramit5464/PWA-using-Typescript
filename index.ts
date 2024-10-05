import { printHello } from "./src/hello";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js") // Adjust the path if necessary
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
window.addEventListener("message", (event) => {
  console.log("Message received on window:", event);
  if (event.data.type === "SW_INSTALLED") {
    console.log("Service Worker has been installed.");
    window.location.reload();
  }
});

console.log("Added Console Statement");
printHello();
