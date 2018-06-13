"use strict";

const express = require('express')
const app = express()
// const timeout = require('connect-timeout')

const bodyParser = require('body-parser');

// app.use(timeout(1));
// app.use(haltOnTimedOut);

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

app.use(jsonError);

function haltOnTimedOut(req, res, next) {
  if (!req.timedout) next();
  else {
    res.status(408).json({
      success: false,
      message: 'Request timed out'
    })
  }
}

function jsonError(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({
      success: false,
      message: 'Badly formed JSON'
    });
  }
}

const cleanArray = (array, res) => {

  if (!Array.isArray(array) || !array) {
    res.status(400).json({
      success: false,
      message: 'No array sent'
    });
    return;
  }
  else if (array.length === 0) {
    res.status(200).json({
      success: true,
      data: []
    });
    return;
  }
  const len = array.length;

  for (let i = 0; i < len; i++) {
    if (isNaN(array[i]) || !array[i] && array[i] != 0 || typeof array[i] === 'object') {
      res.status(400).json({
        success: false,
        message: 'Non-number found in array'
      });
      return;
    }
    array[i] = parseFloat(array[i])

    if (array[i] > 1.7976931348623157e+308 || array[i] < -1.7976931348623157e+308) {
      res.status(400).json({
        success: false,
        message: 'Array contains boundary number'
      })
      return;
    }
    // this likely won't even work though
    if (len > Math.pow(2, 32)) {
      res.status(400).json({
        success: false,
        message: 'Array too large'
      })
      return;
    }
  }
  return array;
}

// respond with "hello world" when a GET request is made to the homepage
app.post('/mergeSort', (req, res) => {
  let { unsortedNumbers } = req.body;

  unsortedNumbers = cleanArray(unsortedNumbers, res);
  if (!unsortedNumbers) { return; }

  const len = unsortedNumbers.length;

  const mergeSort = (valuesA, valuesB) => {
    if (valuesA.length > 1) {
      valuesA = mergeSort(valuesA.slice(0, valuesA.length / 2), valuesA.slice(valuesA.length / 2));
    }
    if (valuesB.length > 1) {
      valuesB = mergeSort(valuesB.slice(0, valuesB.length / 2), valuesB.slice(valuesB.length / 2));
    }
    let newValues = [];

    // so we don't lose the shifted values
    let currA = null;
    let currB = null;

    while (currA || currB || valuesA.length > 0 || valuesB.length > 0) {
      // init
      if (currA === null) {
        currA = valuesA.shift();
      }
      if (currB === null) {
        currB = valuesB.shift();
      }

      if (typeof currA === 'undefined') {
        // valuesA is empty but not valuesB
        newValues.push(currB);
        currB = null; // I can shift here, but then valuesB may empty, preventing re-loop
      } else if (typeof currB === 'undefined') {
        // valuesB is empty but not valuesA
        newValues.push(currA);
        currA = null;
      } else {
        // both arrays contain values
        if (currA < currB) {
          newValues.push(currA);
          currA = null;
        } else {
          newValues.push(currB);
          currB = null;
        }
      }
    }
    return newValues;
  }
  let numbers = mergeSort(unsortedNumbers.slice(0, len / 2), unsortedNumbers.slice(len / 2));

  res.status(200).json({
    success: true,
    data: numbers
  });
  return;
})

app.post('/bubbleSort', (req, res) => {
  let { unsortedNumbers } = req.body

  unsortedNumbers = cleanArray(unsortedNumbers, res);
  if (!unsortedNumbers) { return; }

  let unsorted = true;

  while (unsorted) {
    let sorted = true;  // i.e. another pass needed
    for (let i = 0; i < unsortedNumbers.length - 1; i++) {
      if (unsortedNumbers[i] > unsortedNumbers[i + 1]) {
        let temp = unsortedNumbers[i];
        unsortedNumbers[i] = unsortedNumbers[i + 1];
        unsortedNumbers[i + 1] = temp;
        sorted = false;
      }
    }
    if (sorted) {
      unsorted = false;
    }
  }
  res.status(200).json({
    success: true,
    data: unsortedNumbers
  });
  return;
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
