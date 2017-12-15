'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture-template');

  window.picture = {
    create: function (data, i) {
      var template = pictureTemplate.content.cloneNode(true);
      template.querySelector('.picture').dataset.key = i;
      template.querySelector('img').src = data.url;
      template.querySelector('.picture-likes').textContent = data.likes;
      template.querySelector('.picture-comments').textContent = data.comments.length;

      return template;
    }
  };
})();
