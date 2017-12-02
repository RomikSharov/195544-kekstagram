'use strict';
(function () {
  window.utils = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    getRandomNumber: function (min, max) {
      var randomNum = min + Math.floor(Math.random() * (max - min + 1));
      return randomNum;
    },
    getRandValue: function (arr, startIndex) {
      var index = window.utils.getRandomNumber(startIndex, arr.length - 1);
      var randomValue = arr[index];
      arr[index] = arr[0];
      arr[0] = randomValue;
      return randomValue;
    },
    getRandomArr: function (arr, maxQuantity) {
      var randomArr = [];
      var length = window.utils.getRandomNumber(1, maxQuantity);
      for (var i = 0; i < length; i++) {
        randomArr.push(window.utils.getRandValue(arr, i));
      }
      return randomArr;
    },
    clickHandler: function () {
      var args = Array.from(arguments);
      var callback = args[0];

      return function (event) {
        args.splice(0, 1, event);
        callback.apply(null, args);
      };
    },
    keyDownHendler: function () {
      var args = Array.from(arguments);
      var callback = args.splice(0, 1)[0];
      var keyCode = args.splice(0, 1)[0];
      return function (event) {
        if (event.keyCode === keyCode) {
          args.unshift(event);
          callback.apply(null, args);
          args.shift();
        }
      };
    }
  };
})();
