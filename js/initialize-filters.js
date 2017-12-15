'use strict';
(function () {
  window.initializeFilters = function (radioContainer, callBack) {
    function onClickFilter(evt) {
      var elem = evt.target.closest('input[type="radio"]');
      var filter = '';
      if (elem) {
        filter = elem.id;
        if (typeof callBack === 'function') {
          callBack(filter);
        }
      }
    }

    radioContainer.addEventListener('click', onClickFilter);
  };
})();
