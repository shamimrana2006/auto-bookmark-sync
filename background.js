function loadBookmarks() {
  const bookmarks = [
    { title: "Google", url: "https://google.com" },
    { title: "YouTube", url: "https://youtube.com" },
    { title: "Facebook", url: "https://facebook.com" }
  ];

  chrome.bookmarks.getTree((tree) => {
    const bar = tree[0].children.find(n => n.id === "1");

    // পুরান bookmark delete
    bar.children.forEach(child => {
      chrome.bookmarks.remove(child.id);
    });

    // নতুন bookmark add
    bookmarks.forEach(item => {
      chrome.bookmarks.create({
        parentId: bar.id,
        title: item.title,
        url: item.url
      });
    });
  });
}

// install হলে run হবে
chrome.runtime.onInstalled.addListener(() => {
  loadBookmarks();
});