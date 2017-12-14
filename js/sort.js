'use strict';
(function () {
  var filters = document.querySelector('.filters');
  var filterPopular = filters.querySelector('#filter-popular');
  var filterDiscussed = filters.querySelector('#filter-discussed');
  var filterRecommend = filters.querySelector('#filter-recommend');
  var filterRandom = filters.querySelector('#filter-random');

  var photoData = [];

  function showPhotos() {
    window.gallery.renderPictures(photoData);
  }

  function onClickFilterPopular() {
    photoData = window.data.getPhotoData().slice();
    photoData.sort(function (first, second) {
      return second.likes - first.likes;
    });
    window.debounce(showPhotos);
  }

  function onClickFilterDiscussed() {
    photoData = window.data.getPhotoData().slice();
    photoData.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    window.debounce(showPhotos);
  }

  function onClickFilterRecommend() {
    photoData = window.data.getPhotoData().slice();
    window.debounce(showPhotos);
  }

  function onClickFilterRandom() {
    photoData = window.data.getPhotoData().slice();
    photoData = window.utils.getRandomArr(photoData, 25);
    photoData = photoData.filter(function (item, pos) {
      return photoData.indexOf(item) === pos;
    });
    window.debounce(showPhotos);
  }

  window.sort = {
    initilize: function () {
      filters.classList.remove('filters-inactive');

      filterPopular.addEventListener('click', onClickFilterPopular);
      filterDiscussed.addEventListener('click', onClickFilterDiscussed);
      filterRecommend.addEventListener('click', onClickFilterRecommend);
      filterRandom.addEventListener('click', onClickFilterRandom);
    }
  };
})();
