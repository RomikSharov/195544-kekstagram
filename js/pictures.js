'use strict';
(function () {
  var photoArr = window.data.getPhotos();

  window.gallery.renderPictures(photoArr);
  window.gallery.registerEventHandlers(photoArr);

  window.form.registerEventHandlers();
})();
