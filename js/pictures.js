'use strict';
// var ESC_KEYCODE = 27;
// var ENTER_KEYCODE = 13;

// var comments = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
// ];

// var photoCount = 25;

var pictureTemplate = document.querySelector('#picture-template');

var pictureContainer = document.querySelector('.pictures');

var popup = document.querySelector('.gallery-overlay');
var popupImg = popup.querySelector('.gallery-overlay-image');
var popupLikes = popup.querySelector('.likes-count');
var popupComments = popup.querySelector('.comments-count');
var popupClose = popup.querySelector('.gallery-overlay-close');

//  ******************* module4-task2*****************
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
//  *******************************************
// function getPhotos() {
//   var arr = [];
//   for (var i = 1; i <= photoCount; i++) {
//     var item = {};
//     item.url = 'photos/' + i + '.jpg';
//     item.likes = window.utils.getRandomNumber(15, 200);
//     item.comments = window.utils.getRandomArr(comments, 2);
//     arr.push(item);
//   }
//   return arr;
// }

function createPicture(data, i) {
  var template = pictureTemplate.content.cloneNode(true);
  template.querySelector('.picture').dataset.key = i;
  template.querySelector('img').src = data.url;
  template.querySelector('.picture-likes').textContent = data.likes;
  template.querySelector('.picture-comments').textContent = data.comments.length;

  return template;
}
function renderPictures(data) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item, i) {
    fragment.appendChild(createPicture(item, i));
  });
  pictureContainer.appendChild(fragment);
}
function renderPopup(pic) {
  popupImg.src = pic.url;
  popupLikes.textContent = pic.likes;
  popupComments.textContent = pic.comments.length;

  popup.classList.remove('hidden');
  if (!popupClose.getAttribute('tabindex')) {
    popupClose.setAttribute('tabindex', 0);
  }
}

//  ************************************************
function openPopup(evt, data) {
  evt.preventDefault();
  var target = evt.target.closest('.picture');
  if (target) {
    var index = parseInt(target.dataset.key, 10);
    renderPopup(data[index]);
  }
}
function closePopup(evt) {
  if (evt.target.closest('.gallery-overlay-close') || event.keyCode === window.utils.ESC_KEYCODE) {
    if (!popup.classList.contains('hidden')) {
      popup.classList.add('hidden');
    }
  }
}
//  ************************************************
//  ******************* module4-task2*****************
function openUploadFile(evt) {
  evt.preventDefault();
  uploadPopup.classList.remove('hidden');
}
function closeUploadFile(evt) {
  if (evt.target.closest('.upload-form-cancel') || (evt.keyCode === window.utils.ESC_KEYCODE && evt.target !== uploadComment)) {
    if (!uploadPopup.classList.contains('hidden')) {
      uploadPopup.classList.add('hidden');
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
    hashtagsElem.style.borderColor = 'red';
    evt.preventDefault();
  }
}
//  *************************************************

var photoArr = window.data.getPhotos();

renderPictures(photoArr);

pictureContainer.addEventListener('click', window.utils.clickHandler(openPopup, photoArr));
popup.addEventListener('click', window.utils.clickHandler(closePopup));

document.addEventListener('keydown', window.utils.keyDownHendler(closePopup, window.utils.ESC_KEYCODE));
document.addEventListener('keydown', window.utils.keyDownHendler(openPopup, window.utils.ENTER_KEYCODE, photoArr));
document.addEventListener('keydown', window.utils.keyDownHendler(closePopup, window.utils.ENTER_KEYCODE));

//  ******************* module4-task2*****************
uploadFile.addEventListener('change', openUploadFile);
uploadPopup.addEventListener('click', closeUploadFile);
document.addEventListener('keydown', window.utils.keyDownHendler(closeUploadFile, window.utils.ESC_KEYCODE));
document.addEventListener('keydown', window.utils.keyDownHendler(closeUploadFile, window.utils.ENTER_KEYCODE));

document.querySelector('#upload-select-image').setAttribute('action', 'https://js.dump.academy/kekstagram');
document.querySelector('.upload-form-description').setAttribute('maxlength', '140');

uploadResize.setAttribute('value', '100');
buttonDec.addEventListener('click', resizeFile);
buttonInc.addEventListener('click', resizeFile);

radioContainer.addEventListener('click', applyEffect);

uploadSubmit.addEventListener('click', checkForm);

