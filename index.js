(()=>{"use strict";var e={532:(e,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.printHello=function(){console.log("Hello worlds")}}},o={};function r(t){var n=o[t];if(void 0!==n)return n.exports;var i=o[t]={exports:{}};return e[t](i,i.exports,r),i.exports}(()=>{const e=r(532);function o(e){e.addEventListener("statechange",(()=>{console.log("Service Worker state changed:",e.state),"installed"===e.state&&(navigator.serviceWorker.controller?(console.log("New Service Worker installed. Ready for update."),t("installed")):console.log("Service Worker installed for the first time."))}))}function t(e){console.log(">>>>>>>>>>>>>>..",e),confirm("Update Found Dude\nPress ok to update")&&window.location.reload()}"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("./sw.js").then((e=>{console.log("Service Worker registered with scope:",e.scope),e.installing?(console.log("Service Worker installing..."),o(e.installing)):e.waiting?console.log("Service Worker installed and waiting."):e.active&&console.log("Service Worker is active."),e.addEventListener("updatefound",(()=>{console.log("Service Worker update found."),o(e.installing)}))})).catch((e=>{console.error("Service Worker registration failed:",e)}))})),window.addEventListener("message",(e=>{if(console.log("Message received on window:",e),e.data&&e.data.type)switch(e.data.type){case"SW_INSTALLED":console.log("Service Worker has been installed."),window.location.reload();break;case"update-found":console.log("Update found for the Service Worker."),t("update-found");break;default:console.warn("Unknown message type received from Service Worker:",e.data.type)}else console.warn("Message received without valid 'type' property:",e.data)})),console.log("Script initialized. Checking service worker registration..."),(0,e.printHello)()})()})();
