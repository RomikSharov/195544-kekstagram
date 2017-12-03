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

  //  ***************************** module5-task2
  var slider = uploadPopup.querySelector('.upload-effect-level-pin');
  var bar = uploadPopup.querySelector('.upload-effect-level-val');
  var sliderUploadValue = uploadPopup.querySelector('.upload-effect-level-value');

  var sliderParent = slider.parentElement;
  slider.setAttribute('draggable', true);
  var startCoords = {
    offsetLeft: 0,
    offsetHeight: 0,
    clientX: 0,
    clientY: 0
  };
  slider.addEventListener('dragstart', onDragstartSlider);
  slider.addEventListener('drag', onDragSlider);
  slider.addEventListener('dragend', onDropSlider);
  function onDragstartSlider(evt) {
    //  evt.preventDefault();
    evt.dataTransfer.setData('text/plain', evt.target.alt);
    //  evt.dataTransfer.effectAllowed = 'move';
    //  slider.style['background'] = 'red';
    startCoords.offsetLeft = slider.offsetLeft;
    startCoords.offsetHeight = slider.offsetHeight;
    startCoords.clientX = evt.clientX;
    startCoords.clientY = evt.clientY;
  }
  function onDragSlider(evt) {
    evt.preventDefault();
    var shift = {
      x: evt.clientX - startCoords.clientX,
      y: evt.clientY - startCoords.clientY
    };
    var newValue = 0;

    if (shift.x > 364) {
      newValue = 100;
    } else if (shift.x < -91) {
      newValue = 0;
    } else {
      newValue = (startCoords.offsetLeft + shift.x) / (455 / 100);
    }

    slider.style.left = newValue + '%';
    bar.style['width'] = newValue + '%';
    sliderUploadValue.setAttribute('value', Math.round(newValue));

    var eff = 0;
    if (imagePreview.classList.length === 2) {
      eff = imagePreview.classList[1];
      if (eff === 'effect-chrome') {
        imagePreview.style['filter'] = 'grayscale(' + 0.01 * newValue + ')';
      } if (eff === 'effect-sepia') {
        imagePreview.style['filter'] = 'sepia(' + 0.01 * newValue + ')';
      } if (eff === 'effect-marvin') {
        imagePreview.style['filter'] = 'invert(' + newValue + '%)';
      } if (eff === 'effect-phobos') {
        imagePreview.style['filter'] = 'blur(' + 0.03 * newValue + 'px)';
      } if (eff === 'effect-heat') {
        imagePreview.style['filter'] = 'brightness(' + 0.03 * newValue + ')';
      }
    }
  }

  function onDropSlider(evt) {
    evt.preventDefault();
  }

  //  ******************************************
  // function initFilters() {
  //   var filter = {
  //     'effect-sepia' : {
  //       defaultValue: uploadPopup.querySelector('.upload-effect-sepia').style[]
  //     }
  //   }
  // }
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
