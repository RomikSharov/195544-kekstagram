'use strict';
(function () {
  var pictureContainer = document.querySelector('.pictures');

  window.gallery = {
    renderPictures: function (data) {
      pictureContainer.innerHTML = '';

      var fragment = document.createDocumentFragment();
      data.forEach(function (item, i) {
        fragment.appendChild(window.picture.createPicture(item, i));
      });
      pictureContainer.appendChild(fragment);
    },
    registerEventHandlers: function (data) {
      pictureContainer.addEventListener('click', window.utils.clickHandler(window.preview.openPopup, data));
      window.preview.popup.addEventListener('click', window.utils.clickHandler(window.preview.closePopup));

      document.addEventListener('keydown', window.utils.keyDownHendler(window.preview.closePopup, window.utils.ESC_KEYCODE));
      document.addEventListener('keydown', window.utils.keyDownHendler(window.preview.openPopup, window.utils.ENTER_KEYCODE, data));
      document.addEventListener('keydown', window.utils.keyDownHendler(window.preview.closePopup, window.utils.ENTER_KEYCODE));
    }
  };
})();
