'use strict';
(function () {
  var uploadPopup = document.querySelector('.upload-overlay');
  var uploadFile = document.querySelector('#upload-file');
  var uploadComment = document.querySelector('.upload-form-description');
  var uploadSubmit = document.querySelector('#upload-submit');

  var uploadResize = document.querySelector('.upload-resize-controls-value');
  var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
  var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
  var imagePreview = document.querySelector('.effect-image-preview');

  var radioContainer = document.querySelector('.upload-effect-controls');

  var hashtagsElem = uploadPopup.querySelector('.upload-form-hashtags');

  function resetDefault() {
    uploadResize.setAttribute('value', '100');
    imagePreview.style.transform = 'scale(1)';
    hashtagsElem.style.borderColor = window.utils.BLACK;
    if (imagePreview.classList.length === 2) {
      imagePreview.classList.remove(imagePreview.classList[1]);
    }
  }

  function openUploadFile(evt) {
    evt.preventDefault();
    uploadPopup.classList.remove('hidden');
  }
  function closeUploadFile(evt) {
    if (evt.target.closest('.upload-form-cancel') || (evt.keyCode === window.utils.ESC_KEYCODE && evt.target !== uploadComment)) {
      if (!uploadPopup.classList.contains('hidden')) {
        uploadPopup.classList.add('hidden');
        resetDefault();
      }
    }
  }
  function resizeFile(evt) {
    var curValue = parseInt(uploadResize.getAttribute('value'), 10);

    if (evt.target === buttonDec) {
      curValue = Math.max(25, curValue - 25);
    } else {
      curValue = Math.min(100, curValue + 25);
    }
    uploadResize.setAttribute('value', curValue);
    imagePreview.style.transform = 'scale(' + curValue / 100 + ')';
  }
  function applyEffect(evt) {
    var elt = evt.target.closest('input[type="radio"]');
    if (elt) {
      if (imagePreview.classList.length === 2) {
        imagePreview.classList.remove(imagePreview.classList[1]);
      }
      imagePreview.classList.add(elt.id.substring('upload-'.length));
    }
  }
  function checkHashtags() {
    if (hashtagsElem.value.length === 0) {
      return false;
    }
    var hashtags = hashtagsElem.value.split(' ');
    var length = hashtags.length;
    //  проверяю количество хэш-тегов
    if (length > 5) {
      return true;
    }

    for (var i = 0; i < length; i++) {
      //  проверяю первый символ хэш-тега
      if (hashtags[i][0] !== '#') {
        return true;
      }
      //  проверяю длину хэш-тега
      if (hashtags[0].length > 20) {
        return true;
      }
      //  проверяю совпадение хэш-тегов
      for (var j = 0; j < length; j++) {
        if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase() && i !== j) {
          return true;
        }
      }
    }
    return false;
  }
  function checkForm(evt) {
    if (checkHashtags()) {
      hashtagsElem.style.borderColor = window.utils.RED;
      evt.preventDefault();
    }
  }

  window.form = {
    registerEventHandlers: function () {
      uploadFile.addEventListener('change', openUploadFile);
      uploadPopup.addEventListener('click', closeUploadFile);
      document.addEventListener('keydown', window.utils.keyDownHendler(closeUploadFile, window.utils.ESC_KEYCODE));
      document.addEventListener('keydown', window.utils.keyDownHendler(closeUploadFile, window.utils.ENTER_KEYCODE));

      document.querySelector('#upload-select-image').setAttribute('action', 'https://js.dump.academy/kekstagram');
      document.querySelector('.upload-form-description').setAttribute('maxlength', '140');

      resetDefault();
      // uploadResize.setAttribute('value', '100');
      buttonDec.addEventListener('click', resizeFile);
      buttonInc.addEventListener('click', resizeFile);

      radioContainer.addEventListener('click', applyEffect);

      uploadSubmit.addEventListener('click', checkForm);
    }
  };
})();
