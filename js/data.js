'use strict';
(function () {
  var photosData = [];

  function onLoad(data) {
    photosData = data;
    window.gallery.render(data);
  }

  window.data = {

    load: function () {
      window.backend.load(onLoad, window.utils.onError);
    },
    get: function () {
      return photosData;
    },
  };
})();
