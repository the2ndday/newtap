(function() {
  var store = window.localStorage;

  var entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHTML(str) {
    return String(str).replace(/[&<>"'\/]/g, function(s) {
      return entities[s];
    });
  }

  function addBookmark(ul, id, title, url) {
    var li = document.createElement("li");
    title = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    li.innerHTML = "<a href=\"" + (encodeURI(url)) + "\" id='bm_" + id + "'>" + escapeHTML(title) + "</a>";
    ul.appendChild(li);
  }

  function addGroup(ul, title) {
    var li = document.createElement("li");
    li.className = 'group-title';
    li.innerHTML = escapeHTML(title);
    var sublist = document.createElement("ul");
    sublist.appendChild(li);
    ul.appendChild(sublist);
    return sublist;
  }

  function addBookmarksTree(ul, bookmarks) {
    for (var i = 0; i < bookmarks.length; i++) {
      var b = bookmarks[i];
      if (b.url) {
        addBookmark(ul, b.id, b.title, b.url);
      } else {
        addBookmarksTree(addGroup(ul, b.title), b.children);
      }
    }
  }

  chrome.bookmarks.getTree(function(bookmarks) {
    addBookmarksTree(document.getElementById("bookmarks"),
                 bookmarks[0].children[0].children);
  });

}).call(this);


