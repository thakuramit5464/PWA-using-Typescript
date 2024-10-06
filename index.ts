import { printHello } from "./src/hello";

export class app {
  private introContainer: HTMLElement;
  constructor() {
    this.introContainer = document.getElementById("intro-div") as HTMLElement;
    console.log(localStorage.getItem("Name") === null);
    if (localStorage.getItem("Name") === null) {
      this.createIntro();
    }
  }
  createIntro() {
    const heading = document.createElement("h1");
    heading.innerText = "Enter you name:";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter your name: ";

    const button = document.createElement("button");
    button.textContent = "Submit";
    this.addInputEventListener(button, input);
    this.introContainer.appendChild(heading);
    this.introContainer.appendChild(input);
    this.introContainer.appendChild(button);
    this.introContainer.style.display = "flex";
  }
  addInputEventListener(button: HTMLElement, input: HTMLInputElement) {
    this.introContainer.addEventListener("click", (event: MouseEvent) => {
      console.log(">>>>>>>>>>>>>>");
    });
    button.addEventListener("click", () => {
      localStorage.setItem("Name", input.value);
      this.introContainer.style.display = "none";
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "enter") {
        localStorage.setItem("Name", input.value);
        this.introContainer.style.display = "none";
      }
    });
  }
}

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

function handleUpdates(workerState: String) {
  let text: string = `Update Found ${localStorage.getItem(
    "Name"
  )} ;)\nPress ok to update`;
  const userConfirmed: boolean = confirm(text);
  if (userConfirmed) {
    window.location.reload();
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

const newApp = new app();
// Run any other logic
printHello();
