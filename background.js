const BOOKMARK_URL = "https://raw.githubusercontent.com/shamimrana2006/auto-bookmark-sync/refs/heads/main/bookmarks.json";

async function loadBookmarks() {
  try {
    const res = await fetch(BOOKMARK_URL);
    const data = await res.json();

    chrome.bookmarks.getTree((tree) => {
      const bar = tree[0].children.find(node => node.id === "1");
      if (!bar) return console.error("Bookmarks bar not found");

      // Clear old bookmarks
      bar.children.forEach(child => {
        chrome.bookmarks.remove(child.id);
      });

      // Add new bookmarks
      data.forEach(item => {
        chrome.bookmarks.create({
          parentId: bar.id,
          title: item.title,
          url: item.url
        });
      });

      console.log("✅ Bookmarks synced successfully");
    });
  } catch (err) {
    console.error("❌ Error syncing bookmarks:", err);
  }
}

// Listen to messages from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "sync") {
    loadBookmarks();
    sendResponse({ status: "syncing" });
  }
});