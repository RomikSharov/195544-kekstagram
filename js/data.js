
'use strict';
(function () {

  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var photoCount = 25;

  window.data = {
    getPhotos: function () {
      var arr = [];
      for (var i = 1; i <= photoCount; i++) {
        var item = {};
        item.url = 'photos/' + i + '.jpg';
        item.likes = window.utils.getRandomNumber(15, 200);
        item.comments = window.utils.getRandomArr(comments, 2);
        arr.push(item);
      }
      return arr;
    }
  };
})();
