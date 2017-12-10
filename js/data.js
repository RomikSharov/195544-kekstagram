'use strict';
(function () {

  function onLoad(photosData) {
    window.gallery.renderPictures(photosData);
    window.gallery.registerEventHandlers(photosData);
  }

  window.data = {

    getPhotos: function () {
      window.backend.load(onLoad, window.utils.onError);
    }
  };
})();
