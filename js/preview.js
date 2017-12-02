'use strict';
(function () {
  var popup = document.querySelector('.gallery-overlay');
  var popupImg = popup.querySelector('.gallery-overlay-image');
  var popupLikes = popup.querySelector('.likes-count');
  var popupComments = popup.querySelector('.comments-count');
  var popupClose = popup.querySelector('.gallery-overlay-close');

  window.preview = {
    popup: popup,
    openPopup: function (evt, data) {
      evt.preventDefault();
      var target = evt.target.closest('.picture');
      if (target) {
        var index = parseInt(target.dataset.key, 10);
        window.preview.renderPopup(data[index]);
      }
    },
    closePopup: function (evt) {
      if (evt.target.closest('.gallery-overlay-close') || event.keyCode === window.utils.ESC_KEYCODE) {
        if (!popup.classList.contains('hidden')) {
          popup.classList.add('hidden');
        }
      }
    },
    renderPopup: function (pic) {
      popupImg.src = pic.url;
      popupLikes.textContent = pic.likes;
      popupComments.textContent = pic.comments.length;

      window.preview.popup.classList.remove('hidden');
      if (!popupClose.getAttribute('tabindex')) {
        popupClose.setAttribute('tabindex', 0);
      }
    }
  };
})();
