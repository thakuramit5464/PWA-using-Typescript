import { printHello } from "./src/hello";

let isReloading = false;
// Register the service worker if supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js") // Ensure the path to the service worker script is correct
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );

        // Check if there's an installing worker
        if (registration.installing) {
          console.log("Service Worker installing...");
          trackWorker(registration.installing);
        } else if (registration.waiting) {
          console.log("Service Worker installed and waiting.");
        } else if (registration.active) {
          console.log("Service Worker is active.");
        }

        // Listen for updates in the future
        registration.addEventListener("updatefound", () => {
          console.log("Service Worker update found.");
          trackWorker(registration.installing);
        });
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// Function to track the service worker installation process
function trackWorker(worker: any) {
  worker.addEventListener("statechange", () => {
    console.log("Service Worker state changed:", worker.state);
    if (worker.state === "installed") {
      if (navigator.serviceWorker.controller) {
        console.log("New Service Worker installed. Ready for update.");

        handleUpdates("installed");
      } else {
        console.log("Service Worker installed for the first time.");
      }
    }
  });
}

// Function to trigger reload once
function triggerReload() {
  if (!isReloading) {
    isReloading = true;
    console.log("Triggering page reload...");
    window.location.reload();
  }
}
function handleUpdates(workerState: String) {
  console.log(">>>>>>>>>>>>>>..", workerState);
  let text: string = "Update Found\nPress ok to update";
  const userConfirmed: boolean = confirm(text);
  if (userConfirmed) {
    triggerReload();
  }
}
// Listen for messages from the service worker
window.addEventListener("message", (event) => {
  console.log("Message received on window:", event);

  if (event.data && event.data.type) {
    switch (event.data.type) {
      case "SW_INSTALLED":
        console.log("Service Worker has been installed.");
        window.location.reload();
        break;
      case "update-found":
        console.log("Update found for the Service Worker.");
        handleUpdates("update-found");
        break;
      default:
        console.warn(
          "Unknown message type received from Service Worker:",
          event.data.type
        );
    }
  } else {
    console.warn("Message received without valid 'type' property:", event.data);
  }
});

console.log("Script initialized. Checking service worker registration...");

// Run any other logic
printHello();
