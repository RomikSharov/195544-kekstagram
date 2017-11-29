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

var subPictureNodes = [
  {name: '.picture img', attribute: 'src', data: 'url'},
  {name: '.picture-likes', attribute: 'textContent', data: 'likes'},
  {name: '.picture-comments', attribute: 'textContent', data: 'numberOfComments'}
];

var subOverlayNodes = [
  {name: '.gallery-overlay-image', attribute: 'src', data: 'url'},
  {name: '.likes-count', attribute: 'textContent', data: 'likes'},
  {name: '.comments-count', attribute: 'textContent', data: 'numberOfComments'}
];

function getRandomNumber(min, max) {
  var rand = min + Math.floor(Math.random() * (max - min + 1));
  return rand;
}

function getRandValue(arr, counter) { // { start: 1, end: 2}
  var index = getRandomNumber(counter.start, counter.end);
  var tmp = arr[index];
  arr[index] = arr[0];
  arr[0] = tmp;
  return tmp;
}

function makePhoto() {
  var photoObj = {
    url: 'photos/default',
    numberOfLikes: 0,
    comments: [],
    numberOfComments: 0
  };
  function photo() {
    return {url: photoObj.url, numberOfLikes: photoObj.numberOfLikes, comments: photoObj.comments};
  }
  photo.set = function (data) {
    var length = data.length;
    for (var i = 0; i < length; i++) {
      photoObj[data[i].name] = data[i].value;
    }
  };
  photo.get = function (attribute) {
    return photoObj[attribute];
  };
  return photo;
}

function createPhotos() {
  var photosArr = [];
  for (var i = 0; i <= 25; i++) {
    var url = 'photos/' + (i + 1) + '.jpg';
    var likes = getRandomNumber(15, 200);
    var currentComments = Array(getRandomNumber(1, 2));
    var commentsLength = comments.length;
    var length = currentComments.length;
    for (var j = 0; j < length; j++) {
      currentComments[j] = getRandValue(comments, {start: j, end: commentsLength - 1});
    }
    var photo = makePhoto();
    photo.set([
      {name: 'url', value: url},
      {name: 'likes', value: likes},
      {name: 'currentComments', value: currentComments},
      {name: 'numberOfComments', value: length}]);
    photosArr[i] = photo;
  }
  return photosArr;
}

var renderNode = function (parent, subNodes, value) {
  var length = subNodes.length;
  for (var i = 0; i < length; i++) {
    parent.querySelector(subNodes[i].name)[subNodes[i].attribute] = value.get(subNodes[i].data);
  }
  return parent;
};

function renderPictures(photosArr) {
  var length = photosArr.length;
  for (var i = 0; i < length; i++) {
    var pictureNode = pictureNodeTemplate.content.cloneNode(true);
    pictureNode = renderNode(pictureNode, subPictureNodes, photosArr[i]);
    fragment.appendChild(pictureNode);
  }
  return fragment;
}
//  ******************* функции для событий
function openPopup(evt) {
  var imgSrc = evt.currentTarget.querySelector('.picture img').src;
  var index = imgSrc.substring(imgSrc.lastIndexOf('/') + 1, imgSrc.lastIndexOf('.'));
  overlayNode = renderNode(overlayNode, subOverlayNodes, photos[index - 1]);
  overlayNode.classList.remove('hidden');
  evt.preventDefault();

  overlayHidden.addEventListener('click', onOverlayCloseClick);
  overlayHidden.addEventListener('keydown', onCloseEnterPress);
  document.addEventListener('keydown', onPopupEscPress);
}
function closePopup() {
  overlayNode.classList.add('hidden');
  overlayHidden.removeEventListener('click', onOverlayCloseClick);
  overlayHidden.removeEventListener('keydown', onCloseEnterPress);
  document.removeEventListener('click', onPopupEscPress);
}

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
var onCloseEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};
function onOverlayCloseClick(evt) {
  closePopup();
}
function onPictureClick(evt) {
  openPopup(evt);
}
var onPictureEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup(evt);
  }
};
//  **************************
var photos = createPhotos();

var fragment = document.createDocumentFragment();
var pictures = document.querySelector('.pictures');
var pictureNodeTemplate = document.querySelector('#picture-template');
pictures.appendChild(renderPictures(photos));

var overlayNode = document.querySelector('.gallery-overlay');
var overlayHidden = overlayNode.querySelector('.gallery-overlay-close');
var pictureElements = document.querySelectorAll('.picture');
for (var i = 0; i < pictureElements.length; i++) {
  pictureElements[i].addEventListener('click', onPictureClick);
  pictureElements[i].addEventListener('keydown', onPictureEnterPress);
}

//  var overlayNode = renderNode(document.querySelector('.gallery-overlay'), subOverlayNodes, photos[0]);
//  overlayNode.classList.remove('hidden');
