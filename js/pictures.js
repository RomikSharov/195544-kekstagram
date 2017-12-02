'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

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
  popupClose.setAttribute('tabindex', 0);
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
  if (evt.target.closest('.gallery-overlay-close') || event.keyCode === ESC_KEYCODE) {
    popup.classList.add('hidden');

    popupClose.removeAttribute('tabindex');
  }
}

//  ************************************************

var photoArr = getPhotos();

renderPictures(photoArr);

pictureContainer.addEventListener('click', clickHandler(openPopup, photoArr));
popup.addEventListener('click', clickHandler(closePopup));

document.addEventListener('keydown', keyDownHendler(closePopup, ESC_KEYCODE));
document.addEventListener('keydown', keyDownHendler(openPopup, ENTER_KEYCODE, photoArr));
document.addEventListener('keydown', keyDownHendler(closePopup, ENTER_KEYCODE));


