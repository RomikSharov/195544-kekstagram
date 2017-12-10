'use strict';
(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadPopup = uploadForm.querySelector('.upload-overlay');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadComment = uploadForm.querySelector('.upload-form-description');

  var uploadResize = uploadForm.querySelector('.upload-resize-controls-value');

  var imagePreview = uploadForm.querySelector('.effect-image-preview');

  var radioContainer = uploadForm.querySelector('.upload-effect-controls');

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

  var sliderForm = uploadPopup.querySelector('.upload-effect-level');
  var slider = sliderForm.querySelector('.upload-effect-level-pin');
  var bar = sliderForm.querySelector('.upload-effect-level-val');
  var sliderUploadValue = sliderForm.querySelector('.upload-effect-level-value');

  function apllySlider(actualEffect) {
    popup.effect = actualEffect;
    renderPopup();
  }

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
    window.utils.removeErrorMessage();

    // убираю пробелы
    hashtagsElem.value = (hashtagsElem.value || '').trim().replace(/\s{2,}/g, ' ');

    if (hashtagsElem.value.length === 0) {
      return false;
    }
    var hashtags = hashtagsElem.value.split(' ');
    var length = hashtags.length;
    //  проверяю количество хэш-тегов
    if (length > 5) {
      window.utils.onError('Хеш-тёгов должно быть не больше 5');
      return true;
    }

    for (var i = 0; i < length; i++) {
      //  проверяю первый символ хэш-тега
      if (hashtags[i][0] !== '#') {
        window.utils.onError('Хеш-тёги должны начинатся с #');
        return true;
      }
      if (hashtags[i].split('#').length > 2) {
        window.utils.onError('Хеш-тёги должны разделяться пробелами');
        return true;
      }
      //  проверяю длину хэш-тега
      if (hashtags[0].length > 21) {
        window.utils.onError('Хеш-тёги должны быть короче 20 символов');
        return true;
      }
      //  проверяю совпадение хэш-тегов
      for (var j = i; j < length; j++) {
        if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase() && i !== j) {
          window.utils.onError('Хеш-тёги не должны повторяться');
          return true;
        }
      }
    }
    return false;
  }

  function onSubmitForm(evt) {
    evt.preventDefault();

    function onLoad() {
      resetDefault();
      uploadPopup.classList.add('hidden');
      uploadForm.reset();
    }

    if (checkHashtags()) {
      hashtagsElem.style.borderColor = window.utils.RED;
      evt.preventDefault();
    } else {
      window.backend.save(new FormData(uploadForm), onLoad, window.utils.onError);
    }
  }

  window.form = {
    registerEventHandlers: function () {
      uploadFile.addEventListener('change', openUploadFile);
      uploadPopup.addEventListener('click', closeUploadFile);
      document.addEventListener('keydown', window.utils.keyDownHendler(closeUploadFile, window.utils.ESC_KEYCODE));
      document.addEventListener('keydown', window.utils.keyDownHendler(closeUploadFile, window.utils.ENTER_KEYCODE));

      document.querySelector('.upload-form-description').setAttribute('maxlength', '140');

      window.initializeScale(scale, popup, apllyScale);

      window.initializeFilters(radioContainer, apllyFilter);

      window.initializeSlider(slider, apllySlider);

      uploadForm.addEventListener('submit', onSubmitForm);
    }
  };
})();
