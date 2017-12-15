'use strict';
(function () {
  var pictureContainer = document.querySelector('.pictures');

  window.gallery = {
    render: function (data) {
      pictureContainer.innerHTML = '';

      var fragment = document.createDocumentFragment();
      data.forEach(function (item, i) {
        fragment.appendChild(window.picture.create(item, i));
      });
      pictureContainer.appendChild(fragment);

      pictureContainer.addEventListener('click', window.utils.onClick(window.preview.open, data));
      pictureContainer.addEventListener('keydown', window.utils.onKeyDown(window.preview.open, window.utils.ENTER_KEYCODE, data));
    }
  };
})();
