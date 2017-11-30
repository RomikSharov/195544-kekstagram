'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var photoCount = 25;

var pictureTemplate = document.querySelector('#picture-template');

var pictureContainer = document.querySelector('.pictures');

var popup = document.querySelector('.gallery-overlay');
var popupImg = popup.querySelector('.gallery-overlay-image');
var popupLikes = popup.querySelector('.likes-count');
var popupComments = popup.querySelector('.comments-count');
var popupClose = popup.querySelector('.gallery-overlay-close');

function getPhotos() {
  var arr = [];
  for (var i = 1; i <= photoCount; i++) {
    var item = {};
    item.url = 'photos/' + i + '.jpg';
    item.likes = getRandomNumber(15, 200);
    item.comments = getRandomArr(comments, 2);
    arr.push(item);
  }
  return arr;
}

function createPicture(data, i) {
  var template = pictureTemplate.content.cloneNode(true);
  var img = template.querySelector('img');
  img.src = data.url;
  img.dataset.key = i;
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
}

//  ************************************************
function openPopup(evt, data) {
  if ((('keyCode' in evt) && (evt.keyCode === ENTER_KEYCODE)) || !('keyCode' in evt)) {
    evt.preventDefault();
    var target = evt.target.closest('.picture');
    if (target) {
      var img = target.querySelector('img');
      var index = parseInt(img.dataset.key, 10);
      renderPopup(data[index]);

      document.addEventListener('keydown', onEscPress);
      popupClose.addEventListener('click', closePopup);
      popupClose.addEventListener('keydown', onPopupCloseEnterPress);
    }
  }
}
function closePopup() {
  popup.classList.add('hidden');

  popupClose.removeEventListener('click', closePopup);
  popupClose.removeEventListener('keydown', onPopupCloseEnterPress);
  document.removeEventListener('keydown', onEscPress);
}
function onEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}
function onPopupCloseEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
}
//  ************************************************
var photoArr = getPhotos();

renderPictures(photoArr);

pictureContainer.addEventListener('click', clickHandler(openPopup, photoArr));
pictureContainer.addEventListener('keydown', clickHandler(openPopup, photoArr));
