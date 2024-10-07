const butInstall = document.getElementById("buttonInstall");

// Tutorial referenced: https://web.dev/articles/codelab-make-installable

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  console.log("👍", "beforeinstallprompt", event);
  window.deferredPrompt = event; // Grabs reference to the installability event
});

// Logic for when user clicks on install button
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  promptEvent.prompt();
  // Log the result
  const result = await promptEvent.userChoice;
  console.log("👍", "userChoice", result);
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
});

// Logic for when the user has installed app
window.addEventListener("appinstalled", (event) => {
  console.log("👍", "appinstalled", event);
  window.deferredPrompt = null; // Sets to null so it can be re-used if needed
});
