'use strict';
(function () {
  window.initializeFilters = function (radioContainer, callBack) {
    function onClickFilter(evt) {
      var elt = evt.target.closest('input[type="radio"]');
      var filter = '';
      if (elt) {
        filter = elt.id;
        if (typeof callBack === 'function') {
          callBack(filter);
        }
      }
    }

    radioContainer.addEventListener('click', onClickFilter);
  };
})();
