'use strict';

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

function createPhotos() {
  var photosArr = [];
  for (var i = 0; i <= 25; i++) {
    var photo = {};
    photo.url = 'photos/' + (i + 1) + '.jpg';
    photo.likes = getRandomNumber(15, 200);
    photo.comments = [];
    var commentsLength = comments.length;
    photo.numberOfComments = getRandomNumber(1, 2);
    for (var j = 0; j < photo.numberOfComments; j++) {
      photo.comments[j] = getRandValue(comments, {start: j, end: commentsLength - 1});
    }
    photosArr[i] = photo;
  }
  return photosArr;
}

var renderNode = function (parent, subNode, data) {
  parent.querySelector(subNode.name)[subNode.attribute] = data[subNode.data];
  return parent;
};

function renderPictures(photosArr) {
  var photosLength = photosArr.length;
  for (var i = 0; i < photosLength; i++) {
    var pictureNode = pictureNodeTemplate.content.cloneNode(true);
    var length = subPictureNodes.length;
    for (var j = 0; j < length; j++) {
      pictureNode = renderNode(pictureNode, subPictureNodes[j], photosArr[i]);
    }
    fragment.appendChild(pictureNode);
  }
  return fragment;
}

function renderOverlayNode(overlayNode) {
  var length = subOverlayNodes.length;
  for (var i = 0; i < length; i++) {
    overlayNode = renderNode(overlayNode, subOverlayNodes[i], photos[0]);
  }
  return overlayNode;
}

var photos = createPhotos();

var fragment = document.createDocumentFragment();
var pictureNodeTemplate = document.querySelector('#picture-template');
var pictures = document.querySelector('.pictures');
pictures.appendChild(renderPictures(photos));

var overlayNode = renderOverlayNode(document.querySelector('.gallery-overlay'));
overlayNode.classList.remove('hidden');
