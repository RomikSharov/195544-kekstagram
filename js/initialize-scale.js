'use strict';
(function () {
  window.initializeScale = function (scale, data, callBack) {
    var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
    var buttonInc = document.querySelector('.upload-resize-controls-button-inc');

    function onClickResize(evt) {
      if (evt.target === buttonDec) {
        data.scale = Math.max(scale.min, data.scale - scale.step);
      } else if (evt.target === buttonInc) {
        data.scale = Math.min(scale.max, data.scale + scale.step);
      }
      if (typeof callBack === 'function') {
        callBack(data.scale);
      }
    }

    document.querySelector('.upload-resize-controls').addEventListener('click', onClickResize);
  };
})();
