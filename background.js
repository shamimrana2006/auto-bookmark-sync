const BOOKMARK_URL = "https://raw.githubusercontent.com/your-username/repo-name/main/bookmarks.json";

async function loadBookmarks() {
  try {
    const res = await fetch(BOOKMARK_URL);
    const data = await res.json();

    chrome.bookmarks.getTree((tree) => {
      const bar = tree[0].children.find(n => n.id === "1");

      // পুরান bookmark delete
      bar.children.forEach(child => {
        chrome.bookmarks.remove(child.id);
      });

      // নতুন bookmark add
      data.forEach(item => {
        chrome.bookmarks.create({
          parentId: bar.id,
          title: item.title,
          url: item.url
        });
      });
    });

    console.log("✅ Bookmarks synced");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

// install হলে run
chrome.runtime.onInstalled.addListener(loadBookmarks);

// প্রতি ১ মিনিটে auto update 🔥
setInterval(loadBookmarks, 60000);