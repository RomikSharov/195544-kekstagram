'use strict';
(function () {
  window.initializeSlider = function (slider, callBack) {

    function onDragstartSlider(evt) {
      evt.preventDefault();
      var value = parseInt(slider.style.left, 10);
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      var width = slider.parentElement.clientWidth;
      var minX = evt.clientX - width / 100 * value;

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        var temp = (moveEvt.clientX - minX) / (width / 100);
        if (temp > 100) {
          temp = 100;
        } else if (temp < 0) {
          temp = 0;
        }

        if (typeof callBack === 'function') {
          callBack(temp);
        }
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    }

    slider.setAttribute('draggable', true);
    slider.addEventListener('dragstart', onDragstartSlider);
  };
})();
