'use strict';
(function () {
  var url = 'https://1510.dump.academy/kekstagram';
  var timeout = 10000;

  function init(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    function upLoad() {
      if (xhr.status === 200) {
        if (typeof onLoad === 'function') {
          onLoad(xhr.response);
        }
      } else {
        if (typeof onError === 'function') {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      }
    }

    xhr.responseType = 'json';
    xhr.timeout = timeout;

    xhr.addEventListener('load', upLoad);

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  }


  window.backend = {
    load: function (onLoad, onError) {
      var xhr = init(onLoad, onError);

      xhr.open('GET', url + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = init(onLoad, onError);

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
