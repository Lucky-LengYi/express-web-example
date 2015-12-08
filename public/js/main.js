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
    var deleteInfoBox = '<button type="button" class="btn btn-default del-button" data-id="' + item.id + '"  data-toggle="modal" data-target=".bs-example-modal-sm">删除</button>';
    var timestamp = '<div class="timestamp">' + formatDate(item.created) + '</div>';

    $infoBox = $(infoBox);
    $infoBox.append(info + timestamp + deleteInfoBox);
    $('.main-info').append($infoBox);
  }

  function showBookmarksCount(count) {
    $('.search-count').text('搜索到' + count + '条结果');
  }

  var bookmarks;

  $.ajax({
    method: "get",
    url: "/bookmarks",
  }).done(function(data) {
    bookmarks = data;
    insertItems(data);
    showBookmarksCount(bookmarks.length);
  });

  $('#keywords').on('input propertychange', function() {
    var that = this;
    var count = 0;
    $('.main-info').empty();
    if (this.value === '') {
      insertItems(bookmarks);
      showBookmarksCount(bookmarks.length);
      return;
    }
    bookmarks.forEach(function(item) {

      var condition = new RegExp(that.value, 'ig');
      if (condition.test(item.title)) {

        var span = '<span class="highlightingText">' + '$&' + '</span>';
        var result = {};

        count ++;
        result.title = item.title.replace(condition, span);
        result.created = item.created;
        insertItem(result);
      }
    });
    showBookmarksCount(count);
  });

  $('#confirm').on('click' ,function () {
    $.ajax({
      method: "post",
      data: {
        bookmarkName: $('#bookmarkName').val(),
        bookmarkAddress: $('#bookmarkAddress').val()
      },
      url: "/bookmark",
    }).done(function(data) {
      bookmarks = data;
      insertItems(data);
      showBookmarksCount(bookmarks.length);
      $('#myModal').modal('hide');
    });
  });

  $('.main-info').on('click' ,function (evt) {
    if (evt.target.type !== 'button') {
      return;
    }

    var id = $(evt.target).data('id');
    if (confirm("你确定删除该条信息？")) {

      $.ajax({
        method: "delete",
        url: "/bookmarks?id=" + id
      }).done(function(data) {
        $('.main-info').empty();

        bookmarks = data;
        insertItems(data);
        showBookmarksCount(bookmarks.length);
      });
    }
  });
});
