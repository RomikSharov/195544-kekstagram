'use strict';

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

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


// var createComments = function () {
//   var commentsLength = comments.length;
//   var firstSentence = comments[Math.floor(Math.random() * (commentsLength))];
//   var secondSentence = '';
//   if (Math.random() > 0.5) {
//     do {
//       secondSentence = comments[Math.floor(Math.random() * (commentsLength))];
//     } while (secondSentence === firstSentence);
//   } else {
//     return [firstSentence];
//   }

//   return [firstSentence, secondSentence];
// };


function createPhotos() {
  var photosArr = [];
  for (var i = 0; i <= 25; i++) {
    var photo = {};
    photo.url = 'photos/' + (i + 1) + '.jpg';
    photo.likes = getRandomNumber(15, 200);
    photo.comments = [];
    var commentsLength = comments.length;
    var numberOfComments = getRandomNumber(0, 1);
    for (var j = 0; j <= numberOfComments; j++) {
      photo.comments[j] = getRandValue(comments, {start: j, end: commentsLength - 1});
    }
    photosArr[i] = photo;
  }
  return photosArr;
}
var photos = createPhotos();

var internalSelectors = {
  image: '.picture img',
  likes: '.picture-likes',
  comments: '.picture-comments'
};

var renderPhoto = function (selector, interSelectors, photo) {
  selector.querySelector(interSelectors.image).src = photo.url;
  selector.querySelector(interSelectors.likes).textContent = photo.likes;
  selector.querySelector(interSelectors.comments).textContent = photo.comments;

  return selector;
};

var renderPictures = function (photosArr) {
  var fragment = document.createDocumentFragment();
  var pictureSelectorTemplate = document.querySelector('#picture-template');

  var photosLength = photosArr.length;
  for (var i = 0; i < photosLength; i++) {
    var picturelSelector = pictureSelectorTemplate.content.cloneNode(true);
    fragment.appendChild(renderPhoto(picturelSelector, internalSelectors, photosArr[i]));
  }
  return fragment;
};
var pictures = document.querySelector('.pictures');
pictures.appendChild(renderPictures(photos));

function renderGalleryOverlay() {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.querySelector('.gallery-overlay-image').src = photos[0].url;
  galleryOverlay.querySelector('.likes-count').textContent = photos[0].likes;
  galleryOverlay.querySelector('.comments-count').textContent = photos[0].comments.length;

  galleryOverlay.classList.remove('hidden');
}
renderGalleryOverlay();
