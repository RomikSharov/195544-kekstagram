'use strict';

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var createComments = function () {
  var commentsLength = comments.length;
  var firstSentence = comments[Math.floor(Math.random() * (commentsLength))];
  var secondSentence = '';
  if (Math.random() > 0.5) {
    do {
      secondSentence = comments[Math.floor(Math.random() * (commentsLength))];
    } while (secondSentence === firstSentence);
  } else {
    return [firstSentence];
  }

  return [firstSentence, secondSentence];
};

var fotos = [];
(function (fotosArr) {
  for (var i = 0; i <= 25; i++) {
    fotosArr[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: 15 + Math.floor(Math.random() * (200 - 15 + 1)),
      comments: createComments()
    };
  }
})(fotos);

var optionPictureDomElement = {
  image: '.picture img',
  likes: '.picture-likes',
  comments: '.picture-comments'
};

var createPictureDomElement = function (selector, option, foto) {
  selector.querySelector(option.image).src = foto.url;
  selector.querySelector(option.likes).textContent = foto.likes;
  selector.querySelector(option.comments).textContent = foto.comments;

  return selector;
};

var renderGalleryOverlay = function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  createPictureDomElement(galleryOverlay, {image: '.gallery-overlay-image', likes: '.likes-count', comments: '.comments-count'}, fotos[0]);
  galleryOverlay.classList.remove('hidden');
};

var createSimilarListDomElement = function (fotosArr) {
  var fragment = document.createDocumentFragment();
  var fotosArrLength = fotosArr.length;
  for (var i = 0; i < fotosArrLength; i++) {
    var pictureDomElement = document.querySelector('#picture-template').content.cloneNode(true);
    fragment.appendChild(createPictureDomElement(pictureDomElement, optionPictureDomElement, fotosArr[i]));
  }
  return fragment;
};

var pictures = document.querySelector('.pictures');
pictures.appendChild(createSimilarListDomElement(fotos));
renderGalleryOverlay();
