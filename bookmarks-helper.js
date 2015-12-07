var bookmarks = require('./bookmarks.json');

function bookmarksHelper() {
  bookmarks.forEach(function (item, i) {
    bookmarks[i].id = i;
  });

  return bookmarks;
}

module.exports = bookmarksHelper;
