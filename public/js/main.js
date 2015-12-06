$(function() {
  function formatDate(timestamp) {
    var result = 'Created @ ';
    var date = new Date(parseInt(timestamp) * 1000);
    return result + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  }

  function insertItems(items) {
    items.forEach(function(item) {
      insertItem(item);
    });
  }

  function insertItem(item) {
    var infoBox = '<div class="info-box"></div>';
    var info = '<div class="info">' + item.title + '</div>';
    var timestamp = '<div class="timestamp">' + formatDate(item.created) + '</div>';

    $infoBox = $(infoBox);
    $infoBox.append(info + timestamp);
    $('.main-info').append($infoBox);
  }

  var bookmarks;

  $.ajax({
    url: "bookmarks.json",
  }).done(function(data) {
    bookmarks = data;
    insertItems(data);
  });

  $('#keywords').on('input propertychange', function() {
    var that = this;
    $('.main-info').empty();
    if (this.value === '') {
      insertItems(bookmarks);
      return;
    }
    bookmarks.forEach(function(item) {

      var condition = new RegExp(that.value, 'ig');
      if (condition.test(item.title)) {

        var span = '<span class="highlightingText">' + '$&' + '</span>';
        var result = {};

        result.title = item.title.replace(condition, span);
        result.created = item.created;
        insertItem(result);
      }
    });
  });
});
