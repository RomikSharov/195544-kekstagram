'use strict';
(function () {
  var popup = document.querySelector('.gallery-overlay');
  var popupImg = popup.querySelector('.gallery-overlay-image');
  var popupLikes = popup.querySelector('.likes-count');
  var popupComments = popup.querySelector('.comments-count');
  var popupClose = popup.querySelector('.gallery-overlay-close');


  function closePopup(evt) {
    if (evt.target.closest('.gallery-overlay-close') || evt.keyCode === window.utils.ESC_KEYCODE) {
      if (!popup.classList.contains('hidden')) {
        popup.classList.add('hidden');

        document.removeEventListener('keydown', window.utils.onKeyDown(closePopup, window.utils.ESC_KEYCODE));
        popup.removeEventListener('keydown', window.utils.onKeyDown(closePopup, window.utils.ENTER_KEYCODE));
        popup.removeEventListener('click', window.utils.onClick(closePopup));
      }
    }
  }

  function render(pic) {
    popupImg.src = pic.url;
    popupLikes.textContent = pic.likes;
    popupComments.textContent = pic.comments.length;

    popup.classList.remove('hidden');
    if (!popupClose.getAttribute('tabindex')) {
      popupClose.setAttribute('tabindex', 0);
    }

    document.addEventListener('keydown', window.utils.onKeyDown(closePopup, window.utils.ESC_KEYCODE));
    popup.addEventListener('keydown', window.utils.onKeyDown(closePopup, window.utils.ENTER_KEYCODE));
    popup.addEventListener('click', window.utils.onClick(closePopup));
  }

  window.preview = {
    open: function (evt, data) {
      evt.preventDefault();
      var target = evt.target.closest('.picture');
      if (target) {
        var index = parseInt(target.dataset.key, 10);
        render(data[index]);
      }
    }
  };
})();
