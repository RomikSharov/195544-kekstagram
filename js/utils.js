'use strict';

function getRandomNumber(min, max) {
  var randomNum = min + Math.floor(Math.random() * (max - min + 1));
  return randomNum;
}

function getRandValue(arr, startIndex) {
  var index = getRandomNumber(startIndex, arr.length - 1);
  var randomValue = arr[index];
  arr[index] = arr[0];
  arr[0] = randomValue;
  return randomValue;
}

function getRandomArr(arr, maxQuantity) {
  var randomArr = [];
  var length = getRandomNumber(1, maxQuantity);
  for (var i = 0; i < length; i++) {
    randomArr.push(getRandValue(arr, i));
  }
  return randomArr;
}

function clickHandler() {
  var args = Array.from(arguments);
  var callback = args[0];

  return function (event) {
    args.splice(0, 1, event);
    callback.apply(null, args);
  };
}
