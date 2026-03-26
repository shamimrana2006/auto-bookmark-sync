document.getElementById("syncBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "sync" }, (response) => {
    console.log(response.status);
    alert("Bookmarks syncing started! Check console for status.");
  });
});