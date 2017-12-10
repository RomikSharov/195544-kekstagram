'use strict';
(function () {
  var uploadPopup = document.querySelector('.upload-overlay');
  var uploadFile = document.querySelector('#upload-file');
  var uploadComment = document.querySelector('.upload-form-description');
  var uploadSubmit = document.querySelector('#upload-submit');

  var uploadResize = document.querySelector('.upload-resize-controls-value');

  var imagePreview = document.querySelector('.effect-image-preview');

  var radioContainer = document.querySelector('.upload-effect-controls');

  var hashtagsElem = uploadPopup.querySelector('.upload-form-hashtags');

  var popup = {
    'scale': 100,
    'filter': 'effect-none',
    'effect': 100
  };
  var scale = {
    min: 25,
    max: 100,
    step: 25
  };

  //  ***************************** module5-task2 Start
  var sliderForm = uploadPopup.querySelector('.upload-effect-level');
  var slider = sliderForm.querySelector('.upload-effect-level-pin');
  var bar = sliderForm.querySelector('.upload-effect-level-val');
  var sliderUploadValue = sliderForm.querySelector('.upload-effect-level-value');

  function apllySlider(actualEffect) {
    popup.effect = actualEffect;
    renderPopup();
  }
  //  ****************************************** module5-task2 End

  function renderPopup() {
    uploadResize.setAttribute('value', popup.scale);
    imagePreview.style.transform = 'scale(' + popup.scale / 100 + ')';

    slider.style.left = popup.effect + '%';
    bar.style.width = popup.effect + '%';
    sliderUploadValue.setAttribute('value', Math.round(popup.effect));

    if (imagePreview.classList.length === 2) {
      imagePreview.classList.remove(imagePreview.classList[1]);
    }
    imagePreview.classList.add(popup.filter);

    if (popup.filter === 'effect-none') {
      sliderForm.classList.add('hidden');
    } else {
      sliderForm.classList.remove('hidden');
    }

    switch (popup.filter) {
      case 'effect-chrome':
        imagePreview.style.filter = 'grayscale(' + 0.01 * popup.effect + ')';
        break;
      case 'effect-sepia':
        imagePreview.style.filter = 'sepia(' + 0.01 * popup.effect + ')';
        break;
      case 'effect-marvin':
        imagePreview.style.filter = 'invert(' + popup.effect + '%)';
        break;
      case 'effect-phobos':
        imagePreview.style.filter = 'blur(' + 0.05 * popup.effect + 'px)';
        break;
      case 'effect-heat':
        imagePreview.style.filter = 'brightness(' + 0.03 * popup.effect + ')';
        break;
      default:
        imagePreview.style.filter = '';
    }
  }

  function resetDefault() {
    hashtagsElem.style.borderColor = window.utils.BLACK;
    if (imagePreview.classList.length === 2) {
      imagePreview.classList.remove(imagePreview.classList[1]);
    }
    popup.scale = 100;
    popup.filter = 'effect-none';
    popup.effect = 100;
  }

  function openUploadFile(evt) {
    evt.preventDefault();
    uploadPopup.classList.remove('hidden');
    renderPopup();
  }

  function closeUploadFile(evt) {
    if (evt.target.closest('.upload-form-cancel') || (evt.keyCode === window.utils.ESC_KEYCODE && evt.target !== uploadComment)) {
      if (!uploadPopup.classList.contains('hidden')) {
        uploadPopup.classList.add('hidden');
        resetDefault();
      }
    }
  }

  function apllyFilter(actualFilter) {
    popup.filter = actualFilter.substring('upload-'.length);
    popup.effect = 100;
    renderPopup();
  }
  function apllyScale(actualScale) {
    popup.scale = actualScale;
    renderPopup();
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

      window.initializeScale(scale, popup, apllyScale);

      window.initializeFilters(radioContainer, apllyFilter);

      window.initializeSlider(slider, apllySlider);


      uploadSubmit.addEventListener('click', checkForm);
    }
  };
})();
