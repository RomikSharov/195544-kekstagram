'use strict';
(function () {
  var photoData = [];

  function onLoad(photosData) {
    photoData = photosData;
    window.gallery.renderPictures(photosData);
    window.gallery.registerEventHandlers(photosData);

    window.sort.initilize();
  }

  window.data = {

    getPhotos: function () {
      window.backend.load(onLoad, window.utils.onError);
    },
    getPhotoData: function () {
      return photoData;
    },
  };
})();
