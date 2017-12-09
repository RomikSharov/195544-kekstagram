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

  var popup = {
    'scale': 100,
    'filter': 'effect-none',
    'effect': 100
  };


  //  ***************************** module5-task2 Start
  var sliderForm = uploadPopup.querySelector('.upload-effect-level');
  var slider = sliderForm.querySelector('.upload-effect-level-pin');
  var bar = sliderForm.querySelector('.upload-effect-level-val');
  var sliderUploadValue = sliderForm.querySelector('.upload-effect-level-value');

  slider.setAttribute('draggable', true);
  var sliderData = {
    minX: 0,
    parentWidth: 0
  };
  slider.addEventListener('dragstart', onDragstartSlider);

  function onDragstartSlider(evt) {
    evt.preventDefault();
    evt.dataTransfer.setData('text/plain', evt.target.alt);
    sliderData.parentWidth = slider.parentElement.clientWidth;
    sliderData.minX = evt.clientX - sliderData.parentWidth / 100 * popup.effect;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var temp = (moveEvt.clientX - sliderData.minX) / (sliderData.parentWidth / 100);
      if (temp > 100) {
        temp = 100;
      } else if (temp < 0) {
        temp = 0;
      }

      popup.effect = temp;
      renderPopup();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  }
  //  ****************************************** module5-task2 End

  function renderPopup() {
    uploadResize.setAttribute('value', popup.scale);
    imagePreview.style.transform = 'scale(' + popup.scale / 100 + ')';

    slider.style.left = popup.effect + '%';
    bar.style['width'] = popup.effect + '%';
    sliderUploadValue.setAttribute('value', Math.round(popup.effect));

    if (imagePreview.classList.length === 2) {
      imagePreview.classList.remove(imagePreview.classList[1]);
    }
    imagePreview.classList.add(popup.filter);

    if (popup.filter === 'effect-none') {
      sliderForm.classList.add('hidden');
    } else {
      sliderForm.classList.remove('hidden');
      switch (popup.filter) {
        case 'effect-chrome':
          imagePreview.style['filter'] = 'grayscale(' + 0.01 * popup.effect + ')';
          break;
        case 'effect-sepia':
          imagePreview.style['filter'] = 'sepia(' + 0.01 * popup.effect + ')';
          break;
        case 'effect-marvin':
          imagePreview.style['filter'] = 'invert(' + popup.effect + '%)';
          break;
        case 'effect-phobos':
          imagePreview.style['filter'] = 'blur(' + 0.05 * popup.effect + 'px)';
          break;
        case 'effect-heat':
          imagePreview.style['filter'] = 'brightness(' + 0.03 * popup.effect + ')';
          break;
        default:
          imagePreview.style['filter'] = '';
      }
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

  function onClickButtonDecInc(evt) {
    if (evt.target === buttonDec) {
      popup.scale = Math.max(25, popup.scale - 25);
    } else {
      popup.scale = Math.min(100, popup.scale + 25);
    }
    renderPopup();
  }

  function onClickFilter(evt) {
    var elt = evt.target.closest('input[type="radio"]');
    if (elt) {
      popup.filter = elt.id.substring('upload-'.length);
      popup.effect = 100;
      renderPopup();
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

      buttonDec.addEventListener('click', onClickButtonDecInc);
      buttonInc.addEventListener('click', onClickButtonDecInc);

      radioContainer.addEventListener('click', onClickFilter);

      uploadSubmit.addEventListener('click', checkForm);
    }
  };
})();
