'use strict';
(function () {
  window.initializeScale = function (scale, data, callBack) {
    var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
    var buttonInc = document.querySelector('.upload-resize-controls-button-inc');

    function onClickButtonDecInc(evt) {
      if (evt.target === buttonDec) {
        data.scale = Math.max(scale.min, data.scale - scale.step);
      } else {
        data.scale = Math.min(scale.max, data.scale + scale.step);
      }
      if (typeof callBack === 'function') {
        callBack(data.scale);
      }
    }

    buttonDec.addEventListener('click', onClickButtonDecInc);
    buttonInc.addEventListener('click', onClickButtonDecInc);
  };
})();
