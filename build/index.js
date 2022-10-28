'use strict';

var React = require('react');
var require$$0$1 = require('fs');
var util = require('util');
var Stream = require('stream');
var zlib = require('zlib');
var require$$0 = require('assert');
var require$$1 = require('buffer');
var http = require('http');
var https = require('https');
var url = require('url');
var tty = require('tty');
var os = require('os');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
var url__default = /*#__PURE__*/_interopDefaultLegacy(url);
var tty__default = /*#__PURE__*/_interopDefaultLegacy(tty);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157

var canPromise = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then
};

let toSJISFunction;
const CODEWORDS_COUNT = [
  0, // Not used
  26, 44, 70, 100, 134, 172, 196, 242, 292, 346,
  404, 466, 532, 581, 655, 733, 815, 901, 991, 1085,
  1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185,
  2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706
];

/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */
var getSymbolSize$1 = function getSymbolSize (version) {
  if (!version) throw new Error('"version" cannot be null or undefined')
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40')
  return version * 4 + 17
};

/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */
var getSymbolTotalCodewords = function getSymbolTotalCodewords (version) {
  return CODEWORDS_COUNT[version]
};

/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */
var getBCHDigit = function (data) {
  let digit = 0;

  while (data !== 0) {
    digit++;
    data >>>= 1;
  }

  return digit
};

var setToSJISFunction = function setToSJISFunction (f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.')
  }

  toSJISFunction = f;
};

var isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined'
};

var toSJIS = function toSJIS (kanji) {
  return toSJISFunction(kanji)
};

var utils$2 = {
	getSymbolSize: getSymbolSize$1,
	getSymbolTotalCodewords: getSymbolTotalCodewords,
	getBCHDigit: getBCHDigit,
	setToSJISFunction: setToSJISFunction,
	isKanjiModeEnabled: isKanjiModeEnabled,
	toSJIS: toSJIS
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var errorCorrectionLevel = createCommonjsModule(function (module, exports) {
exports.L = { bit: 1 };
exports.M = { bit: 0 };
exports.Q = { bit: 3 };
exports.H = { bit: 2 };

function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase();

  switch (lcStr) {
    case 'l':
    case 'low':
      return exports.L

    case 'm':
    case 'medium':
      return exports.M

    case 'q':
    case 'quartile':
      return exports.Q

    case 'h':
    case 'high':
      return exports.H

    default:
      throw new Error('Unknown EC Level: ' + string)
  }
}

exports.isValid = function isValid (level) {
  return level && typeof level.bit !== 'undefined' &&
    level.bit >= 0 && level.bit < 4
};

exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
};
});

function BitBuffer () {
  this.buffer = [];
  this.length = 0;
}

BitBuffer.prototype = {

  get: function (index) {
    const bufIndex = Math.floor(index / 8);
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1
  },

  put: function (num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1);
    }
  },

  getLengthInBits: function () {
    return this.length
  },

  putBit: function (bit) {
    const bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }

    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
    }

    this.length++;
  }
};

var bitBuffer = BitBuffer;

/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */
function BitMatrix (size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0')
  }

  this.size = size;
  this.data = new Uint8Array(size * size);
  this.reservedBit = new Uint8Array(size * size);
}

/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */
BitMatrix.prototype.set = function (row, col, value, reserved) {
  const index = row * this.size + col;
  this.data[index] = value;
  if (reserved) this.reservedBit[index] = true;
};

/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */
BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col]
};

/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */
BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value;
};

/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */
BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col]
};

var bitMatrix = BitMatrix;

var alignmentPattern = createCommonjsModule(function (module, exports) {
/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */

const getSymbolSize = utils$2.getSymbolSize;

/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */
exports.getRowColCoords = function getRowColCoords (version) {
  if (version === 1) return []

  const posCount = Math.floor(version / 7) + 2;
  const size = getSymbolSize(version);
  const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
  const positions = [size - 7]; // Last coord is always (size - 7)

  for (let i = 1; i < posCount - 1; i++) {
    positions[i] = positions[i - 1] - intervals;
  }

  positions.push(6); // First coord is always 6

  return positions.reverse()
};

/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions (version) {
  const coords = [];
  const pos = exports.getRowColCoords(version);
  const posLength = pos.length;

  for (let i = 0; i < posLength; i++) {
    for (let j = 0; j < posLength; j++) {
      // Skip if position is occupied by finder patterns
      if ((i === 0 && j === 0) || // top-left
          (i === 0 && j === posLength - 1) || // bottom-left
          (i === posLength - 1 && j === 0)) { // top-right
        continue
      }

      coords.push([pos[i], pos[j]]);
    }
  }

  return coords
};
});

const getSymbolSize = utils$2.getSymbolSize;
const FINDER_PATTERN_SIZE = 7;

/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
var getPositions = function getPositions (version) {
  const size = getSymbolSize(version);

  return [
    // top-left
    [0, 0],
    // top-right
    [size - FINDER_PATTERN_SIZE, 0],
    // bottom-left
    [0, size - FINDER_PATTERN_SIZE]
  ]
};

var finderPattern = {
	getPositions: getPositions
};

var maskPattern = createCommonjsModule(function (module, exports) {
/**
 * Data mask pattern reference
 * @type {Object}
 */
exports.Patterns = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};

/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */
const PenaltyScores = {
  N1: 3,
  N2: 3,
  N3: 40,
  N4: 10
};

/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */
exports.isValid = function isValid (mask) {
  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7
};

/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */
exports.from = function from (value) {
  return exports.isValid(value) ? parseInt(value, 10) : undefined
};

/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/
exports.getPenaltyN1 = function getPenaltyN1 (data) {
  const size = data.size;
  let points = 0;
  let sameCountCol = 0;
  let sameCountRow = 0;
  let lastCol = null;
  let lastRow = null;

  for (let row = 0; row < size; row++) {
    sameCountCol = sameCountRow = 0;
    lastCol = lastRow = null;

    for (let col = 0; col < size; col++) {
      let module = data.get(row, col);
      if (module === lastCol) {
        sameCountCol++;
      } else {
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        lastCol = module;
        sameCountCol = 1;
      }

      module = data.get(col, row);
      if (module === lastRow) {
        sameCountRow++;
      } else {
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
        lastRow = module;
        sameCountRow = 1;
      }
    }

    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
  }

  return points
};

/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */
exports.getPenaltyN2 = function getPenaltyN2 (data) {
  const size = data.size;
  let points = 0;

  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      const last = data.get(row, col) +
        data.get(row, col + 1) +
        data.get(row + 1, col) +
        data.get(row + 1, col + 1);

      if (last === 4 || last === 0) points++;
    }
  }

  return points * PenaltyScores.N2
};

/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */
exports.getPenaltyN3 = function getPenaltyN3 (data) {
  const size = data.size;
  let points = 0;
  let bitsCol = 0;
  let bitsRow = 0;

  for (let row = 0; row < size; row++) {
    bitsCol = bitsRow = 0;
    for (let col = 0; col < size; col++) {
      bitsCol = ((bitsCol << 1) & 0x7FF) | data.get(row, col);
      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;

      bitsRow = ((bitsRow << 1) & 0x7FF) | data.get(col, row);
      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
    }
  }

  return points * PenaltyScores.N3
};

/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */
exports.getPenaltyN4 = function getPenaltyN4 (data) {
  let darkCount = 0;
  const modulesCount = data.data.length;

  for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];

  const k = Math.abs(Math.ceil((darkCount * 100 / modulesCount) / 5) - 10);

  return k * PenaltyScores.N4
};

/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */
function getMaskAt (maskPattern, i, j) {
  switch (maskPattern) {
    case exports.Patterns.PATTERN000: return (i + j) % 2 === 0
    case exports.Patterns.PATTERN001: return i % 2 === 0
    case exports.Patterns.PATTERN010: return j % 3 === 0
    case exports.Patterns.PATTERN011: return (i + j) % 3 === 0
    case exports.Patterns.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
    case exports.Patterns.PATTERN101: return (i * j) % 2 + (i * j) % 3 === 0
    case exports.Patterns.PATTERN110: return ((i * j) % 2 + (i * j) % 3) % 2 === 0
    case exports.Patterns.PATTERN111: return ((i * j) % 3 + (i + j) % 2) % 2 === 0

    default: throw new Error('bad maskPattern:' + maskPattern)
  }
}

/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */
exports.applyMask = function applyMask (pattern, data) {
  const size = data.size;

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      if (data.isReserved(row, col)) continue
      data.xor(row, col, getMaskAt(pattern, row, col));
    }
  }
};

/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */
exports.getBestMask = function getBestMask (data, setupFormatFunc) {
  const numPatterns = Object.keys(exports.Patterns).length;
  let bestPattern = 0;
  let lowerPenalty = Infinity;

  for (let p = 0; p < numPatterns; p++) {
    setupFormatFunc(p);
    exports.applyMask(p, data);

    // Calculate penalty
    const penalty =
      exports.getPenaltyN1(data) +
      exports.getPenaltyN2(data) +
      exports.getPenaltyN3(data) +
      exports.getPenaltyN4(data);

    // Undo previously applied mask
    exports.applyMask(p, data);

    if (penalty < lowerPenalty) {
      lowerPenalty = penalty;
      bestPattern = p;
    }
  }

  return bestPattern
};
});

const EC_BLOCKS_TABLE = [
// L  M  Q  H
  1, 1, 1, 1,
  1, 1, 1, 1,
  1, 1, 2, 2,
  1, 2, 2, 4,
  1, 2, 4, 4,
  2, 4, 4, 4,
  2, 4, 6, 5,
  2, 4, 6, 6,
  2, 5, 8, 8,
  4, 5, 8, 8,
  4, 5, 8, 11,
  4, 8, 10, 11,
  4, 9, 12, 16,
  4, 9, 16, 16,
  6, 10, 12, 18,
  6, 10, 17, 16,
  6, 11, 16, 19,
  6, 13, 18, 21,
  7, 14, 21, 25,
  8, 16, 20, 25,
  8, 17, 23, 25,
  9, 17, 23, 34,
  9, 18, 25, 30,
  10, 20, 27, 32,
  12, 21, 29, 35,
  12, 23, 34, 37,
  12, 25, 34, 40,
  13, 26, 35, 42,
  14, 28, 38, 45,
  15, 29, 40, 48,
  16, 31, 43, 51,
  17, 33, 45, 54,
  18, 35, 48, 57,
  19, 37, 51, 60,
  19, 38, 53, 63,
  20, 40, 56, 66,
  21, 43, 59, 70,
  22, 45, 62, 74,
  24, 47, 65, 77,
  25, 49, 68, 81
];

const EC_CODEWORDS_TABLE = [
// L  M  Q  H
  7, 10, 13, 17,
  10, 16, 22, 28,
  15, 26, 36, 44,
  20, 36, 52, 64,
  26, 48, 72, 88,
  36, 64, 96, 112,
  40, 72, 108, 130,
  48, 88, 132, 156,
  60, 110, 160, 192,
  72, 130, 192, 224,
  80, 150, 224, 264,
  96, 176, 260, 308,
  104, 198, 288, 352,
  120, 216, 320, 384,
  132, 240, 360, 432,
  144, 280, 408, 480,
  168, 308, 448, 532,
  180, 338, 504, 588,
  196, 364, 546, 650,
  224, 416, 600, 700,
  224, 442, 644, 750,
  252, 476, 690, 816,
  270, 504, 750, 900,
  300, 560, 810, 960,
  312, 588, 870, 1050,
  336, 644, 952, 1110,
  360, 700, 1020, 1200,
  390, 728, 1050, 1260,
  420, 784, 1140, 1350,
  450, 812, 1200, 1440,
  480, 868, 1290, 1530,
  510, 924, 1350, 1620,
  540, 980, 1440, 1710,
  570, 1036, 1530, 1800,
  570, 1064, 1590, 1890,
  600, 1120, 1680, 1980,
  630, 1204, 1770, 2100,
  660, 1260, 1860, 2220,
  720, 1316, 1950, 2310,
  750, 1372, 2040, 2430
];

/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */
var getBlocksCount = function getBlocksCount (version, errorCorrectionLevel$1) {
  switch (errorCorrectionLevel$1) {
    case errorCorrectionLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0]
    case errorCorrectionLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1]
    case errorCorrectionLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2]
    case errorCorrectionLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
};

/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */
var getTotalCodewordsCount = function getTotalCodewordsCount (version, errorCorrectionLevel$1) {
  switch (errorCorrectionLevel$1) {
    case errorCorrectionLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0]
    case errorCorrectionLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1]
    case errorCorrectionLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2]
    case errorCorrectionLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
};

var errorCorrectionCode = {
	getBlocksCount: getBlocksCount,
	getTotalCodewordsCount: getTotalCodewordsCount
};

const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */
;(function initTables () {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;

    x <<= 1; // multiply by 2

    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.
    if (x & 0x100) { // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D;
    }
  }

  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255];
  }
}());

/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
var log = function log (n) {
  if (n < 1) throw new Error('log(' + n + ')')
  return LOG_TABLE[n]
};

/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
var exp = function exp (n) {
  return EXP_TABLE[n]
};

/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */
var mul = function mul (x, y) {
  if (x === 0 || y === 0) return 0

  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]]
};

var galoisField = {
	log: log,
	exp: exp,
	mul: mul
};

var polynomial = createCommonjsModule(function (module, exports) {
/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */
exports.mul = function mul (p1, p2) {
  const coeff = new Uint8Array(p1.length + p2.length - 1);

  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      coeff[i + j] ^= galoisField.mul(p1[i], p2[j]);
    }
  }

  return coeff
};

/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */
exports.mod = function mod (divident, divisor) {
  let result = new Uint8Array(divident);

  while ((result.length - divisor.length) >= 0) {
    const coeff = result[0];

    for (let i = 0; i < divisor.length; i++) {
      result[i] ^= galoisField.mul(divisor[i], coeff);
    }

    // remove all zeros from buffer head
    let offset = 0;
    while (offset < result.length && result[offset] === 0) offset++;
    result = result.slice(offset);
  }

  return result
};

/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */
exports.generateECPolynomial = function generateECPolynomial (degree) {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < degree; i++) {
    poly = exports.mul(poly, new Uint8Array([1, galoisField.exp(i)]));
  }

  return poly
};
});

function ReedSolomonEncoder (degree) {
  this.genPoly = undefined;
  this.degree = degree;

  if (this.degree) this.initialize(this.degree);
}

/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */
ReedSolomonEncoder.prototype.initialize = function initialize (degree) {
  // create an irreducible generator polynomial
  this.degree = degree;
  this.genPoly = polynomial.generateECPolynomial(this.degree);
};

/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */
ReedSolomonEncoder.prototype.encode = function encode (data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized')
  }

  // Calculate EC for this data block
  // extends data size to data+genPoly size
  const paddedData = new Uint8Array(data.length + this.degree);
  paddedData.set(data);

  // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial
  const remainder = polynomial.mod(paddedData, this.genPoly);

  // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients
  const start = this.degree - remainder.length;
  if (start > 0) {
    const buff = new Uint8Array(this.degree);
    buff.set(remainder, start);

    return buff
  }

  return remainder
};

var reedSolomonEncoder = ReedSolomonEncoder;

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */
var isValid = function isValid (version) {
  return !isNaN(version) && version >= 1 && version <= 40
};

var versionCheck = {
	isValid: isValid
};

const numeric = '[0-9]+';
const alphanumeric = '[A-Z $%*+\\-./:]+';
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' +
  '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' +
  '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' +
  '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, '\\u');

const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';

var KANJI = new RegExp(kanji, 'g');
var BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
var BYTE = new RegExp(byte, 'g');
var NUMERIC = new RegExp(numeric, 'g');
var ALPHANUMERIC = new RegExp(alphanumeric, 'g');

const TEST_KANJI = new RegExp('^' + kanji + '$');
const TEST_NUMERIC = new RegExp('^' + numeric + '$');
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');

var testKanji = function testKanji (str) {
  return TEST_KANJI.test(str)
};

var testNumeric = function testNumeric (str) {
  return TEST_NUMERIC.test(str)
};

var testAlphanumeric = function testAlphanumeric (str) {
  return TEST_ALPHANUMERIC.test(str)
};

var regex = {
	KANJI: KANJI,
	BYTE_KANJI: BYTE_KANJI,
	BYTE: BYTE,
	NUMERIC: NUMERIC,
	ALPHANUMERIC: ALPHANUMERIC,
	testKanji: testKanji,
	testNumeric: testNumeric,
	testAlphanumeric: testAlphanumeric
};

var mode = createCommonjsModule(function (module, exports) {
/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */
exports.NUMERIC = {
  id: 'Numeric',
  bit: 1 << 0,
  ccBits: [10, 12, 14]
};

/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */
exports.ALPHANUMERIC = {
  id: 'Alphanumeric',
  bit: 1 << 1,
  ccBits: [9, 11, 13]
};

/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */
exports.BYTE = {
  id: 'Byte',
  bit: 1 << 2,
  ccBits: [8, 16, 16]
};

/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */
exports.KANJI = {
  id: 'Kanji',
  bit: 1 << 3,
  ccBits: [8, 10, 12]
};

/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */
exports.MIXED = {
  bit: -1
};

/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */
exports.getCharCountIndicator = function getCharCountIndicator (mode, version) {
  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode)

  if (!versionCheck.isValid(version)) {
    throw new Error('Invalid version: ' + version)
  }

  if (version >= 1 && version < 10) return mode.ccBits[0]
  else if (version < 27) return mode.ccBits[1]
  return mode.ccBits[2]
};

/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */
exports.getBestModeForData = function getBestModeForData (dataStr) {
  if (regex.testNumeric(dataStr)) return exports.NUMERIC
  else if (regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC
  else if (regex.testKanji(dataStr)) return exports.KANJI
  else return exports.BYTE
};

/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */
exports.toString = function toString (mode) {
  if (mode && mode.id) return mode.id
  throw new Error('Invalid mode')
};

/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */
exports.isValid = function isValid (mode) {
  return mode && mode.bit && mode.ccBits
};

/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */
function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase();

  switch (lcStr) {
    case 'numeric':
      return exports.NUMERIC
    case 'alphanumeric':
      return exports.ALPHANUMERIC
    case 'kanji':
      return exports.KANJI
    case 'byte':
      return exports.BYTE
    default:
      throw new Error('Unknown mode: ' + string)
  }
}

/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */
exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
};
});

var version$1 = createCommonjsModule(function (module, exports) {
// Generator polynomial used to encode version information
const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
const G18_BCH = utils$2.getBCHDigit(G18);

function getBestVersionForDataLength (mode, length, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
      return currentVersion
    }
  }

  return undefined
}

function getReservedBitsCount (mode$1, version) {
  // Character count indicator + mode indicator bits
  return mode.getCharCountIndicator(mode$1, version) + 4
}

function getTotalBitsFromDataArray (segments, version) {
  let totalBits = 0;

  segments.forEach(function (data) {
    const reservedBits = getReservedBitsCount(data.mode, version);
    totalBits += reservedBits + data.getBitsLength();
  });

  return totalBits
}

function getBestVersionForMixedData (segments, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    const length = getTotalBitsFromDataArray(segments, currentVersion);
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode.MIXED)) {
      return currentVersion
    }
  }

  return undefined
}

/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */
exports.from = function from (value, defaultValue) {
  if (versionCheck.isValid(value)) {
    return parseInt(value, 10)
  }

  return defaultValue
};

/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */
exports.getCapacity = function getCapacity (version, errorCorrectionLevel, mode$1) {
  if (!versionCheck.isValid(version)) {
    throw new Error('Invalid QR Code version')
  }

  // Use Byte mode as default
  if (typeof mode$1 === 'undefined') mode$1 = mode.BYTE;

  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = utils$2.getSymbolTotalCodewords(version);

  // Total number of error correction codewords
  const ecTotalCodewords = errorCorrectionCode.getTotalCodewordsCount(version, errorCorrectionLevel);

  // Total number of data codewords
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

  if (mode$1 === mode.MIXED) return dataTotalCodewordsBits

  const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode$1, version);

  // Return max number of storable codewords
  switch (mode$1) {
    case mode.NUMERIC:
      return Math.floor((usableBits / 10) * 3)

    case mode.ALPHANUMERIC:
      return Math.floor((usableBits / 11) * 2)

    case mode.KANJI:
      return Math.floor(usableBits / 13)

    case mode.BYTE:
    default:
      return Math.floor(usableBits / 8)
  }
};

/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */
exports.getBestVersionForData = function getBestVersionForData (data, errorCorrectionLevel$1) {
  let seg;

  const ecl = errorCorrectionLevel.from(errorCorrectionLevel$1, errorCorrectionLevel.M);

  if (Array.isArray(data)) {
    if (data.length > 1) {
      return getBestVersionForMixedData(data, ecl)
    }

    if (data.length === 0) {
      return 1
    }

    seg = data[0];
  } else {
    seg = data;
  }

  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl)
};

/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */
exports.getEncodedBits = function getEncodedBits (version) {
  if (!versionCheck.isValid(version) || version < 7) {
    throw new Error('Invalid QR Code version')
  }

  let d = version << 12;

  while (utils$2.getBCHDigit(d) - G18_BCH >= 0) {
    d ^= (G18 << (utils$2.getBCHDigit(d) - G18_BCH));
  }

  return (version << 12) | d
};
});

const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
const G15_BCH = utils$2.getBCHDigit(G15);

/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */
var getEncodedBits = function getEncodedBits (errorCorrectionLevel, mask) {
  const data = ((errorCorrectionLevel.bit << 3) | mask);
  let d = data << 10;

  while (utils$2.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= (G15 << (utils$2.getBCHDigit(d) - G15_BCH));
  }

  // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string
  return ((data << 10) | d) ^ G15_MASK
};

var formatInfo = {
	getEncodedBits: getEncodedBits
};

function NumericData (data) {
  this.mode = mode.NUMERIC;
  this.data = data.toString();
}

NumericData.getBitsLength = function getBitsLength (length) {
  return 10 * Math.floor(length / 3) + ((length % 3) ? ((length % 3) * 3 + 1) : 0)
};

NumericData.prototype.getLength = function getLength () {
  return this.data.length
};

NumericData.prototype.getBitsLength = function getBitsLength () {
  return NumericData.getBitsLength(this.data.length)
};

NumericData.prototype.write = function write (bitBuffer) {
  let i, group, value;

  // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);

    bitBuffer.put(value, 10);
  }

  // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.
  const remainingNum = this.data.length - i;
  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);

    bitBuffer.put(value, remainingNum * 3 + 1);
  }
};

var numericData = NumericData;

/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */
const ALPHA_NUM_CHARS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ' ', '$', '%', '*', '+', '-', '.', '/', ':'
];

function AlphanumericData (data) {
  this.mode = mode.ALPHANUMERIC;
  this.data = data;
}

AlphanumericData.getBitsLength = function getBitsLength (length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2)
};

AlphanumericData.prototype.getLength = function getLength () {
  return this.data.length
};

AlphanumericData.prototype.getBitsLength = function getBitsLength () {
  return AlphanumericData.getBitsLength(this.data.length)
};

AlphanumericData.prototype.write = function write (bitBuffer) {
  let i;

  // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;

    // The character value of the second digit is added to the product
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);

    // The sum is then stored as 11-bit binary number
    bitBuffer.put(value, 11);
  }

  // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.
  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};

var alphanumericData = AlphanumericData;

var encodeUtf8 = function encodeUtf8 (input) {
  var result = [];
  var size = input.length;

  for (var index = 0; index < size; index++) {
    var point = input.charCodeAt(index);

    if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {
      var second = input.charCodeAt(index + 1);

      if (second >= 0xDC00 && second <= 0xDFFF) {
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        index += 1;
      }
    }

    // US-ASCII
    if (point < 0x80) {
      result.push(point);
      continue
    }

    // 2-byte UTF-8
    if (point < 0x800) {
      result.push((point >> 6) | 192);
      result.push((point & 63) | 128);
      continue
    }

    // 3-byte UTF-8
    if (point < 0xD800 || (point >= 0xE000 && point < 0x10000)) {
      result.push((point >> 12) | 224);
      result.push(((point >> 6) & 63) | 128);
      result.push((point & 63) | 128);
      continue
    }

    // 4-byte UTF-8
    if (point >= 0x10000 && point <= 0x10FFFF) {
      result.push((point >> 18) | 240);
      result.push(((point >> 12) & 63) | 128);
      result.push(((point >> 6) & 63) | 128);
      result.push((point & 63) | 128);
      continue
    }

    // Invalid character
    result.push(0xEF, 0xBF, 0xBD);
  }

  return new Uint8Array(result).buffer
};

function ByteData (data) {
  this.mode = mode.BYTE;
  this.data = new Uint8Array(encodeUtf8(data));
}

ByteData.getBitsLength = function getBitsLength (length) {
  return length * 8
};

ByteData.prototype.getLength = function getLength () {
  return this.data.length
};

ByteData.prototype.getBitsLength = function getBitsLength () {
  return ByteData.getBitsLength(this.data.length)
};

ByteData.prototype.write = function (bitBuffer) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8);
  }
};

var byteData = ByteData;

function KanjiData (data) {
  this.mode = mode.KANJI;
  this.data = data;
}

KanjiData.getBitsLength = function getBitsLength (length) {
  return length * 13
};

KanjiData.prototype.getLength = function getLength () {
  return this.data.length
};

KanjiData.prototype.getBitsLength = function getBitsLength () {
  return KanjiData.getBitsLength(this.data.length)
};

KanjiData.prototype.write = function (bitBuffer) {
  let i;

  // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.
  for (i = 0; i < this.data.length; i++) {
    let value = utils$2.toSJIS(this.data[i]);

    // For characters with Shift JIS values from 0x8140 to 0x9FFC:
    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140;

    // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140;
    } else {
      throw new Error(
        'Invalid SJIS character: ' + this.data[i] + '\n' +
        'Make sure your charset is UTF-8')
    }

    // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product
    value = (((value >>> 8) & 0xff) * 0xC0) + (value & 0xff);

    // Convert result to a 13-bit binary string
    bitBuffer.put(value, 13);
  }
};

var kanjiData = KanjiData;

var dijkstra_1 = createCommonjsModule(function (module) {

/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
var dijkstra = {
  single_source_shortest_paths: function(graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
        u, v,
        cost_of_s_to_u,
        adjacent_nodes,
        cost_of_e,
        cost_of_s_to_u_plus_cost_of_e,
        cost_of_s_to_v,
        first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function(predecessors, d) {
    var nodes = [];
    var u = d;
    while (u) {
      nodes.push(u);
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function(graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors, d);
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
          t = {},
          key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = {value: value, cost: cost};
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    }
  }
};


// node.js module exports
{
  module.exports = dijkstra;
}
});

var segments = createCommonjsModule(function (module, exports) {
/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */
function getStringByteLength (str) {
  return unescape(encodeURIComponent(str)).length
}

/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */
function getSegments (regex, mode, str) {
  const segments = [];
  let result;

  while ((result = regex.exec(str)) !== null) {
    segments.push({
      data: result[0],
      index: result.index,
      mode: mode,
      length: result[0].length
    });
  }

  return segments
}

/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */
function getSegmentsFromString (dataStr) {
  const numSegs = getSegments(regex.NUMERIC, mode.NUMERIC, dataStr);
  const alphaNumSegs = getSegments(regex.ALPHANUMERIC, mode.ALPHANUMERIC, dataStr);
  let byteSegs;
  let kanjiSegs;

  if (utils$2.isKanjiModeEnabled()) {
    byteSegs = getSegments(regex.BYTE, mode.BYTE, dataStr);
    kanjiSegs = getSegments(regex.KANJI, mode.KANJI, dataStr);
  } else {
    byteSegs = getSegments(regex.BYTE_KANJI, mode.BYTE, dataStr);
    kanjiSegs = [];
  }

  const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);

  return segs
    .sort(function (s1, s2) {
      return s1.index - s2.index
    })
    .map(function (obj) {
      return {
        data: obj.data,
        mode: obj.mode,
        length: obj.length
      }
    })
}

/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */
function getSegmentBitsLength (length, mode$1) {
  switch (mode$1) {
    case mode.NUMERIC:
      return numericData.getBitsLength(length)
    case mode.ALPHANUMERIC:
      return alphanumericData.getBitsLength(length)
    case mode.KANJI:
      return kanjiData.getBitsLength(length)
    case mode.BYTE:
      return byteData.getBitsLength(length)
  }
}

/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function mergeSegments (segs) {
  return segs.reduce(function (acc, curr) {
    const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
    if (prevSeg && prevSeg.mode === curr.mode) {
      acc[acc.length - 1].data += curr.data;
      return acc
    }

    acc.push(curr);
    return acc
  }, [])
}

/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function buildNodes (segs) {
  const nodes = [];
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i];

    switch (seg.mode) {
      case mode.NUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: mode.ALPHANUMERIC, length: seg.length },
          { data: seg.data, mode: mode.BYTE, length: seg.length }
        ]);
        break
      case mode.ALPHANUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: mode.BYTE, length: seg.length }
        ]);
        break
      case mode.KANJI:
        nodes.push([seg,
          { data: seg.data, mode: mode.BYTE, length: getStringByteLength(seg.data) }
        ]);
        break
      case mode.BYTE:
        nodes.push([
          { data: seg.data, mode: mode.BYTE, length: getStringByteLength(seg.data) }
        ]);
    }
  }

  return nodes
}

/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */
function buildGraph (nodes, version) {
  const table = {};
  const graph = { start: {} };
  let prevNodeIds = ['start'];

  for (let i = 0; i < nodes.length; i++) {
    const nodeGroup = nodes[i];
    const currentNodeIds = [];

    for (let j = 0; j < nodeGroup.length; j++) {
      const node = nodeGroup[j];
      const key = '' + i + j;

      currentNodeIds.push(key);
      table[key] = { node: node, lastCount: 0 };
      graph[key] = {};

      for (let n = 0; n < prevNodeIds.length; n++) {
        const prevNodeId = prevNodeIds[n];

        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
          graph[prevNodeId][key] =
            getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) -
            getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);

          table[prevNodeId].lastCount += node.length;
        } else {
          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;

          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) +
            4 + mode.getCharCountIndicator(node.mode, version); // switch cost
        }
      }
    }

    prevNodeIds = currentNodeIds;
  }

  for (let n = 0; n < prevNodeIds.length; n++) {
    graph[prevNodeIds[n]].end = 0;
  }

  return { map: graph, table: table }
}

/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */
function buildSingleSegment (data, modesHint) {
  let mode$1;
  const bestMode = mode.getBestModeForData(data);

  mode$1 = mode.from(modesHint, bestMode);

  // Make sure data can be encoded
  if (mode$1 !== mode.BYTE && mode$1.bit < bestMode.bit) {
    throw new Error('"' + data + '"' +
      ' cannot be encoded with mode ' + mode.toString(mode$1) +
      '.\n Suggested mode is: ' + mode.toString(bestMode))
  }

  // Use Mode.BYTE if Kanji support is disabled
  if (mode$1 === mode.KANJI && !utils$2.isKanjiModeEnabled()) {
    mode$1 = mode.BYTE;
  }

  switch (mode$1) {
    case mode.NUMERIC:
      return new numericData(data)

    case mode.ALPHANUMERIC:
      return new alphanumericData(data)

    case mode.KANJI:
      return new kanjiData(data)

    case mode.BYTE:
      return new byteData(data)
  }
}

/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */
exports.fromArray = function fromArray (array) {
  return array.reduce(function (acc, seg) {
    if (typeof seg === 'string') {
      acc.push(buildSingleSegment(seg, null));
    } else if (seg.data) {
      acc.push(buildSingleSegment(seg.data, seg.mode));
    }

    return acc
  }, [])
};

/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */
exports.fromString = function fromString (data, version) {
  const segs = getSegmentsFromString(data);

  const nodes = buildNodes(segs);
  const graph = buildGraph(nodes, version);
  const path = dijkstra_1.find_path(graph.map, 'start', 'end');

  const optimizedSegs = [];
  for (let i = 1; i < path.length - 1; i++) {
    optimizedSegs.push(graph.table[path[i]].node);
  }

  return exports.fromArray(mergeSegments(optimizedSegs))
};

/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */
exports.rawSplit = function rawSplit (data) {
  return exports.fromArray(
    getSegmentsFromString(data)
  )
};
});

/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupFinderPattern (matrix, version) {
  const size = matrix.size;
  const pos = finderPattern.getPositions(version);

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];

    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue

      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue

        if ((r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
          (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */
function setupTimingPattern (matrix) {
  const size = matrix.size;

  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}

/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupAlignmentPattern (matrix, version) {
  const pos = alignmentPattern.getPositions(version);

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];

    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 ||
          (r === 0 && c === 0)) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupVersionInfo (matrix, version) {
  const size = matrix.size;
  const bits = version$1.getEncodedBits(version);
  let row, col, mod;

  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = ((bits >> i) & 1) === 1;

    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}

/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */
function setupFormatInfo (matrix, errorCorrectionLevel, maskPattern) {
  const size = matrix.size;
  const bits = formatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
  let i, mod;

  for (i = 0; i < 15; i++) {
    mod = ((bits >> i) & 1) === 1;

    // vertical
    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    }

    // horizontal
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  }

  // fixed module
  matrix.set(size - 8, 8, 1, true);
}

/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */
function setupData (matrix, data) {
  const size = matrix.size;
  let inc = -1;
  let row = size - 1;
  let bitIndex = 7;
  let byteIndex = 0;

  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;

    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false;

          if (byteIndex < data.length) {
            dark = (((data[byteIndex] >>> bitIndex) & 1) === 1);
          }

          matrix.set(row, col - c, dark);
          bitIndex--;

          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }

      row += inc;

      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break
      }
    }
  }
}

/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */
function createData (version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  const buffer = new bitBuffer();

  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4);

    // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.
    buffer.put(data.getLength(), mode.getCharCountIndicator(data.mode, version));

    // add binary data sequence to buffer
    data.write(buffer);
  });

  // Calculate required number of bits
  const totalCodewords = utils$2.getSymbolTotalCodewords(version);
  const ecTotalCodewords = errorCorrectionCode.getTotalCodewordsCount(version, errorCorrectionLevel);
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

  // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  }

  // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.

  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  }

  // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8);
  }

  return createCodewords(buffer, version, errorCorrectionLevel)
}

/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */
function createCodewords (bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = utils$2.getSymbolTotalCodewords(version);

  // Total number of error correction codewords
  const ecTotalCodewords = errorCorrectionCode.getTotalCodewordsCount(version, errorCorrectionLevel);

  // Total number of data codewords
  const dataTotalCodewords = totalCodewords - ecTotalCodewords;

  // Total number of blocks
  const ecTotalBlocks = errorCorrectionCode.getBlocksCount(version, errorCorrectionLevel);

  // Calculate how many blocks each group should contain
  const blocksInGroup2 = totalCodewords % ecTotalBlocks;
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;

  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);

  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;

  // Number of EC codewords is the same for both groups
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;

  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
  const rs = new reedSolomonEncoder(ecCount);

  let offset = 0;
  const dcData = new Array(ecTotalBlocks);
  const ecData = new Array(ecTotalBlocks);
  let maxDataSize = 0;
  const buffer = new Uint8Array(bitBuffer.buffer);

  // Divide the buffer into the required number of blocks
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;

    // extract a block of data from buffer
    dcData[b] = buffer.slice(offset, offset + dataSize);

    // Calculate EC codewords for this data block
    ecData[b] = rs.encode(dcData[b]);

    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  }

  // Create final data
  // Interleave the data and error correction codewords from each block
  const data = new Uint8Array(totalCodewords);
  let index = 0;
  let i, r;

  // Add data codewords
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  }

  // Apped EC codewords
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }

  return data
}

/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */
function createSymbol (data, version, errorCorrectionLevel, maskPattern$1) {
  let segments$1;

  if (Array.isArray(data)) {
    segments$1 = segments.fromArray(data);
  } else if (typeof data === 'string') {
    let estimatedVersion = version;

    if (!estimatedVersion) {
      const rawSegments = segments.rawSplit(data);

      // Estimate best version that can contain raw splitted segments
      estimatedVersion = version$1.getBestVersionForData(rawSegments, errorCorrectionLevel);
    }

    // Build optimized segments
    // If estimated version is undefined, try with the highest version
    segments$1 = segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error('Invalid data')
  }

  // Get the min version that can contain data
  const bestVersion = version$1.getBestVersionForData(segments$1, errorCorrectionLevel);

  // If no version is found, data cannot be stored
  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code')
  }

  // If not specified, use min version as default
  if (!version) {
    version = bestVersion;

  // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' +
      'The chosen QR Code version cannot contain this amount of data.\n' +
      'Minimum version required to store current data is: ' + bestVersion + '.\n'
    )
  }

  const dataBits = createData(version, errorCorrectionLevel, segments$1);

  // Allocate matrix buffer
  const moduleCount = utils$2.getSymbolSize(version);
  const modules = new bitMatrix(moduleCount);

  // Add function modules
  setupFinderPattern(modules, version);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version);

  // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.
  setupFormatInfo(modules, errorCorrectionLevel, 0);

  if (version >= 7) {
    setupVersionInfo(modules, version);
  }

  // Add data codewords
  setupData(modules, dataBits);

  if (isNaN(maskPattern$1)) {
    // Find best mask pattern
    maskPattern$1 = maskPattern.getBestMask(modules,
      setupFormatInfo.bind(null, modules, errorCorrectionLevel));
  }

  // Apply mask pattern
  maskPattern.applyMask(maskPattern$1, modules);

  // Replace format info bits with correct values
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern$1);

  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern$1,
    segments: segments$1
  }
}

/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */
var create$2 = function create (data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text')
  }

  let errorCorrectionLevel$1 = errorCorrectionLevel.M;
  let version;
  let mask;

  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel$1 = errorCorrectionLevel.from(options.errorCorrectionLevel, errorCorrectionLevel.M);
    version = version$1.from(options.version);
    mask = maskPattern.from(options.maskPattern);

    if (options.toSJISFunc) {
      utils$2.setToSJISFunction(options.toSJISFunc);
    }
  }

  return createSymbol(data, version, errorCorrectionLevel$1, mask)
};

var qrcode = {
	create: create$2
};

var chunkstream = createCommonjsModule(function (module) {




let ChunkStream = (module.exports = function () {
  Stream__default["default"].call(this);

  this._buffers = [];
  this._buffered = 0;

  this._reads = [];
  this._paused = false;

  this._encoding = "utf8";
  this.writable = true;
});
util__default["default"].inherits(ChunkStream, Stream__default["default"]);

ChunkStream.prototype.read = function (length, callback) {
  this._reads.push({
    length: Math.abs(length), // if length < 0 then at most this length
    allowLess: length < 0,
    func: callback,
  });

  process.nextTick(
    function () {
      this._process();

      // its paused and there is not enought data then ask for more
      if (this._paused && this._reads && this._reads.length > 0) {
        this._paused = false;

        this.emit("drain");
      }
    }.bind(this)
  );
};

ChunkStream.prototype.write = function (data, encoding) {
  if (!this.writable) {
    this.emit("error", new Error("Stream not writable"));
    return false;
  }

  let dataBuffer;
  if (Buffer.isBuffer(data)) {
    dataBuffer = data;
  } else {
    dataBuffer = Buffer.from(data, encoding || this._encoding);
  }

  this._buffers.push(dataBuffer);
  this._buffered += dataBuffer.length;

  this._process();

  // ok if there are no more read requests
  if (this._reads && this._reads.length === 0) {
    this._paused = true;
  }

  return this.writable && !this._paused;
};

ChunkStream.prototype.end = function (data, encoding) {
  if (data) {
    this.write(data, encoding);
  }

  this.writable = false;

  // already destroyed
  if (!this._buffers) {
    return;
  }

  // enqueue or handle end
  if (this._buffers.length === 0) {
    this._end();
  } else {
    this._buffers.push(null);
    this._process();
  }
};

ChunkStream.prototype.destroySoon = ChunkStream.prototype.end;

ChunkStream.prototype._end = function () {
  if (this._reads.length > 0) {
    this.emit("error", new Error("Unexpected end of input"));
  }

  this.destroy();
};

ChunkStream.prototype.destroy = function () {
  if (!this._buffers) {
    return;
  }

  this.writable = false;
  this._reads = null;
  this._buffers = null;

  this.emit("close");
};

ChunkStream.prototype._processReadAllowingLess = function (read) {
  // ok there is any data so that we can satisfy this request
  this._reads.shift(); // == read

  // first we need to peek into first buffer
  let smallerBuf = this._buffers[0];

  // ok there is more data than we need
  if (smallerBuf.length > read.length) {
    this._buffered -= read.length;
    this._buffers[0] = smallerBuf.slice(read.length);

    read.func.call(this, smallerBuf.slice(0, read.length));
  } else {
    // ok this is less than maximum length so use it all
    this._buffered -= smallerBuf.length;
    this._buffers.shift(); // == smallerBuf

    read.func.call(this, smallerBuf);
  }
};

ChunkStream.prototype._processRead = function (read) {
  this._reads.shift(); // == read

  let pos = 0;
  let count = 0;
  let data = Buffer.alloc(read.length);

  // create buffer for all data
  while (pos < read.length) {
    let buf = this._buffers[count++];
    let len = Math.min(buf.length, read.length - pos);

    buf.copy(data, pos, 0, len);
    pos += len;

    // last buffer wasn't used all so just slice it and leave
    if (len !== buf.length) {
      this._buffers[--count] = buf.slice(len);
    }
  }

  // remove all used buffers
  if (count > 0) {
    this._buffers.splice(0, count);
  }

  this._buffered -= read.length;

  read.func.call(this, data);
};

ChunkStream.prototype._process = function () {
  try {
    // as long as there is any data and read requests
    while (this._buffered > 0 && this._reads && this._reads.length > 0) {
      let read = this._reads[0];

      // read any data (but no more than length)
      if (read.allowLess) {
        this._processReadAllowingLess(read);
      } else if (this._buffered >= read.length) {
        // ok we can meet some expectations

        this._processRead(read);
      } else {
        // not enought data to satisfy first request in queue
        // so we need to wait for more
        break;
      }
    }

    if (this._buffers && !this.writable) {
      this._end();
    }
  } catch (ex) {
    this.emit("error", ex);
  }
};
});

// Adam 7
//   0 1 2 3 4 5 6 7
// 0 x 6 4 6 x 6 4 6
// 1 7 7 7 7 7 7 7 7
// 2 5 6 5 6 5 6 5 6
// 3 7 7 7 7 7 7 7 7
// 4 3 6 4 6 3 6 4 6
// 5 7 7 7 7 7 7 7 7
// 6 5 6 5 6 5 6 5 6
// 7 7 7 7 7 7 7 7 7

let imagePasses = [
  {
    // pass 1 - 1px
    x: [0],
    y: [0],
  },
  {
    // pass 2 - 1px
    x: [4],
    y: [0],
  },
  {
    // pass 3 - 2px
    x: [0, 4],
    y: [4],
  },
  {
    // pass 4 - 4px
    x: [2, 6],
    y: [0, 4],
  },
  {
    // pass 5 - 8px
    x: [0, 2, 4, 6],
    y: [2, 6],
  },
  {
    // pass 6 - 16px
    x: [1, 3, 5, 7],
    y: [0, 2, 4, 6],
  },
  {
    // pass 7 - 32px
    x: [0, 1, 2, 3, 4, 5, 6, 7],
    y: [1, 3, 5, 7],
  },
];

var getImagePasses = function (width, height) {
  let images = [];
  let xLeftOver = width % 8;
  let yLeftOver = height % 8;
  let xRepeats = (width - xLeftOver) / 8;
  let yRepeats = (height - yLeftOver) / 8;
  for (let i = 0; i < imagePasses.length; i++) {
    let pass = imagePasses[i];
    let passWidth = xRepeats * pass.x.length;
    let passHeight = yRepeats * pass.y.length;
    for (let j = 0; j < pass.x.length; j++) {
      if (pass.x[j] < xLeftOver) {
        passWidth++;
      } else {
        break;
      }
    }
    for (let j = 0; j < pass.y.length; j++) {
      if (pass.y[j] < yLeftOver) {
        passHeight++;
      } else {
        break;
      }
    }
    if (passWidth > 0 && passHeight > 0) {
      images.push({ width: passWidth, height: passHeight, index: i });
    }
  }
  return images;
};

var getInterlaceIterator = function (width) {
  return function (x, y, pass) {
    let outerXLeftOver = x % imagePasses[pass].x.length;
    let outerX =
      ((x - outerXLeftOver) / imagePasses[pass].x.length) * 8 +
      imagePasses[pass].x[outerXLeftOver];
    let outerYLeftOver = y % imagePasses[pass].y.length;
    let outerY =
      ((y - outerYLeftOver) / imagePasses[pass].y.length) * 8 +
      imagePasses[pass].y[outerYLeftOver];
    return outerX * 4 + outerY * width * 4;
  };
};

var interlace = {
	getImagePasses: getImagePasses,
	getInterlaceIterator: getInterlaceIterator
};

var paethPredictor = function paethPredictor(left, above, upLeft) {
  let paeth = left + above - upLeft;
  let pLeft = Math.abs(paeth - left);
  let pAbove = Math.abs(paeth - above);
  let pUpLeft = Math.abs(paeth - upLeft);

  if (pLeft <= pAbove && pLeft <= pUpLeft) {
    return left;
  }
  if (pAbove <= pUpLeft) {
    return above;
  }
  return upLeft;
};

var filterParse = createCommonjsModule(function (module) {




function getByteWidth(width, bpp, depth) {
  let byteWidth = width * bpp;
  if (depth !== 8) {
    byteWidth = Math.ceil(byteWidth / (8 / depth));
  }
  return byteWidth;
}

let Filter = (module.exports = function (bitmapInfo, dependencies) {
  let width = bitmapInfo.width;
  let height = bitmapInfo.height;
  let interlace$1 = bitmapInfo.interlace;
  let bpp = bitmapInfo.bpp;
  let depth = bitmapInfo.depth;

  this.read = dependencies.read;
  this.write = dependencies.write;
  this.complete = dependencies.complete;

  this._imageIndex = 0;
  this._images = [];
  if (interlace$1) {
    let passes = interlace.getImagePasses(width, height);
    for (let i = 0; i < passes.length; i++) {
      this._images.push({
        byteWidth: getByteWidth(passes[i].width, bpp, depth),
        height: passes[i].height,
        lineIndex: 0,
      });
    }
  } else {
    this._images.push({
      byteWidth: getByteWidth(width, bpp, depth),
      height: height,
      lineIndex: 0,
    });
  }

  // when filtering the line we look at the pixel to the left
  // the spec also says it is done on a byte level regardless of the number of pixels
  // so if the depth is byte compatible (8 or 16) we subtract the bpp in order to compare back
  // a pixel rather than just a different byte part. However if we are sub byte, we ignore.
  if (depth === 8) {
    this._xComparison = bpp;
  } else if (depth === 16) {
    this._xComparison = bpp * 2;
  } else {
    this._xComparison = 1;
  }
});

Filter.prototype.start = function () {
  this.read(
    this._images[this._imageIndex].byteWidth + 1,
    this._reverseFilterLine.bind(this)
  );
};

Filter.prototype._unFilterType1 = function (
  rawData,
  unfilteredLine,
  byteWidth
) {
  let xComparison = this._xComparison;
  let xBiggerThan = xComparison - 1;

  for (let x = 0; x < byteWidth; x++) {
    let rawByte = rawData[1 + x];
    let f1Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
    unfilteredLine[x] = rawByte + f1Left;
  }
};

Filter.prototype._unFilterType2 = function (
  rawData,
  unfilteredLine,
  byteWidth
) {
  let lastLine = this._lastLine;

  for (let x = 0; x < byteWidth; x++) {
    let rawByte = rawData[1 + x];
    let f2Up = lastLine ? lastLine[x] : 0;
    unfilteredLine[x] = rawByte + f2Up;
  }
};

Filter.prototype._unFilterType3 = function (
  rawData,
  unfilteredLine,
  byteWidth
) {
  let xComparison = this._xComparison;
  let xBiggerThan = xComparison - 1;
  let lastLine = this._lastLine;

  for (let x = 0; x < byteWidth; x++) {
    let rawByte = rawData[1 + x];
    let f3Up = lastLine ? lastLine[x] : 0;
    let f3Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
    let f3Add = Math.floor((f3Left + f3Up) / 2);
    unfilteredLine[x] = rawByte + f3Add;
  }
};

Filter.prototype._unFilterType4 = function (
  rawData,
  unfilteredLine,
  byteWidth
) {
  let xComparison = this._xComparison;
  let xBiggerThan = xComparison - 1;
  let lastLine = this._lastLine;

  for (let x = 0; x < byteWidth; x++) {
    let rawByte = rawData[1 + x];
    let f4Up = lastLine ? lastLine[x] : 0;
    let f4Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
    let f4UpLeft = x > xBiggerThan && lastLine ? lastLine[x - xComparison] : 0;
    let f4Add = paethPredictor(f4Left, f4Up, f4UpLeft);
    unfilteredLine[x] = rawByte + f4Add;
  }
};

Filter.prototype._reverseFilterLine = function (rawData) {
  let filter = rawData[0];
  let unfilteredLine;
  let currentImage = this._images[this._imageIndex];
  let byteWidth = currentImage.byteWidth;

  if (filter === 0) {
    unfilteredLine = rawData.slice(1, byteWidth + 1);
  } else {
    unfilteredLine = Buffer.alloc(byteWidth);

    switch (filter) {
      case 1:
        this._unFilterType1(rawData, unfilteredLine, byteWidth);
        break;
      case 2:
        this._unFilterType2(rawData, unfilteredLine, byteWidth);
        break;
      case 3:
        this._unFilterType3(rawData, unfilteredLine, byteWidth);
        break;
      case 4:
        this._unFilterType4(rawData, unfilteredLine, byteWidth);
        break;
      default:
        throw new Error("Unrecognised filter type - " + filter);
    }
  }

  this.write(unfilteredLine);

  currentImage.lineIndex++;
  if (currentImage.lineIndex >= currentImage.height) {
    this._lastLine = null;
    this._imageIndex++;
    currentImage = this._images[this._imageIndex];
  } else {
    this._lastLine = unfilteredLine;
  }

  if (currentImage) {
    // read, using the byte width that may be from the new current image
    this.read(currentImage.byteWidth + 1, this._reverseFilterLine.bind(this));
  } else {
    this._lastLine = null;
    this.complete();
  }
};
});

var filterParseAsync = createCommonjsModule(function (module) {





let FilterAsync = (module.exports = function (bitmapInfo) {
  chunkstream.call(this);

  let buffers = [];
  let that = this;
  this._filter = new filterParse(bitmapInfo, {
    read: this.read.bind(this),
    write: function (buffer) {
      buffers.push(buffer);
    },
    complete: function () {
      that.emit("complete", Buffer.concat(buffers));
    },
  });

  this._filter.start();
});
util__default["default"].inherits(FilterAsync, chunkstream);
});

var constants = {
  PNG_SIGNATURE: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],

  TYPE_IHDR: 0x49484452,
  TYPE_IEND: 0x49454e44,
  TYPE_IDAT: 0x49444154,
  TYPE_PLTE: 0x504c5445,
  TYPE_tRNS: 0x74524e53, // eslint-disable-line camelcase
  TYPE_gAMA: 0x67414d41, // eslint-disable-line camelcase

  // color-type bits
  COLORTYPE_GRAYSCALE: 0,
  COLORTYPE_PALETTE: 1,
  COLORTYPE_COLOR: 2,
  COLORTYPE_ALPHA: 4, // e.g. grayscale and alpha

  // color-type combinations
  COLORTYPE_PALETTE_COLOR: 3,
  COLORTYPE_COLOR_ALPHA: 6,

  COLORTYPE_TO_BPP_MAP: {
    0: 1,
    2: 3,
    3: 1,
    4: 2,
    6: 4,
  },

  GAMMA_DIVISION: 100000,
};

var crc = createCommonjsModule(function (module) {

let crcTable = [];

(function () {
  for (let i = 0; i < 256; i++) {
    let currentCrc = i;
    for (let j = 0; j < 8; j++) {
      if (currentCrc & 1) {
        currentCrc = 0xedb88320 ^ (currentCrc >>> 1);
      } else {
        currentCrc = currentCrc >>> 1;
      }
    }
    crcTable[i] = currentCrc;
  }
})();

let CrcCalculator = (module.exports = function () {
  this._crc = -1;
});

CrcCalculator.prototype.write = function (data) {
  for (let i = 0; i < data.length; i++) {
    this._crc = crcTable[(this._crc ^ data[i]) & 0xff] ^ (this._crc >>> 8);
  }
  return true;
};

CrcCalculator.prototype.crc32 = function () {
  return this._crc ^ -1;
};

CrcCalculator.crc32 = function (buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return crc ^ -1;
};
});

var parser = createCommonjsModule(function (module) {




let Parser = (module.exports = function (options, dependencies) {
  this._options = options;
  options.checkCRC = options.checkCRC !== false;

  this._hasIHDR = false;
  this._hasIEND = false;
  this._emittedHeadersFinished = false;

  // input flags/metadata
  this._palette = [];
  this._colorType = 0;

  this._chunks = {};
  this._chunks[constants.TYPE_IHDR] = this._handleIHDR.bind(this);
  this._chunks[constants.TYPE_IEND] = this._handleIEND.bind(this);
  this._chunks[constants.TYPE_IDAT] = this._handleIDAT.bind(this);
  this._chunks[constants.TYPE_PLTE] = this._handlePLTE.bind(this);
  this._chunks[constants.TYPE_tRNS] = this._handleTRNS.bind(this);
  this._chunks[constants.TYPE_gAMA] = this._handleGAMA.bind(this);

  this.read = dependencies.read;
  this.error = dependencies.error;
  this.metadata = dependencies.metadata;
  this.gamma = dependencies.gamma;
  this.transColor = dependencies.transColor;
  this.palette = dependencies.palette;
  this.parsed = dependencies.parsed;
  this.inflateData = dependencies.inflateData;
  this.finished = dependencies.finished;
  this.simpleTransparency = dependencies.simpleTransparency;
  this.headersFinished = dependencies.headersFinished || function () {};
});

Parser.prototype.start = function () {
  this.read(constants.PNG_SIGNATURE.length, this._parseSignature.bind(this));
};

Parser.prototype._parseSignature = function (data) {
  let signature = constants.PNG_SIGNATURE;

  for (let i = 0; i < signature.length; i++) {
    if (data[i] !== signature[i]) {
      this.error(new Error("Invalid file signature"));
      return;
    }
  }
  this.read(8, this._parseChunkBegin.bind(this));
};

Parser.prototype._parseChunkBegin = function (data) {
  // chunk content length
  let length = data.readUInt32BE(0);

  // chunk type
  let type = data.readUInt32BE(4);
  let name = "";
  for (let i = 4; i < 8; i++) {
    name += String.fromCharCode(data[i]);
  }

  //console.log('chunk ', name, length);

  // chunk flags
  let ancillary = Boolean(data[4] & 0x20); // or critical
  //    priv = Boolean(data[5] & 0x20), // or public
  //    safeToCopy = Boolean(data[7] & 0x20); // or unsafe

  if (!this._hasIHDR && type !== constants.TYPE_IHDR) {
    this.error(new Error("Expected IHDR on beggining"));
    return;
  }

  this._crc = new crc();
  this._crc.write(Buffer.from(name));

  if (this._chunks[type]) {
    return this._chunks[type](length);
  }

  if (!ancillary) {
    this.error(new Error("Unsupported critical chunk type " + name));
    return;
  }

  this.read(length + 4, this._skipChunk.bind(this));
};

Parser.prototype._skipChunk = function (/*data*/) {
  this.read(8, this._parseChunkBegin.bind(this));
};

Parser.prototype._handleChunkEnd = function () {
  this.read(4, this._parseChunkEnd.bind(this));
};

Parser.prototype._parseChunkEnd = function (data) {
  let fileCrc = data.readInt32BE(0);
  let calcCrc = this._crc.crc32();

  // check CRC
  if (this._options.checkCRC && calcCrc !== fileCrc) {
    this.error(new Error("Crc error - " + fileCrc + " - " + calcCrc));
    return;
  }

  if (!this._hasIEND) {
    this.read(8, this._parseChunkBegin.bind(this));
  }
};

Parser.prototype._handleIHDR = function (length) {
  this.read(length, this._parseIHDR.bind(this));
};
Parser.prototype._parseIHDR = function (data) {
  this._crc.write(data);

  let width = data.readUInt32BE(0);
  let height = data.readUInt32BE(4);
  let depth = data[8];
  let colorType = data[9]; // bits: 1 palette, 2 color, 4 alpha
  let compr = data[10];
  let filter = data[11];
  let interlace = data[12];

  // console.log('    width', width, 'height', height,
  //     'depth', depth, 'colorType', colorType,
  //     'compr', compr, 'filter', filter, 'interlace', interlace
  // );

  if (
    depth !== 8 &&
    depth !== 4 &&
    depth !== 2 &&
    depth !== 1 &&
    depth !== 16
  ) {
    this.error(new Error("Unsupported bit depth " + depth));
    return;
  }
  if (!(colorType in constants.COLORTYPE_TO_BPP_MAP)) {
    this.error(new Error("Unsupported color type"));
    return;
  }
  if (compr !== 0) {
    this.error(new Error("Unsupported compression method"));
    return;
  }
  if (filter !== 0) {
    this.error(new Error("Unsupported filter method"));
    return;
  }
  if (interlace !== 0 && interlace !== 1) {
    this.error(new Error("Unsupported interlace method"));
    return;
  }

  this._colorType = colorType;

  let bpp = constants.COLORTYPE_TO_BPP_MAP[this._colorType];

  this._hasIHDR = true;

  this.metadata({
    width: width,
    height: height,
    depth: depth,
    interlace: Boolean(interlace),
    palette: Boolean(colorType & constants.COLORTYPE_PALETTE),
    color: Boolean(colorType & constants.COLORTYPE_COLOR),
    alpha: Boolean(colorType & constants.COLORTYPE_ALPHA),
    bpp: bpp,
    colorType: colorType,
  });

  this._handleChunkEnd();
};

Parser.prototype._handlePLTE = function (length) {
  this.read(length, this._parsePLTE.bind(this));
};
Parser.prototype._parsePLTE = function (data) {
  this._crc.write(data);

  let entries = Math.floor(data.length / 3);
  // console.log('Palette:', entries);

  for (let i = 0; i < entries; i++) {
    this._palette.push([data[i * 3], data[i * 3 + 1], data[i * 3 + 2], 0xff]);
  }

  this.palette(this._palette);

  this._handleChunkEnd();
};

Parser.prototype._handleTRNS = function (length) {
  this.simpleTransparency();
  this.read(length, this._parseTRNS.bind(this));
};
Parser.prototype._parseTRNS = function (data) {
  this._crc.write(data);

  // palette
  if (this._colorType === constants.COLORTYPE_PALETTE_COLOR) {
    if (this._palette.length === 0) {
      this.error(new Error("Transparency chunk must be after palette"));
      return;
    }
    if (data.length > this._palette.length) {
      this.error(new Error("More transparent colors than palette size"));
      return;
    }
    for (let i = 0; i < data.length; i++) {
      this._palette[i][3] = data[i];
    }
    this.palette(this._palette);
  }

  // for colorType 0 (grayscale) and 2 (rgb)
  // there might be one gray/color defined as transparent
  if (this._colorType === constants.COLORTYPE_GRAYSCALE) {
    // grey, 2 bytes
    this.transColor([data.readUInt16BE(0)]);
  }
  if (this._colorType === constants.COLORTYPE_COLOR) {
    this.transColor([
      data.readUInt16BE(0),
      data.readUInt16BE(2),
      data.readUInt16BE(4),
    ]);
  }

  this._handleChunkEnd();
};

Parser.prototype._handleGAMA = function (length) {
  this.read(length, this._parseGAMA.bind(this));
};
Parser.prototype._parseGAMA = function (data) {
  this._crc.write(data);
  this.gamma(data.readUInt32BE(0) / constants.GAMMA_DIVISION);

  this._handleChunkEnd();
};

Parser.prototype._handleIDAT = function (length) {
  if (!this._emittedHeadersFinished) {
    this._emittedHeadersFinished = true;
    this.headersFinished();
  }
  this.read(-length, this._parseIDAT.bind(this, length));
};
Parser.prototype._parseIDAT = function (length, data) {
  this._crc.write(data);

  if (
    this._colorType === constants.COLORTYPE_PALETTE_COLOR &&
    this._palette.length === 0
  ) {
    throw new Error("Expected palette not found");
  }

  this.inflateData(data);
  let leftOverLength = length - data.length;

  if (leftOverLength > 0) {
    this._handleIDAT(leftOverLength);
  } else {
    this._handleChunkEnd();
  }
};

Parser.prototype._handleIEND = function (length) {
  this.read(length, this._parseIEND.bind(this));
};
Parser.prototype._parseIEND = function (data) {
  this._crc.write(data);

  this._hasIEND = true;
  this._handleChunkEnd();

  if (this.finished) {
    this.finished();
  }
};
});

let pixelBppMapper = [
  // 0 - dummy entry
  function () {},

  // 1 - L
  // 0: 0, 1: 0, 2: 0, 3: 0xff
  function (pxData, data, pxPos, rawPos) {
    if (rawPos === data.length) {
      throw new Error("Ran out of data");
    }

    let pixel = data[rawPos];
    pxData[pxPos] = pixel;
    pxData[pxPos + 1] = pixel;
    pxData[pxPos + 2] = pixel;
    pxData[pxPos + 3] = 0xff;
  },

  // 2 - LA
  // 0: 0, 1: 0, 2: 0, 3: 1
  function (pxData, data, pxPos, rawPos) {
    if (rawPos + 1 >= data.length) {
      throw new Error("Ran out of data");
    }

    let pixel = data[rawPos];
    pxData[pxPos] = pixel;
    pxData[pxPos + 1] = pixel;
    pxData[pxPos + 2] = pixel;
    pxData[pxPos + 3] = data[rawPos + 1];
  },

  // 3 - RGB
  // 0: 0, 1: 1, 2: 2, 3: 0xff
  function (pxData, data, pxPos, rawPos) {
    if (rawPos + 2 >= data.length) {
      throw new Error("Ran out of data");
    }

    pxData[pxPos] = data[rawPos];
    pxData[pxPos + 1] = data[rawPos + 1];
    pxData[pxPos + 2] = data[rawPos + 2];
    pxData[pxPos + 3] = 0xff;
  },

  // 4 - RGBA
  // 0: 0, 1: 1, 2: 2, 3: 3
  function (pxData, data, pxPos, rawPos) {
    if (rawPos + 3 >= data.length) {
      throw new Error("Ran out of data");
    }

    pxData[pxPos] = data[rawPos];
    pxData[pxPos + 1] = data[rawPos + 1];
    pxData[pxPos + 2] = data[rawPos + 2];
    pxData[pxPos + 3] = data[rawPos + 3];
  },
];

let pixelBppCustomMapper = [
  // 0 - dummy entry
  function () {},

  // 1 - L
  // 0: 0, 1: 0, 2: 0, 3: 0xff
  function (pxData, pixelData, pxPos, maxBit) {
    let pixel = pixelData[0];
    pxData[pxPos] = pixel;
    pxData[pxPos + 1] = pixel;
    pxData[pxPos + 2] = pixel;
    pxData[pxPos + 3] = maxBit;
  },

  // 2 - LA
  // 0: 0, 1: 0, 2: 0, 3: 1
  function (pxData, pixelData, pxPos) {
    let pixel = pixelData[0];
    pxData[pxPos] = pixel;
    pxData[pxPos + 1] = pixel;
    pxData[pxPos + 2] = pixel;
    pxData[pxPos + 3] = pixelData[1];
  },

  // 3 - RGB
  // 0: 0, 1: 1, 2: 2, 3: 0xff
  function (pxData, pixelData, pxPos, maxBit) {
    pxData[pxPos] = pixelData[0];
    pxData[pxPos + 1] = pixelData[1];
    pxData[pxPos + 2] = pixelData[2];
    pxData[pxPos + 3] = maxBit;
  },

  // 4 - RGBA
  // 0: 0, 1: 1, 2: 2, 3: 3
  function (pxData, pixelData, pxPos) {
    pxData[pxPos] = pixelData[0];
    pxData[pxPos + 1] = pixelData[1];
    pxData[pxPos + 2] = pixelData[2];
    pxData[pxPos + 3] = pixelData[3];
  },
];

function bitRetriever(data, depth) {
  let leftOver = [];
  let i = 0;

  function split() {
    if (i === data.length) {
      throw new Error("Ran out of data");
    }
    let byte = data[i];
    i++;
    let byte8, byte7, byte6, byte5, byte4, byte3, byte2, byte1;
    switch (depth) {
      default:
        throw new Error("unrecognised depth");
      case 16:
        byte2 = data[i];
        i++;
        leftOver.push((byte << 8) + byte2);
        break;
      case 4:
        byte2 = byte & 0x0f;
        byte1 = byte >> 4;
        leftOver.push(byte1, byte2);
        break;
      case 2:
        byte4 = byte & 3;
        byte3 = (byte >> 2) & 3;
        byte2 = (byte >> 4) & 3;
        byte1 = (byte >> 6) & 3;
        leftOver.push(byte1, byte2, byte3, byte4);
        break;
      case 1:
        byte8 = byte & 1;
        byte7 = (byte >> 1) & 1;
        byte6 = (byte >> 2) & 1;
        byte5 = (byte >> 3) & 1;
        byte4 = (byte >> 4) & 1;
        byte3 = (byte >> 5) & 1;
        byte2 = (byte >> 6) & 1;
        byte1 = (byte >> 7) & 1;
        leftOver.push(byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8);
        break;
    }
  }

  return {
    get: function (count) {
      while (leftOver.length < count) {
        split();
      }
      let returner = leftOver.slice(0, count);
      leftOver = leftOver.slice(count);
      return returner;
    },
    resetAfterLine: function () {
      leftOver.length = 0;
    },
    end: function () {
      if (i !== data.length) {
        throw new Error("extra data found");
      }
    },
  };
}

function mapImage8Bit(image, pxData, getPxPos, bpp, data, rawPos) {
  // eslint-disable-line max-params
  let imageWidth = image.width;
  let imageHeight = image.height;
  let imagePass = image.index;
  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      let pxPos = getPxPos(x, y, imagePass);
      pixelBppMapper[bpp](pxData, data, pxPos, rawPos);
      rawPos += bpp; //eslint-disable-line no-param-reassign
    }
  }
  return rawPos;
}

function mapImageCustomBit(image, pxData, getPxPos, bpp, bits, maxBit) {
  // eslint-disable-line max-params
  let imageWidth = image.width;
  let imageHeight = image.height;
  let imagePass = image.index;
  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      let pixelData = bits.get(bpp);
      let pxPos = getPxPos(x, y, imagePass);
      pixelBppCustomMapper[bpp](pxData, pixelData, pxPos, maxBit);
    }
    bits.resetAfterLine();
  }
}

var dataToBitMap = function (data, bitmapInfo) {
  let width = bitmapInfo.width;
  let height = bitmapInfo.height;
  let depth = bitmapInfo.depth;
  let bpp = bitmapInfo.bpp;
  let interlace$1 = bitmapInfo.interlace;
  let bits;

  if (depth !== 8) {
    bits = bitRetriever(data, depth);
  }
  let pxData;
  if (depth <= 8) {
    pxData = Buffer.alloc(width * height * 4);
  } else {
    pxData = new Uint16Array(width * height * 4);
  }
  let maxBit = Math.pow(2, depth) - 1;
  let rawPos = 0;
  let images;
  let getPxPos;

  if (interlace$1) {
    images = interlace.getImagePasses(width, height);
    getPxPos = interlace.getInterlaceIterator(width, height);
  } else {
    let nonInterlacedPxPos = 0;
    getPxPos = function () {
      let returner = nonInterlacedPxPos;
      nonInterlacedPxPos += 4;
      return returner;
    };
    images = [{ width: width, height: height }];
  }

  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    if (depth === 8) {
      rawPos = mapImage8Bit(
        images[imageIndex],
        pxData,
        getPxPos,
        bpp,
        data,
        rawPos
      );
    } else {
      mapImageCustomBit(
        images[imageIndex],
        pxData,
        getPxPos,
        bpp,
        bits,
        maxBit
      );
    }
  }
  if (depth === 8) {
    if (rawPos !== data.length) {
      throw new Error("extra data found");
    }
  } else {
    bits.end();
  }

  return pxData;
};

var bitmapper = {
	dataToBitMap: dataToBitMap
};

function dePalette(indata, outdata, width, height, palette) {
  let pxPos = 0;
  // use values from palette
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let color = palette[indata[pxPos]];

      if (!color) {
        throw new Error("index " + indata[pxPos] + " not in palette");
      }

      for (let i = 0; i < 4; i++) {
        outdata[pxPos + i] = color[i];
      }
      pxPos += 4;
    }
  }
}

function replaceTransparentColor(indata, outdata, width, height, transColor) {
  let pxPos = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let makeTrans = false;

      if (transColor.length === 1) {
        if (transColor[0] === indata[pxPos]) {
          makeTrans = true;
        }
      } else if (
        transColor[0] === indata[pxPos] &&
        transColor[1] === indata[pxPos + 1] &&
        transColor[2] === indata[pxPos + 2]
      ) {
        makeTrans = true;
      }
      if (makeTrans) {
        for (let i = 0; i < 4; i++) {
          outdata[pxPos + i] = 0;
        }
      }
      pxPos += 4;
    }
  }
}

function scaleDepth(indata, outdata, width, height, depth) {
  let maxOutSample = 255;
  let maxInSample = Math.pow(2, depth) - 1;
  let pxPos = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      for (let i = 0; i < 4; i++) {
        outdata[pxPos + i] = Math.floor(
          (indata[pxPos + i] * maxOutSample) / maxInSample + 0.5
        );
      }
      pxPos += 4;
    }
  }
}

var formatNormaliser = function (indata, imageData) {
  let depth = imageData.depth;
  let width = imageData.width;
  let height = imageData.height;
  let colorType = imageData.colorType;
  let transColor = imageData.transColor;
  let palette = imageData.palette;

  let outdata = indata; // only different for 16 bits

  if (colorType === 3) {
    // paletted
    dePalette(indata, outdata, width, height, palette);
  } else {
    if (transColor) {
      replaceTransparentColor(indata, outdata, width, height, transColor);
    }
    // if it needs scaling
    if (depth !== 8) {
      // if we need to change the buffer size
      if (depth === 16) {
        outdata = Buffer.alloc(width * height * 4);
      }
      scaleDepth(indata, outdata, width, height, depth);
    }
  }
  return outdata;
};

var parserAsync = createCommonjsModule(function (module) {









let ParserAsync = (module.exports = function (options) {
  chunkstream.call(this);

  this._parser = new parser(options, {
    read: this.read.bind(this),
    error: this._handleError.bind(this),
    metadata: this._handleMetaData.bind(this),
    gamma: this.emit.bind(this, "gamma"),
    palette: this._handlePalette.bind(this),
    transColor: this._handleTransColor.bind(this),
    finished: this._finished.bind(this),
    inflateData: this._inflateData.bind(this),
    simpleTransparency: this._simpleTransparency.bind(this),
    headersFinished: this._headersFinished.bind(this),
  });
  this._options = options;
  this.writable = true;

  this._parser.start();
});
util__default["default"].inherits(ParserAsync, chunkstream);

ParserAsync.prototype._handleError = function (err) {
  this.emit("error", err);

  this.writable = false;

  this.destroy();

  if (this._inflate && this._inflate.destroy) {
    this._inflate.destroy();
  }

  if (this._filter) {
    this._filter.destroy();
    // For backward compatibility with Node 7 and below.
    // Suppress errors due to _inflate calling write() even after
    // it's destroy()'ed.
    this._filter.on("error", function () {});
  }

  this.errord = true;
};

ParserAsync.prototype._inflateData = function (data) {
  if (!this._inflate) {
    if (this._bitmapInfo.interlace) {
      this._inflate = zlib__default["default"].createInflate();

      this._inflate.on("error", this.emit.bind(this, "error"));
      this._filter.on("complete", this._complete.bind(this));

      this._inflate.pipe(this._filter);
    } else {
      let rowSize =
        ((this._bitmapInfo.width *
          this._bitmapInfo.bpp *
          this._bitmapInfo.depth +
          7) >>
          3) +
        1;
      let imageSize = rowSize * this._bitmapInfo.height;
      let chunkSize = Math.max(imageSize, zlib__default["default"].Z_MIN_CHUNK);

      this._inflate = zlib__default["default"].createInflate({ chunkSize: chunkSize });
      let leftToInflate = imageSize;

      let emitError = this.emit.bind(this, "error");
      this._inflate.on("error", function (err) {
        if (!leftToInflate) {
          return;
        }

        emitError(err);
      });
      this._filter.on("complete", this._complete.bind(this));

      let filterWrite = this._filter.write.bind(this._filter);
      this._inflate.on("data", function (chunk) {
        if (!leftToInflate) {
          return;
        }

        if (chunk.length > leftToInflate) {
          chunk = chunk.slice(0, leftToInflate);
        }

        leftToInflate -= chunk.length;

        filterWrite(chunk);
      });

      this._inflate.on("end", this._filter.end.bind(this._filter));
    }
  }
  this._inflate.write(data);
};

ParserAsync.prototype._handleMetaData = function (metaData) {
  this._metaData = metaData;
  this._bitmapInfo = Object.create(metaData);

  this._filter = new filterParseAsync(this._bitmapInfo);
};

ParserAsync.prototype._handleTransColor = function (transColor) {
  this._bitmapInfo.transColor = transColor;
};

ParserAsync.prototype._handlePalette = function (palette) {
  this._bitmapInfo.palette = palette;
};

ParserAsync.prototype._simpleTransparency = function () {
  this._metaData.alpha = true;
};

ParserAsync.prototype._headersFinished = function () {
  // Up until this point, we don't know if we have a tRNS chunk (alpha)
  // so we can't emit metadata any earlier
  this.emit("metadata", this._metaData);
};

ParserAsync.prototype._finished = function () {
  if (this.errord) {
    return;
  }

  if (!this._inflate) {
    this.emit("error", "No Inflate block");
  } else {
    // no more data to inflate
    this._inflate.end();
  }
};

ParserAsync.prototype._complete = function (filteredData) {
  if (this.errord) {
    return;
  }

  let normalisedBitmapData;

  try {
    let bitmapData = bitmapper.dataToBitMap(filteredData, this._bitmapInfo);

    normalisedBitmapData = formatNormaliser(bitmapData, this._bitmapInfo);
    bitmapData = null;
  } catch (ex) {
    this._handleError(ex);
    return;
  }

  this.emit("parsed", normalisedBitmapData);
};
});

var bitpacker = function (dataIn, width, height, options) {
  let outHasAlpha =
    [constants.COLORTYPE_COLOR_ALPHA, constants.COLORTYPE_ALPHA].indexOf(
      options.colorType
    ) !== -1;
  if (options.colorType === options.inputColorType) {
    let bigEndian = (function () {
      let buffer = new ArrayBuffer(2);
      new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
      // Int16Array uses the platform's endianness.
      return new Int16Array(buffer)[0] !== 256;
    })();
    // If no need to convert to grayscale and alpha is present/absent in both, take a fast route
    if (options.bitDepth === 8 || (options.bitDepth === 16 && bigEndian)) {
      return dataIn;
    }
  }

  // map to a UInt16 array if data is 16bit, fix endianness below
  let data = options.bitDepth !== 16 ? dataIn : new Uint16Array(dataIn.buffer);

  let maxValue = 255;
  let inBpp = constants.COLORTYPE_TO_BPP_MAP[options.inputColorType];
  if (inBpp === 4 && !options.inputHasAlpha) {
    inBpp = 3;
  }
  let outBpp = constants.COLORTYPE_TO_BPP_MAP[options.colorType];
  if (options.bitDepth === 16) {
    maxValue = 65535;
    outBpp *= 2;
  }
  let outData = Buffer.alloc(width * height * outBpp);

  let inIndex = 0;
  let outIndex = 0;

  let bgColor = options.bgColor || {};
  if (bgColor.red === undefined) {
    bgColor.red = maxValue;
  }
  if (bgColor.green === undefined) {
    bgColor.green = maxValue;
  }
  if (bgColor.blue === undefined) {
    bgColor.blue = maxValue;
  }

  function getRGBA() {
    let red;
    let green;
    let blue;
    let alpha = maxValue;
    switch (options.inputColorType) {
      case constants.COLORTYPE_COLOR_ALPHA:
        alpha = data[inIndex + 3];
        red = data[inIndex];
        green = data[inIndex + 1];
        blue = data[inIndex + 2];
        break;
      case constants.COLORTYPE_COLOR:
        red = data[inIndex];
        green = data[inIndex + 1];
        blue = data[inIndex + 2];
        break;
      case constants.COLORTYPE_ALPHA:
        alpha = data[inIndex + 1];
        red = data[inIndex];
        green = red;
        blue = red;
        break;
      case constants.COLORTYPE_GRAYSCALE:
        red = data[inIndex];
        green = red;
        blue = red;
        break;
      default:
        throw new Error(
          "input color type:" +
            options.inputColorType +
            " is not supported at present"
        );
    }

    if (options.inputHasAlpha) {
      if (!outHasAlpha) {
        alpha /= maxValue;
        red = Math.min(
          Math.max(Math.round((1 - alpha) * bgColor.red + alpha * red), 0),
          maxValue
        );
        green = Math.min(
          Math.max(Math.round((1 - alpha) * bgColor.green + alpha * green), 0),
          maxValue
        );
        blue = Math.min(
          Math.max(Math.round((1 - alpha) * bgColor.blue + alpha * blue), 0),
          maxValue
        );
      }
    }
    return { red: red, green: green, blue: blue, alpha: alpha };
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let rgba = getRGBA();

      switch (options.colorType) {
        case constants.COLORTYPE_COLOR_ALPHA:
        case constants.COLORTYPE_COLOR:
          if (options.bitDepth === 8) {
            outData[outIndex] = rgba.red;
            outData[outIndex + 1] = rgba.green;
            outData[outIndex + 2] = rgba.blue;
            if (outHasAlpha) {
              outData[outIndex + 3] = rgba.alpha;
            }
          } else {
            outData.writeUInt16BE(rgba.red, outIndex);
            outData.writeUInt16BE(rgba.green, outIndex + 2);
            outData.writeUInt16BE(rgba.blue, outIndex + 4);
            if (outHasAlpha) {
              outData.writeUInt16BE(rgba.alpha, outIndex + 6);
            }
          }
          break;
        case constants.COLORTYPE_ALPHA:
        case constants.COLORTYPE_GRAYSCALE: {
          // Convert to grayscale and alpha
          let grayscale = (rgba.red + rgba.green + rgba.blue) / 3;
          if (options.bitDepth === 8) {
            outData[outIndex] = grayscale;
            if (outHasAlpha) {
              outData[outIndex + 1] = rgba.alpha;
            }
          } else {
            outData.writeUInt16BE(grayscale, outIndex);
            if (outHasAlpha) {
              outData.writeUInt16BE(rgba.alpha, outIndex + 2);
            }
          }
          break;
        }
        default:
          throw new Error("unrecognised color Type " + options.colorType);
      }

      inIndex += inBpp;
      outIndex += outBpp;
    }
  }

  return outData;
};

function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
  for (let x = 0; x < byteWidth; x++) {
    rawData[rawPos + x] = pxData[pxPos + x];
  }
}

function filterSumNone(pxData, pxPos, byteWidth) {
  let sum = 0;
  let length = pxPos + byteWidth;

  for (let i = pxPos; i < length; i++) {
    sum += Math.abs(pxData[i]);
  }
  return sum;
}

function filterSub(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let val = pxData[pxPos + x] - left;

    rawData[rawPos + x] = val;
  }
}

function filterSumSub(pxData, pxPos, byteWidth, bpp) {
  let sum = 0;
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let val = pxData[pxPos + x] - left;

    sum += Math.abs(val);
  }

  return sum;
}

function filterUp(pxData, pxPos, byteWidth, rawData, rawPos) {
  for (let x = 0; x < byteWidth; x++) {
    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
    let val = pxData[pxPos + x] - up;

    rawData[rawPos + x] = val;
  }
}

function filterSumUp(pxData, pxPos, byteWidth) {
  let sum = 0;
  let length = pxPos + byteWidth;
  for (let x = pxPos; x < length; x++) {
    let up = pxPos > 0 ? pxData[x - byteWidth] : 0;
    let val = pxData[x] - up;

    sum += Math.abs(val);
  }

  return sum;
}

function filterAvg(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
    let val = pxData[pxPos + x] - ((left + up) >> 1);

    rawData[rawPos + x] = val;
  }
}

function filterSumAvg(pxData, pxPos, byteWidth, bpp) {
  let sum = 0;
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
    let val = pxData[pxPos + x] - ((left + up) >> 1);

    sum += Math.abs(val);
  }

  return sum;
}

function filterPaeth(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
    let upleft =
      pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
    let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);

    rawData[rawPos + x] = val;
  }
}

function filterSumPaeth(pxData, pxPos, byteWidth, bpp) {
  let sum = 0;
  for (let x = 0; x < byteWidth; x++) {
    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
    let upleft =
      pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
    let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);

    sum += Math.abs(val);
  }

  return sum;
}

let filters = {
  0: filterNone,
  1: filterSub,
  2: filterUp,
  3: filterAvg,
  4: filterPaeth,
};

let filterSums = {
  0: filterSumNone,
  1: filterSumSub,
  2: filterSumUp,
  3: filterSumAvg,
  4: filterSumPaeth,
};

var filterPack = function (pxData, width, height, options, bpp) {
  let filterTypes;
  if (!("filterType" in options) || options.filterType === -1) {
    filterTypes = [0, 1, 2, 3, 4];
  } else if (typeof options.filterType === "number") {
    filterTypes = [options.filterType];
  } else {
    throw new Error("unrecognised filter types");
  }

  if (options.bitDepth === 16) {
    bpp *= 2;
  }
  let byteWidth = width * bpp;
  let rawPos = 0;
  let pxPos = 0;
  let rawData = Buffer.alloc((byteWidth + 1) * height);

  let sel = filterTypes[0];

  for (let y = 0; y < height; y++) {
    if (filterTypes.length > 1) {
      // find best filter for this line (with lowest sum of values)
      let min = Infinity;

      for (let i = 0; i < filterTypes.length; i++) {
        let sum = filterSums[filterTypes[i]](pxData, pxPos, byteWidth, bpp);
        if (sum < min) {
          sel = filterTypes[i];
          min = sum;
        }
      }
    }

    rawData[rawPos] = sel;
    rawPos++;
    filters[sel](pxData, pxPos, byteWidth, rawData, rawPos, bpp);
    rawPos += byteWidth;
    pxPos += byteWidth;
  }
  return rawData;
};

var packer = createCommonjsModule(function (module) {







let Packer = (module.exports = function (options) {
  this._options = options;

  options.deflateChunkSize = options.deflateChunkSize || 32 * 1024;
  options.deflateLevel =
    options.deflateLevel != null ? options.deflateLevel : 9;
  options.deflateStrategy =
    options.deflateStrategy != null ? options.deflateStrategy : 3;
  options.inputHasAlpha =
    options.inputHasAlpha != null ? options.inputHasAlpha : true;
  options.deflateFactory = options.deflateFactory || zlib__default["default"].createDeflate;
  options.bitDepth = options.bitDepth || 8;
  // This is outputColorType
  options.colorType =
    typeof options.colorType === "number"
      ? options.colorType
      : constants.COLORTYPE_COLOR_ALPHA;
  options.inputColorType =
    typeof options.inputColorType === "number"
      ? options.inputColorType
      : constants.COLORTYPE_COLOR_ALPHA;

  if (
    [
      constants.COLORTYPE_GRAYSCALE,
      constants.COLORTYPE_COLOR,
      constants.COLORTYPE_COLOR_ALPHA,
      constants.COLORTYPE_ALPHA,
    ].indexOf(options.colorType) === -1
  ) {
    throw new Error(
      "option color type:" + options.colorType + " is not supported at present"
    );
  }
  if (
    [
      constants.COLORTYPE_GRAYSCALE,
      constants.COLORTYPE_COLOR,
      constants.COLORTYPE_COLOR_ALPHA,
      constants.COLORTYPE_ALPHA,
    ].indexOf(options.inputColorType) === -1
  ) {
    throw new Error(
      "option input color type:" +
        options.inputColorType +
        " is not supported at present"
    );
  }
  if (options.bitDepth !== 8 && options.bitDepth !== 16) {
    throw new Error(
      "option bit depth:" + options.bitDepth + " is not supported at present"
    );
  }
});

Packer.prototype.getDeflateOptions = function () {
  return {
    chunkSize: this._options.deflateChunkSize,
    level: this._options.deflateLevel,
    strategy: this._options.deflateStrategy,
  };
};

Packer.prototype.createDeflate = function () {
  return this._options.deflateFactory(this.getDeflateOptions());
};

Packer.prototype.filterData = function (data, width, height) {
  // convert to correct format for filtering (e.g. right bpp and bit depth)
  let packedData = bitpacker(data, width, height, this._options);

  // filter pixel data
  let bpp = constants.COLORTYPE_TO_BPP_MAP[this._options.colorType];
  let filteredData = filterPack(packedData, width, height, this._options, bpp);
  return filteredData;
};

Packer.prototype._packChunk = function (type, data) {
  let len = data ? data.length : 0;
  let buf = Buffer.alloc(len + 12);

  buf.writeUInt32BE(len, 0);
  buf.writeUInt32BE(type, 4);

  if (data) {
    data.copy(buf, 8);
  }

  buf.writeInt32BE(
    crc.crc32(buf.slice(4, buf.length - 4)),
    buf.length - 4
  );
  return buf;
};

Packer.prototype.packGAMA = function (gamma) {
  let buf = Buffer.alloc(4);
  buf.writeUInt32BE(Math.floor(gamma * constants.GAMMA_DIVISION), 0);
  return this._packChunk(constants.TYPE_gAMA, buf);
};

Packer.prototype.packIHDR = function (width, height) {
  let buf = Buffer.alloc(13);
  buf.writeUInt32BE(width, 0);
  buf.writeUInt32BE(height, 4);
  buf[8] = this._options.bitDepth; // Bit depth
  buf[9] = this._options.colorType; // colorType
  buf[10] = 0; // compression
  buf[11] = 0; // filter
  buf[12] = 0; // interlace

  return this._packChunk(constants.TYPE_IHDR, buf);
};

Packer.prototype.packIDAT = function (data) {
  return this._packChunk(constants.TYPE_IDAT, data);
};

Packer.prototype.packIEND = function () {
  return this._packChunk(constants.TYPE_IEND, null);
};
});

var packerAsync = createCommonjsModule(function (module) {






let PackerAsync = (module.exports = function (opt) {
  Stream__default["default"].call(this);

  let options = opt || {};

  this._packer = new packer(options);
  this._deflate = this._packer.createDeflate();

  this.readable = true;
});
util__default["default"].inherits(PackerAsync, Stream__default["default"]);

PackerAsync.prototype.pack = function (data, width, height, gamma) {
  // Signature
  this.emit("data", Buffer.from(constants.PNG_SIGNATURE));
  this.emit("data", this._packer.packIHDR(width, height));

  if (gamma) {
    this.emit("data", this._packer.packGAMA(gamma));
  }

  let filteredData = this._packer.filterData(data, width, height);

  // compress it
  this._deflate.on("error", this.emit.bind(this, "error"));

  this._deflate.on(
    "data",
    function (compressedData) {
      this.emit("data", this._packer.packIDAT(compressedData));
    }.bind(this)
  );

  this._deflate.on(
    "end",
    function () {
      this.emit("data", this._packer.packIEND());
      this.emit("end");
    }.bind(this)
  );

  this._deflate.end(filteredData);
};
});

var syncInflate = createCommonjsModule(function (module, exports) {

let assert = require$$0__default["default"].ok;



let kMaxLength = require$$1__default["default"].kMaxLength;

function Inflate(opts) {
  if (!(this instanceof Inflate)) {
    return new Inflate(opts);
  }

  if (opts && opts.chunkSize < zlib__default["default"].Z_MIN_CHUNK) {
    opts.chunkSize = zlib__default["default"].Z_MIN_CHUNK;
  }

  zlib__default["default"].Inflate.call(this, opts);

  // Node 8 --> 9 compatibility check
  this._offset = this._offset === undefined ? this._outOffset : this._offset;
  this._buffer = this._buffer || this._outBuffer;

  if (opts && opts.maxLength != null) {
    this._maxLength = opts.maxLength;
  }
}

function createInflate(opts) {
  return new Inflate(opts);
}

function _close(engine, callback) {
  if (callback) {
    process.nextTick(callback);
  }

  // Caller may invoke .close after a zlib error (which will null _handle).
  if (!engine._handle) {
    return;
  }

  engine._handle.close();
  engine._handle = null;
}

Inflate.prototype._processChunk = function (chunk, flushFlag, asyncCb) {
  if (typeof asyncCb === "function") {
    return zlib__default["default"].Inflate._processChunk.call(this, chunk, flushFlag, asyncCb);
  }

  let self = this;

  let availInBefore = chunk && chunk.length;
  let availOutBefore = this._chunkSize - this._offset;
  let leftToInflate = this._maxLength;
  let inOff = 0;

  let buffers = [];
  let nread = 0;

  let error;
  this.on("error", function (err) {
    error = err;
  });

  function handleChunk(availInAfter, availOutAfter) {
    if (self._hadError) {
      return;
    }

    let have = availOutBefore - availOutAfter;
    assert(have >= 0, "have should not go down");

    if (have > 0) {
      let out = self._buffer.slice(self._offset, self._offset + have);
      self._offset += have;

      if (out.length > leftToInflate) {
        out = out.slice(0, leftToInflate);
      }

      buffers.push(out);
      nread += out.length;
      leftToInflate -= out.length;

      if (leftToInflate === 0) {
        return false;
      }
    }

    if (availOutAfter === 0 || self._offset >= self._chunkSize) {
      availOutBefore = self._chunkSize;
      self._offset = 0;
      self._buffer = Buffer.allocUnsafe(self._chunkSize);
    }

    if (availOutAfter === 0) {
      inOff += availInBefore - availInAfter;
      availInBefore = availInAfter;

      return true;
    }

    return false;
  }

  assert(this._handle, "zlib binding closed");
  let res;
  do {
    res = this._handle.writeSync(
      flushFlag,
      chunk, // in
      inOff, // in_off
      availInBefore, // in_len
      this._buffer, // out
      this._offset, //out_off
      availOutBefore
    ); // out_len
    // Node 8 --> 9 compatibility check
    res = res || this._writeState;
  } while (!this._hadError && handleChunk(res[0], res[1]));

  if (this._hadError) {
    throw error;
  }

  if (nread >= kMaxLength) {
    _close(this);
    throw new RangeError(
      "Cannot create final Buffer. It would be larger than 0x" +
        kMaxLength.toString(16) +
        " bytes"
    );
  }

  let buf = Buffer.concat(buffers, nread);
  _close(this);

  return buf;
};

util__default["default"].inherits(Inflate, zlib__default["default"].Inflate);

function zlibBufferSync(engine, buffer) {
  if (typeof buffer === "string") {
    buffer = Buffer.from(buffer);
  }
  if (!(buffer instanceof Buffer)) {
    throw new TypeError("Not a string or buffer");
  }

  let flushFlag = engine._finishFlushFlag;
  if (flushFlag == null) {
    flushFlag = zlib__default["default"].Z_FINISH;
  }

  return engine._processChunk(buffer, flushFlag);
}

function inflateSync(buffer, opts) {
  return zlibBufferSync(new Inflate(opts), buffer);
}

module.exports = exports = inflateSync;
exports.Inflate = Inflate;
exports.createInflate = createInflate;
exports.inflateSync = inflateSync;
});

var syncReader = createCommonjsModule(function (module) {

let SyncReader = (module.exports = function (buffer) {
  this._buffer = buffer;
  this._reads = [];
});

SyncReader.prototype.read = function (length, callback) {
  this._reads.push({
    length: Math.abs(length), // if length < 0 then at most this length
    allowLess: length < 0,
    func: callback,
  });
};

SyncReader.prototype.process = function () {
  // as long as there is any data and read requests
  while (this._reads.length > 0 && this._buffer.length) {
    let read = this._reads[0];

    if (
      this._buffer.length &&
      (this._buffer.length >= read.length || read.allowLess)
    ) {
      // ok there is any data so that we can satisfy this request
      this._reads.shift(); // == read

      let buf = this._buffer;

      this._buffer = buf.slice(read.length);

      read.func.call(this, buf.slice(0, read.length));
    } else {
      break;
    }
  }

  if (this._reads.length > 0) {
    return new Error("There are some read requests waitng on finished stream");
  }

  if (this._buffer.length > 0) {
    return new Error("unrecognised content at end of stream");
  }
};
});

var process_1 = function (inBuffer, bitmapInfo) {
  let outBuffers = [];
  let reader = new syncReader(inBuffer);
  let filter = new filterParse(bitmapInfo, {
    read: reader.read.bind(reader),
    write: function (bufferPart) {
      outBuffers.push(bufferPart);
    },
    complete: function () {},
  });

  filter.start();
  reader.process();

  return Buffer.concat(outBuffers);
};

var filterParseSync = {
	process: process_1
};

let hasSyncZlib$1 = true;


if (!zlib__default["default"].deflateSync) {
  hasSyncZlib$1 = false;
}






var parserSync = function (buffer, options) {
  if (!hasSyncZlib$1) {
    throw new Error(
      "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
    );
  }

  let err;
  function handleError(_err_) {
    err = _err_;
  }

  let metaData;
  function handleMetaData(_metaData_) {
    metaData = _metaData_;
  }

  function handleTransColor(transColor) {
    metaData.transColor = transColor;
  }

  function handlePalette(palette) {
    metaData.palette = palette;
  }

  function handleSimpleTransparency() {
    metaData.alpha = true;
  }

  let gamma;
  function handleGamma(_gamma_) {
    gamma = _gamma_;
  }

  let inflateDataList = [];
  function handleInflateData(inflatedData) {
    inflateDataList.push(inflatedData);
  }

  let reader = new syncReader(buffer);

  let parser$1 = new parser(options, {
    read: reader.read.bind(reader),
    error: handleError,
    metadata: handleMetaData,
    gamma: handleGamma,
    palette: handlePalette,
    transColor: handleTransColor,
    inflateData: handleInflateData,
    simpleTransparency: handleSimpleTransparency,
  });

  parser$1.start();
  reader.process();

  if (err) {
    throw err;
  }

  //join together the inflate datas
  let inflateData = Buffer.concat(inflateDataList);
  inflateDataList.length = 0;

  let inflatedData;
  if (metaData.interlace) {
    inflatedData = zlib__default["default"].inflateSync(inflateData);
  } else {
    let rowSize =
      ((metaData.width * metaData.bpp * metaData.depth + 7) >> 3) + 1;
    let imageSize = rowSize * metaData.height;
    inflatedData = syncInflate(inflateData, {
      chunkSize: imageSize,
      maxLength: imageSize,
    });
  }
  inflateData = null;

  if (!inflatedData || !inflatedData.length) {
    throw new Error("bad png - invalid inflate data response");
  }

  let unfilteredData = filterParseSync.process(inflatedData, metaData);
  inflateData = null;

  let bitmapData = bitmapper.dataToBitMap(unfilteredData, metaData);
  unfilteredData = null;

  let normalisedBitmapData = formatNormaliser(bitmapData, metaData);

  metaData.data = normalisedBitmapData;
  metaData.gamma = gamma || 0;

  return metaData;
};

let hasSyncZlib = true;

if (!zlib__default["default"].deflateSync) {
  hasSyncZlib = false;
}



var packerSync = function (metaData, opt) {
  if (!hasSyncZlib) {
    throw new Error(
      "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
    );
  }

  let options = opt || {};

  let packer$1 = new packer(options);

  let chunks = [];

  // Signature
  chunks.push(Buffer.from(constants.PNG_SIGNATURE));

  // Header
  chunks.push(packer$1.packIHDR(metaData.width, metaData.height));

  if (metaData.gamma) {
    chunks.push(packer$1.packGAMA(metaData.gamma));
  }

  let filteredData = packer$1.filterData(
    metaData.data,
    metaData.width,
    metaData.height
  );

  // compress it
  let compressedData = zlib__default["default"].deflateSync(
    filteredData,
    packer$1.getDeflateOptions()
  );
  filteredData = null;

  if (!compressedData || !compressedData.length) {
    throw new Error("bad png - invalid compressed data response");
  }
  chunks.push(packer$1.packIDAT(compressedData));

  // End
  chunks.push(packer$1.packIEND());

  return Buffer.concat(chunks);
};

var read = function (buffer, options) {
  return parserSync(buffer, options || {});
};

var write = function (png, options) {
  return packerSync(png, options);
};

var pngSync = {
	read: read,
	write: write
};

var png$1 = createCommonjsModule(function (module, exports) {







let PNG = (exports.PNG = function (options) {
  Stream__default["default"].call(this);

  options = options || {}; // eslint-disable-line no-param-reassign

  // coerce pixel dimensions to integers (also coerces undefined -> 0):
  this.width = options.width | 0;
  this.height = options.height | 0;

  this.data =
    this.width > 0 && this.height > 0
      ? Buffer.alloc(4 * this.width * this.height)
      : null;

  if (options.fill && this.data) {
    this.data.fill(0);
  }

  this.gamma = 0;
  this.readable = this.writable = true;

  this._parser = new parserAsync(options);

  this._parser.on("error", this.emit.bind(this, "error"));
  this._parser.on("close", this._handleClose.bind(this));
  this._parser.on("metadata", this._metadata.bind(this));
  this._parser.on("gamma", this._gamma.bind(this));
  this._parser.on(
    "parsed",
    function (data) {
      this.data = data;
      this.emit("parsed", data);
    }.bind(this)
  );

  this._packer = new packerAsync(options);
  this._packer.on("data", this.emit.bind(this, "data"));
  this._packer.on("end", this.emit.bind(this, "end"));
  this._parser.on("close", this._handleClose.bind(this));
  this._packer.on("error", this.emit.bind(this, "error"));
});
util__default["default"].inherits(PNG, Stream__default["default"]);

PNG.sync = pngSync;

PNG.prototype.pack = function () {
  if (!this.data || !this.data.length) {
    this.emit("error", "No data provided");
    return this;
  }

  process.nextTick(
    function () {
      this._packer.pack(this.data, this.width, this.height, this.gamma);
    }.bind(this)
  );

  return this;
};

PNG.prototype.parse = function (data, callback) {
  if (callback) {
    let onParsed, onError;

    onParsed = function (parsedData) {
      this.removeListener("error", onError);

      this.data = parsedData;
      callback(null, this);
    }.bind(this);

    onError = function (err) {
      this.removeListener("parsed", onParsed);

      callback(err, null);
    }.bind(this);

    this.once("parsed", onParsed);
    this.once("error", onError);
  }

  this.end(data);
  return this;
};

PNG.prototype.write = function (data) {
  this._parser.write(data);
  return true;
};

PNG.prototype.end = function (data) {
  this._parser.end(data);
};

PNG.prototype._metadata = function (metadata) {
  this.width = metadata.width;
  this.height = metadata.height;

  this.emit("metadata", metadata);
};

PNG.prototype._gamma = function (gamma) {
  this.gamma = gamma;
};

PNG.prototype._handleClose = function () {
  if (!this._parser.writable && !this._packer.readable) {
    this.emit("close");
  }
};

PNG.bitblt = function (src, dst, srcX, srcY, width, height, deltaX, deltaY) {
  // eslint-disable-line max-params
  // coerce pixel dimensions to integers (also coerces undefined -> 0):
  /* eslint-disable no-param-reassign */
  srcX |= 0;
  srcY |= 0;
  width |= 0;
  height |= 0;
  deltaX |= 0;
  deltaY |= 0;
  /* eslint-enable no-param-reassign */

  if (
    srcX > src.width ||
    srcY > src.height ||
    srcX + width > src.width ||
    srcY + height > src.height
  ) {
    throw new Error("bitblt reading outside image");
  }

  if (
    deltaX > dst.width ||
    deltaY > dst.height ||
    deltaX + width > dst.width ||
    deltaY + height > dst.height
  ) {
    throw new Error("bitblt writing outside image");
  }

  for (let y = 0; y < height; y++) {
    src.data.copy(
      dst.data,
      ((deltaY + y) * dst.width + deltaX) << 2,
      ((srcY + y) * src.width + srcX) << 2,
      ((srcY + y) * src.width + srcX + width) << 2
    );
  }
};

PNG.prototype.bitblt = function (
  dst,
  srcX,
  srcY,
  width,
  height,
  deltaX,
  deltaY
) {
  // eslint-disable-line max-params

  PNG.bitblt(this, dst, srcX, srcY, width, height, deltaX, deltaY);
  return this;
};

PNG.adjustGamma = function (src) {
  if (src.gamma) {
    for (let y = 0; y < src.height; y++) {
      for (let x = 0; x < src.width; x++) {
        let idx = (src.width * y + x) << 2;

        for (let i = 0; i < 3; i++) {
          let sample = src.data[idx + i] / 255;
          sample = Math.pow(sample, 1 / 2.2 / src.gamma);
          src.data[idx + i] = Math.round(sample * 255);
        }
      }
    }
    src.gamma = 0;
  }
};

PNG.prototype.adjustGamma = function () {
  PNG.adjustGamma(this);
};
});

var utils$1 = createCommonjsModule(function (module, exports) {
function hex2rgba (hex) {
  if (typeof hex === 'number') {
    hex = hex.toString();
  }

  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string')
  }

  let hexCode = hex.slice().replace('#', '').split('');
  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex)
  }

  // Convert from short to long form (fff -> ffffff)
  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
      return [c, c]
    }));
  }

  // Add default alpha value
  if (hexCode.length === 6) hexCode.push('F', 'F');

  const hexValue = parseInt(hexCode.join(''), 16);

  return {
    r: (hexValue >> 24) & 255,
    g: (hexValue >> 16) & 255,
    b: (hexValue >> 8) & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join('')
  }
}

exports.getOptions = function getOptions (options) {
  if (!options) options = {};
  if (!options.color) options.color = {};

  const margin = typeof options.margin === 'undefined' ||
    options.margin === null ||
    options.margin < 0
    ? 4
    : options.margin;

  const width = options.width && options.width >= 21 ? options.width : undefined;
  const scale = options.scale || 4;

  return {
    width: width,
    scale: width ? 4 : scale,
    margin: margin,
    color: {
      dark: hex2rgba(options.color.dark || '#000000ff'),
      light: hex2rgba(options.color.light || '#ffffffff')
    },
    type: options.type,
    rendererOpts: options.rendererOpts || {}
  }
};

exports.getScale = function getScale (qrSize, opts) {
  return opts.width && opts.width >= qrSize + opts.margin * 2
    ? opts.width / (qrSize + opts.margin * 2)
    : opts.scale
};

exports.getImageWidth = function getImageWidth (qrSize, opts) {
  const scale = exports.getScale(qrSize, opts);
  return Math.floor((qrSize + opts.margin * 2) * scale)
};

exports.qrToImageData = function qrToImageData (imgData, qr, opts) {
  const size = qr.modules.size;
  const data = qr.modules.data;
  const scale = exports.getScale(size, opts);
  const symbolSize = Math.floor((size + opts.margin * 2) * scale);
  const scaledMargin = opts.margin * scale;
  const palette = [opts.color.light, opts.color.dark];

  for (let i = 0; i < symbolSize; i++) {
    for (let j = 0; j < symbolSize; j++) {
      let posDst = (i * symbolSize + j) * 4;
      let pxColor = opts.color.light;

      if (i >= scaledMargin && j >= scaledMargin &&
        i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        const iSrc = Math.floor((i - scaledMargin) / scale);
        const jSrc = Math.floor((j - scaledMargin) / scale);
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
      }

      imgData[posDst++] = pxColor.r;
      imgData[posDst++] = pxColor.g;
      imgData[posDst++] = pxColor.b;
      imgData[posDst] = pxColor.a;
    }
  }
};
});

var png = createCommonjsModule(function (module, exports) {
const PNG = png$1.PNG;


exports.render = function render (qrData, options) {
  const opts = utils$1.getOptions(options);
  const pngOpts = opts.rendererOpts;
  const size = utils$1.getImageWidth(qrData.modules.size, opts);

  pngOpts.width = size;
  pngOpts.height = size;

  const pngImage = new PNG(pngOpts);
  utils$1.qrToImageData(pngImage.data, qrData, opts);

  return pngImage
};

exports.renderToDataURL = function renderToDataURL (qrData, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options;
    options = undefined;
  }

  exports.renderToBuffer(qrData, options, function (err, output) {
    if (err) cb(err);
    let url = 'data:image/png;base64,';
    url += output.toString('base64');
    cb(null, url);
  });
};

exports.renderToBuffer = function renderToBuffer (qrData, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options;
    options = undefined;
  }

  const png = exports.render(qrData, options);
  const buffer = [];

  png.on('error', cb);

  png.on('data', function (data) {
    buffer.push(data);
  });

  png.on('end', function () {
    cb(null, Buffer.concat(buffer));
  });

  png.pack();
};

exports.renderToFile = function renderToFile (path, qrData, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options;
    options = undefined;
  }

  let called = false;
  const done = (...args) => {
    if (called) return
    called = true;
    cb.apply(null, args);
  };
  const stream = require$$0__default$1["default"].createWriteStream(path);

  stream.on('error', done);
  stream.on('close', done);

  exports.renderToFileStream(stream, qrData, options);
};

exports.renderToFileStream = function renderToFileStream (stream, qrData, options) {
  const png = exports.render(qrData, options);
  png.pack().pipe(stream);
};
});

var utf8 = createCommonjsModule(function (module, exports) {
const BLOCK_CHAR = {
  WW: ' ',
  WB: '▄',
  BB: '█',
  BW: '▀'
};

const INVERTED_BLOCK_CHAR = {
  BB: ' ',
  BW: '▄',
  WW: '█',
  WB: '▀'
};

function getBlockChar (top, bottom, blocks) {
  if (top && bottom) return blocks.BB
  if (top && !bottom) return blocks.BW
  if (!top && bottom) return blocks.WB
  return blocks.WW
}

exports.render = function (qrData, options, cb) {
  const opts = utils$1.getOptions(options);
  let blocks = BLOCK_CHAR;
  if (opts.color.dark.hex === '#ffffff' || opts.color.light.hex === '#000000') {
    blocks = INVERTED_BLOCK_CHAR;
  }

  const size = qrData.modules.size;
  const data = qrData.modules.data;

  let output = '';
  let hMargin = Array(size + (opts.margin * 2) + 1).join(blocks.WW);
  hMargin = Array((opts.margin / 2) + 1).join(hMargin + '\n');

  const vMargin = Array(opts.margin + 1).join(blocks.WW);

  output += hMargin;
  for (let i = 0; i < size; i += 2) {
    output += vMargin;
    for (let j = 0; j < size; j++) {
      const topModule = data[i * size + j];
      const bottomModule = data[(i + 1) * size + j];

      output += getBlockChar(topModule, bottomModule, blocks);
    }

    output += vMargin + '\n';
  }

  output += hMargin.slice(0, -1);

  if (typeof cb === 'function') {
    cb(null, output);
  }

  return output
};

exports.renderToFile = function renderToFile (path, qrData, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options;
    options = undefined;
  }

  const fs = require$$0__default$1["default"];
  const utf8 = exports.render(qrData, options);
  fs.writeFile(path, utf8, cb);
};
});

// let Utils = require('./utils')

var render$4 = function (qrData, options, cb) {
  const size = qrData.modules.size;
  const data = qrData.modules.data;

  // let opts = Utils.getOptions(options)

  // use same scheme as https://github.com/gtanner/qrcode-terminal because it actually works! =)
  const black = '\x1b[40m  \x1b[0m';
  const white = '\x1b[47m  \x1b[0m';

  let output = '';
  const hMargin = Array(size + 3).join(white);
  const vMargin = Array(2).join(white);

  output += hMargin + '\n';
  for (let i = 0; i < size; ++i) {
    output += white;
    for (let j = 0; j < size; j++) {
      // let topModule = data[i * size + j]
      // let bottomModule = data[(i + 1) * size + j]

      output += data[i * size + j] ? black : white;// getBlockChar(topModule, bottomModule)
    }
    // output += white+'\n'
    output += vMargin + '\n';
  }

  output += hMargin + '\n';

  if (typeof cb === 'function') {
    cb(null, output);
  }

  return output
};
/*
exports.renderToFile = function renderToFile (path, qrData, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options
    options = undefined
  }

  let fs = require('fs')
  let utf8 = exports.render(qrData, options)
  fs.writeFile(path, utf8, cb)
}
*/

var terminal$1 = {
	render: render$4
};

const backgroundWhite = '\x1b[47m';
const backgroundBlack = '\x1b[40m';
const foregroundWhite = '\x1b[37m';
const foregroundBlack = '\x1b[30m';
const reset = '\x1b[0m';
const lineSetupNormal = backgroundWhite + foregroundBlack; // setup colors
const lineSetupInverse = backgroundBlack + foregroundWhite; // setup colors

const createPalette = function (lineSetup, foregroundWhite, foregroundBlack) {
  return {
    // 1 ... white, 2 ... black, 0 ... transparent (default)

    '00': reset + ' ' + lineSetup,
    '01': reset + foregroundWhite + '▄' + lineSetup,
    '02': reset + foregroundBlack + '▄' + lineSetup,
    10: reset + foregroundWhite + '▀' + lineSetup,
    11: ' ',
    12: '▄',
    20: reset + foregroundBlack + '▀' + lineSetup,
    21: '▀',
    22: '█'
  }
};

/**
 * Returns code for QR pixel
 * @param {boolean[][]} modules
 * @param {number} size
 * @param {number} x
 * @param {number} y
 * @return {'0' | '1' | '2'}
 */
const mkCodePixel = function (modules, size, x, y) {
  const sizePlus = size + 1;
  if ((x >= sizePlus) || (y >= sizePlus) || (y < -1) || (x < -1)) return '0'
  if ((x >= size) || (y >= size) || (y < 0) || (x < 0)) return '1'
  const idx = (y * size) + x;
  return modules[idx] ? '2' : '1'
};

/**
 * Returns code for four QR pixels. Suitable as key in palette.
 * @param {boolean[][]} modules
 * @param {number} size
 * @param {number} x
 * @param {number} y
 * @return {keyof palette}
 */
const mkCode = function (modules, size, x, y) {
  return (
    mkCodePixel(modules, size, x, y) +
    mkCodePixel(modules, size, x, y + 1)
  )
};

var render$3 = function (qrData, options, cb) {
  const size = qrData.modules.size;
  const data = qrData.modules.data;

  const inverse = !!(options && options.inverse);
  const lineSetup = options && options.inverse ? lineSetupInverse : lineSetupNormal;
  const white = inverse ? foregroundBlack : foregroundWhite;
  const black = inverse ? foregroundWhite : foregroundBlack;

  const palette = createPalette(lineSetup, white, black);
  const newLine = reset + '\n' + lineSetup;

  let output = lineSetup; // setup colors

  for (let y = -1; y < size + 1; y += 2) {
    for (let x = -1; x < size; x++) {
      output += palette[mkCode(data, size, x, y)];
    }

    output += palette[mkCode(data, size, size, y)] + newLine;
  }

  output += reset;

  if (typeof cb === 'function') {
    cb(null, output);
  }

  return output
};

var terminalSmall = {
	render: render$3
};

var render$2 = function (qrData, options, cb) {
  if (options && options.small) {
    return terminalSmall.render(qrData, options, cb)
  }
  return terminal$1.render(qrData, options, cb)
};

var terminal = {
	render: render$2
};

function getColorAttrib (color, attrib) {
  const alpha = color.a / 255;
  const str = attrib + '="' + color.hex + '"';

  return alpha < 1
    ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"'
    : str
}

function svgCmd (cmd, x, y) {
  let str = cmd + x;
  if (typeof y !== 'undefined') str += ' ' + y;

  return str
}

function qrToPath (data, size, margin) {
  let path = '';
  let moveBy = 0;
  let newRow = false;
  let lineLength = 0;

  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size);
    const row = Math.floor(i / size);

    if (!col && !newRow) newRow = true;

    if (data[i]) {
      lineLength++;

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow
          ? svgCmd('M', col + margin, 0.5 + row + margin)
          : svgCmd('m', moveBy, 0);

        moveBy = 0;
        newRow = false;
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }

  return path
}

var render$1 = function render (qrData, options, cb) {
  const opts = utils$1.getOptions(options);
  const size = qrData.modules.size;
  const data = qrData.modules.data;
  const qrcodesize = size + opts.margin * 2;

  const bg = !opts.color.light.a
    ? ''
    : '<path ' + getColorAttrib(opts.color.light, 'fill') +
      ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';

  const path =
    '<path ' + getColorAttrib(opts.color.dark, 'stroke') +
    ' d="' + qrToPath(data, size, opts.margin) + '"/>';

  const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';

  const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';

  const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';

  if (typeof cb === 'function') {
    cb(null, svgTag);
  }

  return svgTag
};

var svgTag = {
	render: render$1
};

var svg = createCommonjsModule(function (module, exports) {
exports.render = svgTag.render;

exports.renderToFile = function renderToFile (path, qrData, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options;
    options = undefined;
  }

  const fs = require$$0__default$1["default"];
  const svgTag = exports.render(qrData, options);

  const xmlStr = '<?xml version="1.0" encoding="utf-8"?>' +
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
    svgTag;

  fs.writeFile(path, xmlStr, cb);
};
});

var canvas = createCommonjsModule(function (module, exports) {
function clearCanvas (ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!canvas.style) canvas.style = {};
  canvas.height = size;
  canvas.width = size;
  canvas.style.height = size + 'px';
  canvas.style.width = size + 'px';
}

function getCanvasElement () {
  try {
    return document.createElement('canvas')
  } catch (e) {
    throw new Error('You need to specify a canvas element')
  }
}

exports.render = function render (qrData, canvas, options) {
  let opts = options;
  let canvasEl = canvas;

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }

  if (!canvas) {
    canvasEl = getCanvasElement();
  }

  opts = utils$1.getOptions(opts);
  const size = utils$1.getImageWidth(qrData.modules.size, opts);

  const ctx = canvasEl.getContext('2d');
  const image = ctx.createImageData(size, size);
  utils$1.qrToImageData(image.data, qrData, opts);

  clearCanvas(ctx, canvasEl, size);
  ctx.putImageData(image, 0, 0);

  return canvasEl
};

exports.renderToDataURL = function renderToDataURL (qrData, canvas, options) {
  let opts = options;

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }

  if (!opts) opts = {};

  const canvasEl = exports.render(qrData, canvas, opts);

  const type = opts.type || 'image/png';
  const rendererOpts = opts.rendererOpts || {};

  return canvasEl.toDataURL(type, rendererOpts.quality)
};
});

function renderCanvas (renderFunc, canvas, text, opts, cb) {
  const args = [].slice.call(arguments, 1);
  const argsNum = args.length;
  const isLastArgCb = typeof args[argsNum - 1] === 'function';

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument')
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 2) {
      cb = text;
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts;
        opts = undefined;
      } else {
        cb = opts;
        opts = text;
        text = canvas;
        canvas = undefined;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 1) {
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text;
      text = canvas;
      canvas = undefined;
    }

    return new Promise(function (resolve, reject) {
      try {
        const data = qrcode.create(text, opts);
        resolve(renderFunc(data, canvas, opts));
      } catch (e) {
        reject(e);
      }
    })
  }

  try {
    const data = qrcode.create(text, opts);
    cb(null, renderFunc(data, canvas, opts));
  } catch (e) {
    cb(e);
  }
}

var create$1 = qrcode.create;
var toCanvas$1 = renderCanvas.bind(null, canvas.render);
var toDataURL$1 = renderCanvas.bind(null, canvas.renderToDataURL);

// only svg for now.
var toString_1$1 = renderCanvas.bind(null, function (data, _, opts) {
  return svgTag.render(data, opts)
});

var browser$2 = {
	create: create$1,
	toCanvas: toCanvas$1,
	toDataURL: toDataURL$1,
	toString: toString_1$1
};

function checkParams (text, opts, cb) {
  if (typeof text === 'undefined') {
    throw new Error('String required as first argument')
  }

  if (typeof cb === 'undefined') {
    cb = opts;
    opts = {};
  }

  if (typeof cb !== 'function') {
    if (!canPromise()) {
      throw new Error('Callback required as last argument')
    } else {
      opts = cb || {};
      cb = null;
    }
  }

  return {
    opts: opts,
    cb: cb
  }
}

function getTypeFromFilename (path) {
  return path.slice((path.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase()
}

function getRendererFromType (type) {
  switch (type) {
    case 'svg':
      return svg

    case 'txt':
    case 'utf8':
      return utf8

    case 'png':
    case 'image/png':
    default:
      return png
  }
}

function getStringRendererFromType (type) {
  switch (type) {
    case 'svg':
      return svg

    case 'terminal':
      return terminal

    case 'utf8':
    default:
      return utf8
  }
}

function render (renderFunc, text, params) {
  if (!params.cb) {
    return new Promise(function (resolve, reject) {
      try {
        const data = qrcode.create(text, params.opts);
        return renderFunc(data, params.opts, function (err, data) {
          return err ? reject(err) : resolve(data)
        })
      } catch (e) {
        reject(e);
      }
    })
  }

  try {
    const data = qrcode.create(text, params.opts);
    return renderFunc(data, params.opts, params.cb)
  } catch (e) {
    params.cb(e);
  }
}

var create = qrcode.create;

var toCanvas = browser$2.toCanvas;

var toString_1 = function toString (text, opts, cb) {
  const params = checkParams(text, opts, cb);
  const type = params.opts ? params.opts.type : undefined;
  const renderer = getStringRendererFromType(type);
  return render(renderer.render, text, params)
};

var toDataURL = function toDataURL (text, opts, cb) {
  const params = checkParams(text, opts, cb);
  const renderer = getRendererFromType(params.opts.type);
  return render(renderer.renderToDataURL, text, params)
};

var toBuffer = function toBuffer (text, opts, cb) {
  const params = checkParams(text, opts, cb);
  const renderer = getRendererFromType(params.opts.type);
  return render(renderer.renderToBuffer, text, params)
};

var toFile = function toFile (path, text, opts, cb) {
  if (typeof path !== 'string' || !(typeof text === 'string' || typeof text === 'object')) {
    throw new Error('Invalid argument')
  }

  if ((arguments.length < 3) && !canPromise()) {
    throw new Error('Too few arguments provided')
  }

  const params = checkParams(text, opts, cb);
  const type = params.opts.type || getTypeFromFilename(path);
  const renderer = getRendererFromType(type);
  const renderToFile = renderer.renderToFile.bind(null, path);

  return render(renderToFile, text, params)
};

var toFileStream = function toFileStream (stream, text, opts) {
  if (arguments.length < 2) {
    throw new Error('Too few arguments provided')
  }

  const params = checkParams(text, opts, stream.emit.bind(stream, 'error'));
  const renderer = getRendererFromType('png'); // Only png support for now
  const renderToFileStream = renderer.renderToFileStream.bind(null, stream);
  render(renderToFileStream, text, params);
};

var server = {
	create: create,
	toCanvas: toCanvas,
	toString: toString_1,
	toDataURL: toDataURL,
	toBuffer: toBuffer,
	toFile: toFile,
	toFileStream: toFileStream
};

/*
*copyright Ryan Day 2012
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* this is the main server side application file for node-qrcode.
* these exports use serverside canvas api methods for file IO and buffers
*
*/

var lib = server;

var isProduction = process.env.NODE_ENV === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    var provided = typeof message === 'function' ? message() : message;
    var value = provided ? prefix + ": " + provided : prefix;
    throw new Error(value);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$7 = ".qr-code {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n  text-align: center;\n}\n\n.qr-code .help {\n  margin-bottom: 6px;\n}\n\n.qr-code .help-item {\n  text-align: left;\n  font-size: 12px;\n}\n\n.qrcode-img-wrapper {\n  margin-bottom: 1rem;\n}\n\n.qr-code .bold {\n  font-weight: 700;\n}\n\n.qr-code .light {\n  font-weight: 300;\n}\n\n.qr-code .btn.focus, .btn:focus {\n  box-shadow: none;\n}\n\n.qr-code .image-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-bottom: -15px;\n}\n\n.qr-code .qr-code-img {\n  width: 220px;\n  height: auto;\n}\n\n@media screen and (max-width: 600px) {\n  .qrcode-content {\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .description {\n    margin-left: 0;\n    margin-top: 24px;\n  }\n}\n";
styleInject(css_248z$7);

var saasUrls = {
    local: 'http://localhost:6030',
    development: 'https://api.dev-unumid.co',
    sandbox: 'https://api.sandbox-unumid.co',
    production: 'https://api.unumid.co',
};
var walletUrls = {
    local: 'http://localhost:3000',
    development: 'https://wallet.dev-unumid.co',
    sandbox: 'https://wallet.sandbox-unumid.co',
    production: 'https://wallet.unumid.co',
};

var isArray$1 = Array.isArray;

function cc(obj) {
  var out = "";

  if (typeof obj === "string" || typeof obj === "number") return obj || ""

  if (isArray$1(obj))
    for (var k = 0, tmp; k < obj.length; k++) {
      if ((tmp = cc(obj[k])) !== "") {
        out += (out && " ") + tmp;
      }
    }
  else
    for (var k in obj) {
      if (obj.hasOwnProperty(k) && obj[k]) out += (out && " ") + k;
    }

  return out
}

var css_248z$6 = ".deeplink-button {\n  cursor: pointer;\n  margin-bottom: 20px;\n  max-width: 250px;\n  max-height: 50px;\n}\n\n.deeplink-button img {\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css_248z$6);

var DeepLinkButtonRole = 'DeepLinkButtonRole';
/**
 * Component responsible for displaying a deep link as a clickable button.
 * Primarily intended for use in mobile browsers.
 */
var DeeplinkButton = function (_a) {
    var target = _a.target, href = _a.href, className = _a.className, children = _a.children, role = _a.role;
    return (React__default["default"].createElement("a", { className: cc(['deeplink-button', className]), href: href, target: target, role: role || DeepLinkButtonRole }, children));
};

var css_248z$5 = ".link-button {\n  font-family: inherit;\n  font-weight: 300;\n  color: #007bff;\n  text-decoration: none;\n  text-align: center;\n  vertical-align: middle;\n  background-color: transparent;\n  font-size: 1rem;\n  line-height: 1.5;\n  padding: .375rem .75rem;\n  cursor: pointer;\n  border: none;\n}\n\n.link-button:focus {\n  outline: none;\n}\n\n.continue-under-qr {\n  width: 60%;\n}\n";
styleInject(css_248z$5);

/**
 * Component that renders a button styled as a link.
 */
var LinkButton = function (_a) {
    var onClick = _a.onClick, children = _a.children;
    return (React__default["default"].createElement("button", { type: "button", className: "link-button", onClick: onClick }, children));
};

var css_248z$4 = ".spinner {\n  border: 8px solid #f5f5f5;\n  border-top: 8px solid #dddddd;\n  border-radius: 50%;\n  width: 80px;\n  height: 80px;\n  animation: spin 1s linear infinite;\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n";
styleInject(css_248z$4);

/**
 * Component responsible for rendering an animated spinner,
 * to be displayed while waiting for data bo be loaded.
 */
var Spinner = function () { return (React__default["default"].createElement("div", { className: "spinner", "aria-label": "spinner" })); };

var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACAEAAADOCAYAAABFaImtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAIAaADAAQAAAABAAAAzgAAAACFNkz4AABAAElEQVR4AeydB3xW1f3/k5CEBEjCngES9t6CoCAIoqjghFoFBBf+VWzV2l8drai11tqqddTiAreCtgpVwAUqlA3K3nvvvRP+7y9NNCT3SZ5xn+Q+yee8Xt88T+69Z73vvec55/v9nnOioxREQAREQAREQAREQAREQAREQAREQAREoBAInD59Oppsoq+++urKixYtqnns2LGqsbGxjfhscfLkyQZ8Vi9Tpkza8ePHyx4+fDgqIyMjqlSpUlEci0pISDh65MiRdWXLlt0eHx+/vnTp0gu4ZjGf2xs1arTlgQce2NO9e/eM6Ojo04VQFWUhAiIgAiIgAiIgAiIgAiIgAiIgAp4lYINvBREQAREQAREQAREQAREQAREQAREQARFwnQBG/5iBAweWmz9/fuudO3e2wrjf5NSpUw04XsskMzOz4okTJ4LONy4uLgqj/x5kM84C23AOWIFTwMrk5OT5tWrVWjB58uQDnMsMOgNFFAEREAEREAEREAEREAEREAEREIEIJCAngAi8aSqyCIiACIiACIiACIiACIiACIiACHiVgBn+u3TpUmP16tXnMLu/J0b+8/msx6z+ZJvZH86AwT8qJibGZD8OAuuRaTgFfI1DwJx58+Zt4LxWCQjnDVDaIiACIiACIiACIiACIiACIiACniAgJwBP3AYVQgREQAREQAREQAREQAREQAREQAQilwCG/1KNGzeue+jQoU4s2X8py/pfiOG/Bkb/Itc72HYCyFYcAr4yqVix4nQcFNbgEBBej4TIvZ0quQiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIQEkkcNttt8Wlp6d3S0lJ+Scz7jdibLeZ9p4VVgg4beUsX77863Xq1Llo+PDhpUvifVOdRUAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEROAnAn369EmuUqXKtcnJyV9i+D/GCc8a/n2VLTY29njZsmUnV61addBll11W4afK6YsIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIlAQC/fv3L8fM/9swns/C+H+SOkec8T93mVkdIKNMmTLzcQb4f3IGKAlPseooAiIgAiIgAiIgAiIgAiIgAsWfQJHvzVf8EauGIiACIiACIiACIiACIiACIiACIhDZBCZPnhx7ww03XLZ37977Tpw40TUjIyPoCkVHR0dheDc5guxGdiI74uLitvK5i+X69x08eHA3WwxEJSQkRJ08eTJq165dUTgeVDh16lR54lfnsxrlqJKZmVn59OnTlSlPWT6jTIIN5G15zET+evvtt/9nxIgRtsKBggiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAgUDwIY1aPr1at3Psv+j8dIfoJaBTzzH6P9aVYNOIVBf3W5cuU+KF++/GM1a9b8JXLeOeecU2/8+PFlgqE1ZsyYxDZt2qQxg79Lamrq9RUrVnwMA/6H5LOCpf5PWb7BlJe4GdR3Qp06dXpa/YMpm+KIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgKcIXHzxxRUrV678KDPzd1CwgAzqWYb/48SdW6VKlRfZQqBf/fr1a2NULxUOw7qlmSWlGjRokGr5VahQ4YXExMQ5OCAcD8YhgJUJ9pLGn3r37l3VUzdGhREBERABERABERABERABERABERABERABERABERABERABERABERABERABERABfwlgTI9JS0u7oEyZMt8HajxnFv1JDP8/YDx/vnr16he0b98+JRxGf3/qYvn26dMnuXbt2t1YJeAZHAJ+oHzHieu3Q4PVPykpaXaNGjUuLqp6+FNXXSMCIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACeQgMHz68NDP3H4qPjz/ASb+N5cy2P8oS+uNq1ap1ra0g4EWDefPmzSvi3HAlRv2PcQY4HEj9uP4gqyI8NmjQoLJ5oOmACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACHiNQKtWrVIx5L8dExPjt/HfjOmsGDC2Tp06F40cOTLOa3VyKs+YMWNK2SoFKSkpH7Dk/wF/VzvA0eE0cT5q0aJFfad0dUwEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEipyAzdrPWv5/EYXxywEA4/8RDOIfMvO/M/FjirwSQRSAcpdidYCO1GMk9TnkT93NYYBtBVayPcAlXlztIAgMiiICIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIlBcCJghOzU19YaEhIRt1KlABwCbDV+uXLlpdevWvWzy5MmxxYGDOTHUq1evF/Wa5O8qCKwgsAtut1jc4sBAdRABERABERABERABERABERABERABERABERABERABERABERABERABERABEYhwAmbArlSp0gPMgj9KVQp0AGDZ/03VqlX7Va9evVIivOqOxe/bt28Z6ndr2bJl1/izRQAOEUcqVqz4WPv27SNiGwTHSuugCIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIhA5BMYMWJETFJS0gMYsk9Rm3wdAGx2PEvmf9GiRYsOtnJA5Nfedw2sfs2aNWteoUKFMbbqQUFscBbIrFy58jPwLOM7VZ0RAREQAREQAREQAREQAREQAREQAREQAREQAREQAREQAREQAREQAREQAREQgTARGDNmTHz16tWfwoBdoAMAqwTsZbb7H2yWfJiK48lkn3/++dIw+g3L/he4TQKMTrOiwgu9e/cu68nKqFAiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIALFk4CtAJCcnPxHM1xTw3wlMTFxWb169XoV99n/vu601bt+/fpd2B5gQUGsbLWEqlWrjtKKAL5o6rgIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiICrBDBqx7DM/QMYrPNdAYAVAk6XK1fuv82bN2/magEiNDG2QaiP48REM/RTBZ9i2wewxcITrLRQKkKrqmKLgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAhEAgFzAKhZs+YdrABQoAMAjgLvdO3atUok1KuwytinTx/8AJJfLMgRwBws4He/8S6ssikfERABERABERABERABERABERABERABERABERABERABERABERABERABERCBEkagbt26V8fHx++j2vnOZGcFgJf69u1bpoTh8au63bt3T6hWrdrzcMzIjyOOFodwuLjethPwK2FdJAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAL+EkhLS+uekJCwg+t9OgDExcWdql279h+HDx9e2t90S+J1n3/+eenKlSv/hhn/R/LjiaPArjp16lxUEhmpziIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAmEi0LNnz2ply5adRfI+HQAwaGdUqVLlOWaux4apGMUuWVYEeLxUqVL5rgiQmJj4Y+PGjdOLXeVVIREQAREQAREQAREQAREQAREQAREQAREQAREQAREQAREQAREQAREQAREQgcInMGLEiPjy5cu/ER0dnZ8DQCZ73T9rS90XfgkjN0djm5KS8mdzoKAWjnyNO9eM7d+/f7nIralKLgIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiUOQEbD96lq2/J7/Z6makxgHgLYzUiUVe4AgsgDkCVKxY8bWCnCyqVq16r92PCKyiiiwCIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIuAFAvXr128RFxe3jbI4zlK34yxX/99zzjmnuhfKG6ll6NKlS9WkpKRv8nMESEhI2NqkSZMukVpHlVsEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAERKAICfTt27cM2wCMK8Awvb5p06YtirCYxSZrDPyNMPQvokI+HS5wFPi+ffv2lYtNpVURERABERABERABERABERABERABERABERABERABERABERABERABERABERCBwiHA8vPD8tsGgBUCDtepU6d/4ZSmZOSSmpp6FVwPUFtHR4CYmJjMSpUq/U7bApSM50G1FAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAFXCNSuXbt+fHz8GhLzZYw+Xbly5acwRse4kqESOUPAeGLk/y3G/gxf7EuXLr2hQYMGzYVMBERABERABERABERABERABERABERABERABERABERABERABERABERABERABAokYIboChUqPJnfNgCJiYnfX3zxxRULTEwXBEzgvPPOS0pOTp5AxDMOGDgEnDax+5H9yfnRI0aM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3ybXT0lJyZiampozfJWVpRu+6N+//2e+9ut2JaAElIASUAJKQAkoASWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJdCRCfyYygXrBeC1jgxG6xY4gf79u33HyVrzxPQxW96+q1evnAvYH5XLAvTs2bMXM/5X+aofM9APZWZmXtWO9bN065Z5aWys/aCvMjpjHVv79887lf1RGQoKCk7jHGyl8F6vMc5BaV5e3veisnJaaCWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAJKQAkoASUQIgHxlPYJEqwRwKgQ89foHYyAe8oUW2ZG8jMWa+Nsea9K2rSUhDnDh/fqGq1Vz8jImGi1Wl2U32v9WIt+Ga7oe7dH/fr16949MTHOp5t8q9XiyspK/YPbXRyVXhL79evXKTU19R28MXhlL14a2P9ccXFxbHvw1zyVgBJQAkpACSgBJaAElIASUAJKQAkoASWgBJSAElACSkAJKAEloASUQHsTuJACBGsAMJu4UalIbG/oHT3/fv3yh8Y5HZupp1dFrc1mbeicmf7w+PEXyVIUUReKioryExISFlJwr/UTBXVycvLf+vbtmxzJyg29JDehS1bakxgoyHIFXssWHx+7bMiQ9jFQCJXF0KFDHXhZmGiz2Wp81c/hcGxhGYCTQs1L4ysBJaAElIASUAJKQAkoASWgBJSAElACSkAJKAEloASUgBJQAkpACSiBaCXwTwoerBHAddFaaS13eAm43TGW7Oz0W5h17ltZa7eV4rb+qtGjY2zhLU14Uu/atesPUUZXkLpXZTuK+Go8BvxK1q8PTwmOTnXEiBh7TpfUXzgc9sO+ymS32aryctLHud3uaFyKwdqpU6fLUPLv9lU/mNd17tz5niit39EnVP8pASWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAJKQAkogSAInEKcYA0AVhA3JYg8NcpxQmDUqB6pycnx78bE+F4WID7eubpXr8a16aNOKT1+/HgnbuefZ9Z/W8sC7MzJybmAUx5ujxnWnj1zz4iLi11PXl6NEiyWGFdmRsqU0aOHpkbhJWgpKCjoj/eFb3zVj+0NcXFxH5911lk5UVg/LbISUAJKQAkoASWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASMITA86QSrBHAfYaUQBPp0AT698871emM3U4lfSmm3UlJcXN69ercMxpBDBgwoKfT6Vzkq36ynf1Lc3NzT+R3uAwdLD17dhuAwcUcWYbAV1kwEFhx4ol9BrM/6gLLKuSmpKT8q636xcbG7sjOzj476iqnBVYCSkAJKAEloASUgBJQAkpACSgBJaAElIASUAJKQAkoASWgBJSAElACBhHoTTrBGgBIvKhU2hrETpPxk4DbXWzN6ZJ2q91urSaKVwW1KHbT05NfGTmyXyc/kzXNYeJ2HsXzFXa7vbSt+iUmJr7Xp0+fPI4x3BBg8OCueWkpCdPaUpDDv6JbbsbPo9FNPgYAyRgA/IWlFxp8MWYZgFqWXriX+oXb44Jprj0tiBJQAkpACSgBJaAElIASUAJKQAkoASWgBJSAElACSkAJKAEloASUgBJoSeBhNgRrBPByy8T0vxLwReDSM/omZ2Qkv2Btw22+3W6rz+qU8kT37mlpvtIx6/bi4mI7a9U/JIpoyujV0IF9DUlJSa8PHz68q5H1GNSzZ+fMzNS/Wq2+l1zAOKAuPTXpr5deekaykXlHIq1Ro0aldu7ceRIGAJW+2LLdBdupRUVF2ZEok+ahBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAJKQAkoASWgBMxIoAuFWoMEawRwjhkrpWUyL4GhQ4vykxMTvqaEbczmttR26pRy/9VXD08xb028l+yCCy7IQBH9Dgp3F0f4MgRwp6Wlvdy1a9cMjgnZI0B+fn56YqLjcbvNWucrT7Y3JCfHTR82oGc3fkdbiGd2/924+a+i4F6Zsr0hISFhQe/evftHW+W0vEpACSgBJaAElIASUAJKQAkoASWgBJSAElACSkAJKAEloASUgBJQAkrASAJ3kliwBgCfEjdkBaaRldG0ooNAz+5ZF7Iu/TZK60uh646NtZfnZmcUD8xPTY+OWv23lD179hzqdDqXsMWnoQNGArUsDfDYueeeG9LSAL16ZWelJcX93maz+FxmQcrhdDrWnHBC1+Egj6p79owzzkjGqGICvA5SD5/XC8sw7OrSpcsl0bjMwX+vHP2lBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAJKQAkoASWgBEIjIC7BlyHBGgGMCS17jX28EhBFbff8rJ85HLb9MPCp2LXZrFWpyc5Hhw7tk8lxUaW8zsvLGxkXFyf3Vhv1s7kyMzPfGjRokCwNEGj9LMOGFWV3zkx/xmqNaWuGvNsZa9uZn591pdsdcB4Uq92CRTwcZGVlPYCC/xClaIvjAY67WQ0A2u1cacZKQAkoASWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAImITCWcgRrALCcuEkmqYcWIwoJTJky2padnXG33d7mGu9uXNzXZnZKebpv34JCqmmNlqqKQjonJ+dq1rDfR5l9KrCtVqs7JSXlre7du/fjOJuf9bMOGtS3MC0tcTLp+1x2QPKF38FuuZ1EQR417Ci3tVu3brlweYL6teXhwA2/SpZWuGv06NGxfrLTw5SAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAJKQAkoASWgBJRAhyQgCjNZlz1YI4B7OyQVrVRECVx66RnJKSlx91qtlgoybkNRbqlPTIybnp+fOZTgiGghQ8isuLjYnpqaeoPD4Shru35Wd3x8/Bddu3YdUVRU1LYym/oX5GacnpKUMBMFeENb6bJEwMEuXVL/d/z4i5whVCPSUW2FhYWDWQJgKvWrbbt+thoMAB6DmRokRfosaX5KQAkoASWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAKmIzCaEgVrACDxZFa2BiUQMoERI4qScnM6MeO7bYUvGbkTEmLn9SjI+u5pXbvGh5xxhBIYP368E+X+Pbi0L5c6tCUsH7CKde1/zPFSv5bLA1hOO+20+K5dO/0gMcG53GKxtJkWBgDlKSmx955xRl9Z9iMqQq9evZwso3BuQkLCHPGQQKF9CvWvTk9Pf/aSSy6RpSI0KAEloASUgBJQAkpACSgBJaAElIASUAJKQAkoASWgBJSAElACSkAJKIHjmoAoF2ciwRoBvHhc09PKG05g7I9HZOZ0yfyb3db20gBk7I6Li92S1Sn5tz17dunMf3/d5xte5kASRFGdkJmZeTceAUqlDm0JxgJ7kpOTH+zRo0d+szxsRUW5+Z07p90THxe7o634sg/PCmVpaQn3RZEBAMsbDOoMo4mxsbFrjlU/WSKApQL+MmDAgC7NGOlPJaAElIASUAJKQAkoASWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJXDcEhhFzYM1AJB4Zx635LTiYSMwduzo1LSUhGI8AhxzxjzHVKemJk7p0yf/zCb3+S1nzYetnMEm/OSTT8os94nMcN9NGg2IL2OAeqfTuQ+X+Nds27YtfuzYSxL69eo6IiUl4d92u62ujXiN6TnstgOZGUn3XDI0NyHYskYynpy/nJycoRg+vIwBROWx6ocHgIpOnTo9MXr06IxIllPzUgJKQAkoASWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAJmJvA2hQvWCOAVM1dMyxbdBIaiuGaW/wMOh62EmrSlKJfZ7u7EROeq7Oz0G4uKeuQPHRrjMHvtUVzbcGF/C7Pdt1NWF9LcEKCeGe6l8fHxn2VkZIw95ZRTOo0efUlh9+65v0mMd649lvt/4WW3W3flZnf69U03jU4yOwvKZy8oKMiRulLnRf7Vz16Wmpr60NChQ1OjoH5aRCWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAJKQAkoASUQEQInkkuwBgCLiNs9IqXUTI5bAmPGjIjr3q3zjU6nYwsQWirKmyvNG3+j+K5ISoqbmZ+ffcWQId3TiGPqJQLcbre1a9eu32e2/1LKWi/CDPgyFOGf4g7/Fyee2Dd3yJAhafl52VcmJSZ8IF4POKZVvVtsq2eZhHV5eZ1++llxsZ19Zg42UeJT1+8lJSW9i+HDMT0/UBkXjLZ17tx54vnnn59o5spp2ZSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAJKQAkoASWgBJRApAn8jQyDMQKYTrxBkS6s5nd8EnAXF1sLunb6fkJ87Fxm/NdA4VhKcDfeA/ZlpCW/hGeAiwcMKOzSq1cvJ/FMuUwAhgCW3NzcM3GBPz0xMXE67vDHDh8+vOuwYUXZPXrkXZySnPxSbKzjoMVy7HrDpxpPAbMLu2WcX+wutpr0ipHz4OCcZOHKfySz+f+KEcQeP2b/uzmmBs8JC1hK4cpi8xs4mBS/FksJKAEloASUgBJQAkpACSgBJXD8ETDlgMDxdxq0xkpACSgBJaAElIASUAJKQAlEgIC4S78B8XemtMxS3ovIjOz5iChiNSiBiBE4c2hR/upNW28pLasYW+9qSCHjNt/hURjHIGVJSQnLEpyOt7PzUt8vLY3ZvXnz5lriyvICpgqXX355WlFRUeLCL7+MX7p65XkVFYd/Ul1dO7i+3pWMocCxyuqOjbWXpiYnPt0lx/nUt9/u3XOsCO2w34ri30HI3rNnz8jq6urRtbW1w10uV7o/9cNLAOcy6Y0uXbo8tmbNmk1NRgPtUA3NUgkoASWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAJKQAkoASWgBAwhMHr0afE5nVPHsTzAaiwA6kj0mF4B5Bib1VqZlBT/VadOyb/r2TNn6PDhvVKavAO092x5yT+Wmf8pffp0G4YL/9+lJCcsROFd5W/dUIbXxsU5V/fpVXj9k08+mHXuuef2zM/PT5d0ETPUzzFo0KDEwsLCwbj9vzUhIeEL3Pn74/bfc27rmP2/Eff/Nwon6qRBCSgBJaAElIASUAJKQAkoASWgBJRAQATanEUQUEp6sBJQAkpACSgBJaAElIASUAJKQAkoASVgOAFxn9+3R86wPSXlv6qorL6UmfLxZOKXsttmszY47Pb1sU7HIofDglFA6hdOp21refnWqs2bG40KxEPAMafdh1ApGXewdu/e3ZGWFhPnctl6lpSUnn74UOVptfWuYXV19T1crga/6kI6DXa77TCz4/+empr2l379cjcvXrzhusrKyqvq6+s3sH1eWlraZ1VVVVuYfV+BBwQxmohI/cjHhpFFHOcq//Dhw6cjp9XV1Z3MrP++iHgh8Sc0YOBQjdHAeykpKX/ZuXPnl/w3nQcHfyqixygBJaAElIASUAJKQAkoASWgBJRA+xJQI4D25a+5KwEloASUgBJQAkpACSgBJaAElIAS8IvAiBFD0tas2fKjQ2XVN1RVVRc1uN12Ivr1Xs9KAbJUQDUu9Hfb7dbFTod9fnJqyhJm4K/v0ydv74xV82qLEmMaVqyIcZGmZ0Z6IMYBUg6PWLujFB906RmOFSu2dLFYXD3LDh4+qbqm9uT6evfQ2rr67IYGt9MPl/gk2RjcVqu1Li4udhnK8afOOuvsf86bNy+/tLT0bpTt329oaHDKUXIMM+53UKdvExMTF8TFxS0gjw39+/ffs379+hqMAqRuHqMATx0bM/Djw1M3z7d1xIgRsZs2bcqCa8GhQ4dOqqmpGYrC/2SU//l8x/mRZvND6pxO5xrK/XxeXt4ry5cvP9h8p/5WAkpACSgBJaAElIASUAJKQAkoASUQCAF5edWgBJSAElACSkAJKAEloASUgBJQAkpACUQBAbc7xlJUVDBkz56DYw8frrq4pqYum2L7O9P8SA1tNosLpfn+uFjHFpvdutxmdWxKTHZui6l37bTEWA44EqxlBQWdD2dkZFdPnfpxbVPE5kYBjeMJF110kcPl2hG3f8eBlJKD1SnVLne6y1WX7apz5VPUHq4G1+Damtpu9a6GLJfLbTtSAP9/oByP3ZGQ4Px71645L6Smdt6zcuXKHzDb/6bq6uqTfBkSYAggs+r34RFgJ4YBS/jezP9NuNnfS9YlzLYvxVV/eUZGRtWMGTPEY4CE5vWT/7AusqGYd6LkTy4vL09F0Z9BOp3JO590C/FAMJBthSj9qZ9LliMINIjhwj4MFv7dqVOnZzBUWEL6Ovs/UIp6vBJQAkpACSgBJaAElIASUAJKQAkcRUCNAI7CoX+UgBJQAkpACSgBJaAElIASUAJKQAmYn8D48Rc5Z7y3+NRd+w5cz+z6C2pr69NRiItngKACywaIArzKarFUYhRQhueAEqvFehBDgfJYh7UmxmovLysrP+SwxVjqXDHutJTk1Bh3Q2JVbV0s+aaiL89wNzRkoBRPcTW4EzAkSGCGvqWlVj2AwtVRppKsTukf9enX97WuXbsv+PTTTwdXVFSMx/3/dwOdaU89JOtKvqtQuh8SAwGklLKXoYCvoazo+MvLmY1vIW03RgROlP8Z5CdMUxDhm8m+NESWY0jkvxXhZ+CBvOvJQ/L+gHxe6tGjx1dz586tCjwljaEElIASUAJKQAkoASWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAIdhsCgQV0Si/p2uzQjLfnvdrttJ8p7mbXf0uW9aKqDFqvVgjv+Rn2+m/Qb02m+LZS0W8SV2fu1zlj7zsTE2FczMhIv/PnPL01G0Z561llnjWT2/lco8WuMr5+Vennq999v8gqaWYt6edJprB9GCLtSU1P/mZ+ff8WoUaMwoNCgBJSAElACSkAJKAEloASUgBJQAkrAWALqCcBYnpqaElACSkAJKAEloASUgBJQAkpACSiBiBJwx7gtgwYWpJWUHD65uqr2h5WVtaNqa+vyGtxuWSYgGBf8ES0/mbE0gaXOYbdvSUh0fpqWlvBORkbd/EWLDpZ5CjJixIi0FStWDGAW/uWHDx++EI8DPZi9L+73o6R+Vpn5z7IGCZ/Fx8f/Iy8vb8HChQtLmowPPNXUbyWgBJSAElACSkAJKAEloASUgBJQAkpACSgBJaAElIASUAJKQAkoASWgBJSAElAC/yUwZsyIuN6984Z06ZT626Sk+DkOu20fCvZqjqhHPDPSzfBdjwK8Gu8F+xITnR9nZaX+ZkDfroOKi0eLYt9nmDJliq2goKB/enr6DSjU35dZ9czY99TPUA8IFCIUTo31Q/FfgtJ/dmZm5j2U+6QxY8bE+ayc7lACSkAJKAEloASUgBJQAkpACSgBJWAQAfUEYBBITUYJKAEloASUgBJQAkpACSgBJaAElIBZCLjdxdaTTnq525495YPq6upOq66uP72mprpvfb07jRn0MntexBrB8oqCXmb8I9ZSp9OxwmJp+DwxMfGb7t07Lfn663U7ApkVzxIBloEDB3YuKSkZUlNTc0ptbe0Z1dXVA6hbp3asn7j7r6d+ZXFxcWtiY2O/4nt+WlraNytXrtwaSP0ieF40KyWgBJSAElACSkAJKAEloASUgBLogATUCKADnlStkhJQAkpACSgBJaAElIASUAJKQAkoAQ+B4uJi+/tTJ2eWVdb0Li2vPLWyumawq65hQL3LlcuSASkuV4MYA8j4gOc7lLGC5rPnG2w2i4vZ/uXMiN/lcNhXOGy2+SlJzoUJKZZ1y5fv3WuxNM629xQ1qG/qZ33vvfcy9uzZ07OqquoUjAEGs2zAEJYM6EqCqXxLvTwidTOwfjYxbjhE/XY6HI5VKP6/wbBhPh4K1jDrfz9lEw8MGpSAElACSkAJKAEloASUgBJQAkpACUSUQCgvvhEtqGamBJSAElACSkAJKAEloASUgBJQAkpACYRGwO2OsZx8co+UAwcOZVsbrCccOlxzQnVtTbeYhphu9Q0NWa76hpQYtzs1xmpNdbnq7ejLHRgJ+MzUZhPdekytzWqtj7G4D6FrL7NZLaWOWMdBvOlvZvb75pzO6esaLA0r8/Nzdn300cJD4Z4RP2LEiKQVK1Zks1xA38rKygEVFRXdyLMAw4BMJAUvAun8T8FjgIOyx7KtjfqJw4SYWmb3u4hXRrwyFP5l/N+PbHM6ndtQ/IvyfxVLFOxavHix1M83MJ856Q4loASUgBJQAkpACSgBJaAElIASUALGEVAjAONYakpKQAkoASWgBJSAElACSkAJKAEloASiioAYBTw14aLYZz5dnpgal5a+/8D+ThVV9VnVdfUZvXvlD3bXl1+6ePlmS22tTPA/OsSiQj95aG+3yxX7j/Ubt62Ii4s9mJiYvC8xMWaPw+E8/D/DCw9PeGp6LYYErSMfnVTY/smyAf+/9PR0luPHj/MATwTgA16NIAQ8KUACiAXl5OTUgLv2Q86cOcMOPEEAww3AyX4GQ0ND0PH+m+7evXsZuNP/HR8f3xvgEf+vgdcQfAoKCvoyadKkX8BJ/wHzH4ajRwVGQ2A0BEZDYDQERkNgNARGQ2A0BEZDYDQERkNgNARGQwAYAgCcX+jJHTcWnQAAAABJRU5ErkJggg==";

var css_248z$3 = ".branding img {\n  max-width: 130px;\n}\n";
styleInject(css_248z$3);

/**
 * Component responsible for displaying Unum ID branding.
 */
var Branding = function () { return (React__default["default"].createElement("a", { className: "branding", target: "_blank", rel: "noopener noreferrer", href: "https://unumid.org" },
    React__default["default"].createElement("img", { alt: "Powered by Unum ID", src: img }))); };

var uaParser = createCommonjsModule(function (module, exports) {
/////////////////////////////////////////////////////////////////////////////////
/* UAParser.js v1.0.2
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License *//*
   Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
   Supports browser & node.js environment. 
   Demo   : https://faisalman.github.io/ua-parser-js
   Source : https://github.com/faisalman/ua-parser-js */
/////////////////////////////////////////////////////////////////////////////////

(function (window, undefined$1) {

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '1.0.2',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major',
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded',
        UA_MAX_LENGTH = 255;

    var AMAZON  = 'Amazon',
        APPLE   = 'Apple',
        ASUS    = 'ASUS',
        BLACKBERRY = 'BlackBerry',
        BROWSER = 'Browser',
        CHROME  = 'Chrome',
        EDGE    = 'Edge',
        FIREFOX = 'Firefox',
        GOOGLE  = 'Google',
        HUAWEI  = 'Huawei',
        LG      = 'LG',
        MICROSOFT = 'Microsoft',
        MOTOROLA  = 'Motorola',
        OPERA   = 'Opera',
        SAMSUNG = 'Samsung',
        SONY    = 'Sony',
        XIAOMI  = 'Xiaomi',
        ZEBRA   = 'Zebra',
        FACEBOOK   = 'Facebook';

    ///////////
    // Helper
    //////////

    var extend = function (regexes, extensions) {
            var mergedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    mergedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    mergedRegexes[i] = regexes[i];
                }
            }
            return mergedRegexes;
        },
        enumerize = function (arr) {
            var enums = {};
            for (var i=0; i<arr.length; i++) {
                enums[arr[i].toUpperCase()] = arr[i];
            }
            return enums;
        },
        has = function (str1, str2) {
            return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
        },
        lowerize = function (str) {
            return str.toLowerCase();
        },
        majorize = function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split('.')[0] : undefined$1;
        },
        trim = function (str, len) {
            if (typeof(str) === STR_TYPE) {
                str = str.replace(/^\s\s*/, EMPTY).replace(/\s\s*$/, EMPTY);
                return typeof(len) === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
            }
    };

    ///////////////
    // Map helper
    //////////////

    var rgxMapper = function (ua, arrays) {

            var i = 0, j, k, p, q, matches, match;

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length === 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length === 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
                                    }
                                } else if (q.length === 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
                                }
                            } else {
                                this[q] = match ? match : undefined$1;
                            }
                        }
                    }
                }
                i += 2;
            }
        },

        strMapper = function (str, map) {

            for (var i in map) {
                // check if current value is array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined$1 : i;
                        }
                    }
                } else if (has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined$1 : i;
                }
            }
            return str;
    };

    ///////////////
    // String map
    //////////////

    // Safari < 3.0
    var oldSafariMap = {
            '1.0'   : '/8',
            '1.2'   : '/1',
            '1.3'   : '/3',
            '2.0'   : '/412',
            '2.0.2' : '/416',
            '2.0.3' : '/417',
            '2.0.4' : '/419',
            '?'     : '/'
        },
        windowsVersionMap = {
            'ME'        : '4.90',
            'NT 3.11'   : 'NT3.51',
            'NT 4.0'    : 'NT4.0',
            '2000'      : 'NT 5.0',
            'XP'        : ['NT 5.1', 'NT 5.2'],
            'Vista'     : 'NT 6.0',
            '7'         : 'NT 6.1',
            '8'         : 'NT 6.2',
            '8.1'       : 'NT 6.3',
            '10'        : ['NT 6.4', 'NT 10.0'],
            'RT'        : 'ARM'
    };

    //////////////
    // Regex map
    /////////////

    var regexes = {

        browser : [[

            /\b(?:crmo|crios)\/([\w\.]+)/i                                      // Chrome for Android/iOS
            ], [VERSION, [NAME, 'Chrome']], [
            /edg(?:e|ios|a)?\/([\w\.]+)/i                                       // Microsoft Edge
            ], [VERSION, [NAME, 'Edge']], [

            // Presto based
            /(opera mini)\/([-\w\.]+)/i,                                        // Opera Mini
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,                 // Opera Mobi/Tablet
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i                           // Opera
            ], [NAME, VERSION], [
            /opios[\/ ]+([\w\.]+)/i                                             // Opera mini on iphone >= 8.0
            ], [VERSION, [NAME, OPERA+' Mini']], [
            /\bopr\/([\w\.]+)/i                                                 // Opera Webkit
            ], [VERSION, [NAME, OPERA]], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,      // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,               // Avant/IEMobile/SlimBrowser
            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,                                  // Baidu Browser
            /(?:ms|\()(ie) ([\w\.]+)/i,                                         // Internet Explorer

            // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i,
                                                                                // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
            /(weibo)__([\d\.]+)/i                                               // Weibo
            ], [NAME, VERSION], [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i                 // UCBrowser
            ], [VERSION, [NAME, 'UC'+BROWSER]], [
            /\bqbcore\/([\w\.]+)/i                                              // WeChat Desktop for Windows Built-in Browser
            ], [VERSION, [NAME, 'WeChat(Win) Desktop']], [
            /micromessenger\/([\w\.]+)/i                                        // WeChat
            ], [VERSION, [NAME, 'WeChat']], [
            /konqueror\/([\w\.]+)/i                                             // Konqueror
            ], [VERSION, [NAME, 'Konqueror']], [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i                       // IE11
            ], [VERSION, [NAME, 'IE']], [
            /yabrowser\/([\w\.]+)/i                                             // Yandex
            ], [VERSION, [NAME, 'Yandex']], [
            /(avast|avg)\/([\w\.]+)/i                                           // Avast/AVG Secure Browser
            ], [[NAME, /(.+)/, '$1 Secure '+BROWSER], VERSION], [
            /\bfocus\/([\w\.]+)/i                                               // Firefox Focus
            ], [VERSION, [NAME, FIREFOX+' Focus']], [
            /\bopt\/([\w\.]+)/i                                                 // Opera Touch
            ], [VERSION, [NAME, OPERA+' Touch']], [
            /coc_coc\w+\/([\w\.]+)/i                                            // Coc Coc Browser
            ], [VERSION, [NAME, 'Coc Coc']], [
            /dolfin\/([\w\.]+)/i                                                // Dolphin
            ], [VERSION, [NAME, 'Dolphin']], [
            /coast\/([\w\.]+)/i                                                 // Opera Coast
            ], [VERSION, [NAME, OPERA+' Coast']], [
            /miuibrowser\/([\w\.]+)/i                                           // MIUI Browser
            ], [VERSION, [NAME, 'MIUI '+BROWSER]], [
            /fxios\/([-\w\.]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, FIREFOX]], [
            /\bqihu|(qi?ho?o?|360)browser/i                                     // 360
            ], [[NAME, '360 '+BROWSER]], [
            /(oculus|samsung|sailfish)browser\/([\w\.]+)/i
            ], [[NAME, /(.+)/, '$1 '+BROWSER], VERSION], [                      // Oculus/Samsung/Sailfish Browser
            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [
            /(electron)\/([\w\.]+) safari/i,                                    // Electron-based App
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,                   // Tesla
            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i            // QQBrowser/Baidu App/2345 Browser
            ], [NAME, VERSION], [
            /(metasr)[\/ ]?([\w\.]+)/i,                                         // SouGouBrowser
            /(lbbrowser)/i                                                      // LieBao Browser
            ], [NAME], [

            // WebView
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i       // Facebook App for iOS & Android
            ], [[NAME, FACEBOOK], VERSION], [
            /safari (line)\/([\w\.]+)/i,                                        // Line App for iOS
            /\b(line)\/([\w\.]+)\/iab/i,                                        // Line App for Android
            /(chromium|instagram)[\/ ]([-\w\.]+)/i                              // Chromium/Instagram
            ], [NAME, VERSION], [
            /\bgsa\/([\w\.]+) .*safari\//i                                      // Google Search Appliance on iOS
            ], [VERSION, [NAME, 'GSA']], [

            /headlesschrome(?:\/([\w\.]+)| )/i                                  // Chrome Headless
            ], [VERSION, [NAME, CHROME+' Headless']], [

            / wv\).+(chrome)\/([\w\.]+)/i                                       // Chrome WebView
            ], [[NAME, CHROME+' WebView'], VERSION], [

            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i           // Android Browser
            ], [VERSION, [NAME, 'Android '+BROWSER]], [

            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i       // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /version\/([\w\.]+) .*mobile\/\w+ (safari)/i                        // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [
            /version\/([\w\.]+) .*(mobile ?safari|safari)/i                     // Safari & Safari Mobile
            ], [VERSION, NAME], [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i                      // Safari < 3.0
            ], [NAME, [VERSION, strMapper, oldSafariMap]], [

            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape\d?)\/([-\w\.]+)/i                              // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /mobile vr; rv:([\w\.]+)\).+firefox/i                               // Firefox Reality
            ], [VERSION, [NAME, FIREFOX+' Reality']], [
            /ekiohf.+(flow)\/([\w\.]+)/i,                                       // Flow
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)/i,                                            // Other Firefox-based
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,                         // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
            /(links) \(([\w\.]+)/i                                              // Links
            ], [NAME, VERSION]
        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i                     // AMD64 (x64)
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32 (x86)
            ], [[ARCHITECTURE, 'ia32']], [

            /\b(aarch64|arm(v?8e?l?|_?64))\b/i                                 // ARM64
            ], [[ARCHITECTURE, 'arm64']], [

            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i                                   // ARMHF
            ], [[ARCHITECTURE, 'armhf']], [

            // PocketPC mistakenly identified as PowerPC
            /windows (ce|mobile); ppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i                            // PowerPC
            ], [[ARCHITECTURE, /ower/, EMPTY, lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, lowerize]]
        ],

        device : [[

            //////////////////////////
            // MOBILES & TABLETS
            // Ordered by popularity
            /////////////////////////

            // Samsung
            /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]], [
            /\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,
            /samsung[- ]([-\w]+)/i,
            /sec-(sgh\w+)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]], [

            // Apple
            /\((ip(?:hone|od)[\w ]*);/i                                         // iPod/iPhone
            ], [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]], [
            /\((ipad);[-\w\),; ]+apple/i,                                       // iPad
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ], [MODEL, [VENDOR, APPLE], [TYPE, TABLET]], [

            // Huawei
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]], [
            /(?:huawei|honor)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]], [

            // Xiaomi
            /\b(poco[\w ]+)(?: bui|\))/i,                                       // Xiaomi POCO
            /\b; (\w+) build\/hm\1/i,                                           // Xiaomi Hongmi 'numeric' models
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,                             // Xiaomi Hongmi
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,                   // Xiaomi Redmi
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i // Xiaomi Mi
            ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, MOBILE]], [
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i                        // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, TABLET]], [

            // OPPO
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
            ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [

            // Vivo
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [

            // Realme
            /\b(rmx[12]\d{3})(?: bui|;|\))/i
            ], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [

            // Motorola
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]], [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]], [

            // LG
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
            ], [MODEL, [VENDOR, LG], [TYPE, TABLET]], [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
            ], [MODEL, [VENDOR, LG], [TYPE, MOBILE]], [

            // Lenovo
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

            // Nokia
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [

            // Google
            /(pixel c)\b/i                                                      // Google Pixel C
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]], [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i                         // Google Pixel
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]], [

            // Sony
            /droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ], [MODEL, [VENDOR, SONY], [TYPE, MOBILE]], [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
            ], [[MODEL, 'Xperia Tablet'], [VENDOR, SONY], [TYPE, TABLET]], [

            // OnePlus
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            // Amazon
            /(alexa)webm/i,
            /(kf[a-z]{2}wi)( bui|\))/i,                                         // Kindle Fire without Silk
            /(kf[a-z]+)( bui|\)).+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]], [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i                     // Fire Phone
            ], [[MODEL, /(.+)/g, 'Fire Phone $1'], [VENDOR, AMAZON], [TYPE, MOBILE]], [

            // BlackBerry
            /(playbook);[-\w\),; ]+(rim)/i                                      // BlackBerry PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i                                                    // BlackBerry 10
            ], [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]], [

            // Asus
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, TABLET]], [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]], [

            // HTC
            /(nexus 9)/i                                                        // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,                         // HTC

            // ZTE
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i         // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            // Acer
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            // Meizu
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [

            // Sharp
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, MOBILE]], [

            // MIXED
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                                                                                // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp) ([\w ]+\w)/i,                                                 // HP iPAQ
            /(asus)-?(\w+)/i,                                                   // Asus
            /(microsoft); (lumia[\w ]+)/i,                                      // Microsoft Lumia
            /(lenovo)[-_ ]?([-\w]+)/i,                                          // Lenovo
            /(jolla)/i,                                                         // Jolla
            /(oppo) ?([\w ]+) bui/i                                             // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /(archos) (gamepad2?)/i,                                            // Archos
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,                             // HP TouchPad
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(nook)[\w ]+build\/(\w+)/i,                                        // Nook
            /(dell) (strea[kpr\d ]*[\dko])/i,                                   // Dell Streak
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,                                  // Le Pan Tablets
            /(trinity)[- ]*(t\d{3}) bui/i,                                      // Trinity Tablets
            /(gigaset)[- ]+(q\w{1,9}) bui/i,                                    // Gigaset Tablets
            /(vodafone) ([\w ]+)(?:\)| bui)/i                                   // Vodafone
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(surface duo)/i                                                    // Surface Duo
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]], [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i                                 // Fairphone
            ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [
            /(u304aa)/i                                                         // AT&T
            ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [
            /\bsie-(\w*)/i                                                      // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [
            /\b(rct\w+) b/i                                                     // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [
            /\b(venue[\d ]{2,7}) b/i                                            // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [
            /\b(q(?:mv|ta)\w+) b/i                                              // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i                       // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [
            /\b(tm\d{3}\w+) b/i
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [
            /\b(k88) b/i                                                        // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [
            /\b(nx\d{3}j) b/i                                                   // ZTE Nubia
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
            /\b(gen\d{3}) b.+49h/i                                              // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [
            /\b(zur\d{3}) b/i                                                   // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [
            /\b((zeki)?tb.*\b) b/i                                              // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i                                // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [
            /\b(ns-?\w{0,9}) b/i                                                // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [
            /\b((nxa|next)-?\w{0,9}) b/i                                        // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i                  // Voice Xtreme Phones
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [
            /\b(lvtel\-)?(v1[12]) b/i                                           // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [
            /\b(ph-1) /i                                                        // Essential PH-1
            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [
            /\b(v(100md|700na|7011|917g).*\b) b/i                               // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [
            /\b(trio[-\w\. ]+) b/i                                              // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [
            /\btu_(1491) b/i                                                    // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [
            /(shield[\w ]+) b/i                                                 // Nvidia Shield Tablets
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [
            /(sprint) (\w+)/i                                                   // Sprint Phones
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, MICROSOFT], [TYPE, MOBILE]], [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i             // Zebra
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]], [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]], [

            ///////////////////
            // CONSOLES
            ///////////////////

            /(ouya)/i,                                                          // Ouya
            /(nintendo) ([wids3utch]+)/i                                        // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [
            /droid.+; (shield) bui/i                                            // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [
            /(playstation [345portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]], [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i                                // Microsoft Xbox
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]], [

            ///////////////////
            // SMARTTVS
            ///////////////////

            /smart-tv.+(samsung)/i                                              // Samsung
            ], [VENDOR, [TYPE, SMARTTV]], [
            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, SAMSUNG], [TYPE, SMARTTV]], [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i        // LG SmartTV
            ], [[VENDOR, LG], [TYPE, SMARTTV]], [
            /(apple) ?tv/i                                                      // Apple TV
            ], [VENDOR, [MODEL, APPLE+' TV'], [TYPE, SMARTTV]], [
            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, CHROME+'cast'], [VENDOR, GOOGLE], [TYPE, SMARTTV]], [
            /droid.+aft(\w)( bui|\))/i                                          // Fire TV
            ], [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]], [
            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,                          // Roku
            /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i               // HbbTV devices
            ], [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]], [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i                   // SmartTV from Unidentified Vendors
            ], [[TYPE, SMARTTV]], [

            ///////////////////
            // WEARABLES
            ///////////////////

            /((pebble))app/i                                                    // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [
            /droid.+; (glass) \d/i                                              // Google Glass
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]], [
            /droid.+; (wt63?0{2,3})\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]], [
            /(quest( 2)?)/i                                                     // Oculus Quest
            ], [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]], [

            ///////////////////
            // EMBEDDED
            ///////////////////

            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i                              // Tesla
            ], [VENDOR, [TYPE, EMBEDDED]], [

            ////////////////////
            // MIXED (GENERIC)
            ///////////////////

            /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i           // Android Phones from Unidentified Vendors
            ], [MODEL, [TYPE, MOBILE]], [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i       // Android Tablets from Unidentified Vendors
            ], [MODEL, [TYPE, TABLET]], [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i                      // Unidentifiable Tablet
            ], [[TYPE, TABLET]], [
            /(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i              // Unidentifiable Mobile
            ], [[TYPE, MOBILE]], [
            /(android[-\w\. ]{0,9});.+buil/i                                    // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]
        ],

        engine : [[

            /windows.+ edge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, EDGE+'HTML']], [

            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
            ], [VERSION, [NAME, 'Blink']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /ekioh(flow)\/([\w\.]+)/i,                                          // Flow
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,                           // KHTML/Tasman/Links
            /(icab)[\/ ]([23]\.[\d\.]+)/i                                       // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9})\b.+(gecko)/i                                     // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows
            /microsoft (windows) (vista|xp)/i                                   // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows) nt 6\.2; (arm)/i,                                        // Windows RT
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,            // Windows Phone
            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
            ], [NAME, [VERSION, strMapper, windowsVersionMap]], [
            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, strMapper, windowsVersionMap]], [

            // iOS/macOS
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,              // iOS
            /cfnetwork\/.+darwin/i
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i                             // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Mobile OSes
            /droid ([\w\.]+)\b.+(android[- ]x86)/i                              // Android-x86
            ], [VERSION, NAME], [                                               // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,                                      // Blackberry
            /(tizen|kaios)[\/ ]([\w\.]+)/i,                                     // Tizen/KaiOS
            /\((series40);/i                                                    // Series 40
            ], [NAME, VERSION], [
            /\(bb(10);/i                                                        // BlackBerry 10
            ], [VERSION, [NAME, BLACKBERRY]], [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i         // Symbian
            ], [VERSION, [NAME, 'Symbian']], [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
            ], [VERSION, [NAME, FIREFOX+' OS']], [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i                              // WebOS
            ], [VERSION, [NAME, 'webOS']], [

            // Google Chromecast
            /crkey\/([\d\.]+)/i                                                 // Google Chromecast
            ], [VERSION, [NAME, CHROME+'cast']], [
            /(cros) [\w]+ ([\w\.]+\w)/i                                         // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Console
            /(nintendo|playstation) ([wids345portablevuch]+)/i,                 // Nintendo/Playstation
            /(xbox); +xbox ([^\);]+)/i,                                         // Microsoft Xbox (360, One, X, S, Series X, Series S)

            // Other
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,                            // Joli/Palm
            /(mint)[\/\(\) ]?(\w*)/i,                                           // Mint
            /(mageia|vectorlinux)[; ]/i,                                        // Mageia/VectorLinux
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                                                                                // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
            /(hurd|linux) ?([\w\.]*)/i,                                         // Hurd/Linux
            /(gnu) ?([\w\.]*)/i,                                                // GNU
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
            /(haiku) (\w+)/i                                                    // Haiku
            ], [NAME, VERSION], [
            /(sunos) ?([\w\.\d]*)/i                                             // Solaris
            ], [[NAME, 'Solaris'], VERSION], [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,                              // Solaris
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,                                  // AIX
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,            // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX
            /(unix) ?([\w\.]*)/i                                                // UNIX
            ], [NAME, VERSION]
        ]
    };

    /////////////////
    // Constructor
    ////////////////

    var UAParser = function (ua, extensions) {

        if (typeof ua === OBJ_TYPE) {
            extensions = ua;
            ua = undefined$1;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(ua, extensions).getResult();
        }

        var _ua = ua || ((typeof window !== UNDEF_TYPE && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;

        this.getBrowser = function () {
            var _browser = {};
            _browser[NAME] = undefined$1;
            _browser[VERSION] = undefined$1;
            rgxMapper.call(_browser, _ua, _rgxmap.browser);
            _browser.major = majorize(_browser.version);
            return _browser;
        };
        this.getCPU = function () {
            var _cpu = {};
            _cpu[ARCHITECTURE] = undefined$1;
            rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
            return _cpu;
        };
        this.getDevice = function () {
            var _device = {};
            _device[VENDOR] = undefined$1;
            _device[MODEL] = undefined$1;
            _device[TYPE] = undefined$1;
            rgxMapper.call(_device, _ua, _rgxmap.device);
            return _device;
        };
        this.getEngine = function () {
            var _engine = {};
            _engine[NAME] = undefined$1;
            _engine[VERSION] = undefined$1;
            rgxMapper.call(_engine, _ua, _rgxmap.engine);
            return _engine;
        };
        this.getOS = function () {
            var _os = {};
            _os[NAME] = undefined$1;
            _os[VERSION] = undefined$1;
            rgxMapper.call(_os, _ua, _rgxmap.os);
            return _os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return _ua;
        };
        this.setUA = function (ua) {
            _ua = (typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH) ? trim(ua, UA_MAX_LENGTH) : ua;
            return this;
        };
        this.setUA(_ua);
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER =  enumerize([NAME, VERSION, MAJOR]);
    UAParser.CPU = enumerize([ARCHITECTURE]);
    UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
    UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);

    ///////////
    // Export
    //////////

    // check js environment
    {
        // nodejs env
        if (module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = typeof window !== UNDEF_TYPE && (window.jQuery || window.Zepto);
    if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (ua) {
            parser.setUA(ua);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : commonjsGlobal);
});

/**
 * checks if webauthn is available in the current environment
 * @returns {boolean} true if webauthn is available, false if it is not
 */
var getWebauthnAvailability = function () {
    return Boolean(window.PublicKeyCredential);
};
/**
 * checks if a platform authenticator is available in the current environment
 * @returns {Promise<boolean>} true if a platform authenticator is available, false if not
 */
var getPlatformAuthenticatorAvailability = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()];
}); }); };
function detectHasPlatformAuthenticator() {
    return __awaiter(this, void 0, void 0, function () {
        var hasWebauthn, ua, hasPlatformAuthenticator, isWindows, hasSupportedPlatformAuthenticator;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hasWebauthn = getWebauthnAvailability();
                    if (!hasWebauthn) {
                        return [2 /*return*/, {
                                hasWebauthn: Boolean(hasWebauthn),
                                hasPlatformAuthenticator: false,
                                hasSupportedPlatformAuthenticator: false,
                            }];
                    }
                    ua = uaParser();
                    return [4 /*yield*/, getPlatformAuthenticatorAvailability()];
                case 1:
                    hasPlatformAuthenticator = _a.sent();
                    isWindows = ua.os.name === 'Windows';
                    hasSupportedPlatformAuthenticator = hasPlatformAuthenticator && !isWindows;
                    console.log('hasWebauthn', hasWebauthn);
                    console.log('isWindows', isWindows);
                    console.log('hasSupportedPlatformAuthenticator', hasSupportedPlatformAuthenticator);
                    return [2 /*return*/, {
                            hasWebauthn: Boolean(hasWebauthn),
                            hasPlatformAuthenticator: Boolean(hasPlatformAuthenticator),
                            hasSupportedPlatformAuthenticator: hasPlatformAuthenticator && !isWindows,
                            isWindows: Boolean(isWindows),
                            authenticatorType: hasSupportedPlatformAuthenticator ? 'platform' : 'cross-platform',
                        }];
            }
        });
    });
}
function useAuthenticatorProfile() {
    var _a = React.useState(), hasPlatformAuthenticator = _a[0], setHasPlatformAuthenticator = _a[1];
    React.useEffect(function () {
        var mounted = true;
        detectHasPlatformAuthenticator()
            .then(function (hasAuthenticator) {
            if (mounted)
                setHasPlatformAuthenticator(hasAuthenticator);
        })
            .catch(function () { });
        return function () {
            mounted = false;
        };
    }, []);
    return hasPlatformAuthenticator;
}

var deepLinkAutoCloseTimer = 3;
var ContinueToWebWalletRole = 'ContinueToWebWalletRole';
var QRCodeRole = 'QRCodeRole';
function queryParam(key, value) {
    return key + "=" + value;
}
function queryParams(params) {
    return Object.entries(params)
        .filter(function (_a) {
        var value = _a[1];
        return Boolean(value);
    })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return queryParam(key, value);
    })
        .join('&');
}
/**
 * Component responsible for rendering a QR code
 */
var QRCode = function (_a) {
    var qrCode = _a.qrCode, env = _a.env, presentationRequestId = _a.presentationRequestId, holderApp = _a.holderApp, _b = _a.userCode, userCode = _b === void 0 ? undefined : _b, _c = _a.notUsingUnumWebWalletHolderApp, notUsingUnumWebWalletHolderApp = _c === void 0 ? false : _c;
    var _d = React.useState(false), showNeedHelp = _d[0], setShowNeedHelp = _d[1];
    var _e = useAuthenticatorProfile() || {}, hasSupportedPlatformAuthenticator = _e.hasSupportedPlatformAuthenticator; _e.authenticatorType;
    var walletHref = React.useMemo(function () {
        if (!presentationRequestId || !env)
            return undefined;
        var walletUrl = walletUrls[env];
        var urlParams = queryParams({
            presentationRequestId: presentationRequestId,
            autoClose: deepLinkAutoCloseTimer.toString(),
            skipQRCode: !hasSupportedPlatformAuthenticator ? 'true' : undefined,
            userCode: userCode,
        });
        return walletUrl ? walletUrl + "/request?" + urlParams : undefined;
    }, [env, presentationRequestId, hasSupportedPlatformAuthenticator, userCode]);
    var handleLinkButtonClick = function () {
        setShowNeedHelp(!showNeedHelp);
    };
    var QRLinkWrapper = function (_a) {
        var children = _a.children, className = _a.className, role = _a.role;
        var props = {
            className: className,
            role: role,
        };
        if (walletHref && holderApp) {
            return (React__default["default"].createElement("a", __assign({}, props, { target: "_blank", rel: "noopener noreferrer", href: walletHref + "&" + queryParam('link', 'qr') }), children));
        }
        return (React__default["default"].createElement("div", __assign({}, props), children));
    };
    var renderQrCode = function () { return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(QRLinkWrapper, { className: "image-wrapper", role: QRCodeRole },
            React__default["default"].createElement("img", { className: "qr-code-img", alt: "QR Code to Verify with " + (holderApp === null || holderApp === void 0 ? void 0 : holderApp.name), src: qrCode })),
        React__default["default"].createElement(Branding, null))); };
    return (React__default["default"].createElement("div", { className: "qr-code" },
        React__default["default"].createElement("div", { className: "bold" }, "To continue, scan this QR code"),
        React__default["default"].createElement("div", { className: "light" },
            "with your phone camera or ", holderApp === null || holderApp === void 0 ? void 0 :
            holderApp.name,
            " app:"),
        React__default["default"].createElement(LinkButton, { onClick: handleLinkButtonClick }, "Need help scanning?"),
        showNeedHelp && (React__default["default"].createElement("div", { className: "help" },
            React__default["default"].createElement("div", { className: "help-item" },
                "1. Install the ", holderApp === null || holderApp === void 0 ? void 0 :
                holderApp.name,
                " app from the app store."),
            React__default["default"].createElement("div", { className: "help-item" },
                "2. Open the ", holderApp === null || holderApp === void 0 ? void 0 :
                holderApp.name,
                " app and click \"Scan a QR code\"."),
            React__default["default"].createElement("div", { className: "help-item" }, "3. Hover over the QR code."))),
        React__default["default"].createElement("div", { className: "qrcode-img-wrapper" }, qrCode ? renderQrCode() : React__default["default"].createElement(Spinner, null)),
        (hasSupportedPlatformAuthenticator
            && walletHref
            && holderApp
            && notUsingUnumWebWalletHolderApp === false)
            && (React__default["default"].createElement(DeeplinkButton, { target: "_blank", href: walletHref, className: "continue-under-qr", role: ContinueToWebWalletRole },
                React__default["default"].createElement("img", { src: holderApp.deeplinkButtonImg, alt: "Verify with " + holderApp.name })))));
};

var css_248z$2 = ".deeplink-widget {\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  display: flex;\n}\n\n.deeplink-widget .error {\n  font-weight: 700;\n  color: #ff0000;\n}\n\n.deeplink-widget .deeplink-button-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n";
styleInject(css_248z$2);

/**
 * Component responsible for rendering a deep link referencing a PresentationRequest,
 * either as a QR code (default on desktop) or a button (default on mobile).
 */
var DeeplinkWidget = function (_a) {
    var holderApp = _a.holderApp, qrCode = _a.qrCode, deeplink = _a.deeplink, canScan = _a.canScan, env = _a.env, presentationRequestId = _a.presentationRequestId, _b = _a.userCode, userCode = _b === void 0 ? undefined : _b, _c = _a.notUsingUnumWebWalletHolderApp, notUsingUnumWebWalletHolderApp = _c === void 0 ? false : _c;
    var renderQrCode = function () { return (React__default["default"].createElement(QRCode, { qrCode: qrCode, env: env, presentationRequestId: presentationRequestId, holderApp: holderApp, userCode: userCode, notUsingUnumWebWalletHolderApp: notUsingUnumWebWalletHolderApp })); };
    var renderDeeplinkButton = function () { return (React__default["default"].createElement("div", { className: "deeplink-button-wrapper" },
        React__default["default"].createElement(DeeplinkButton, { target: "_blank", href: deeplink },
            React__default["default"].createElement("img", { src: holderApp === null || holderApp === void 0 ? void 0 : holderApp.deeplinkButtonImg, alt: "Verify with " + (holderApp === null || holderApp === void 0 ? void 0 : holderApp.name) })),
        React__default["default"].createElement(Branding, null))); };
    var widget = React.useMemo(function () { return (canScan ? renderQrCode() : renderDeeplinkButton()); }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canScan]);
    return (React__default["default"].createElement("div", { className: "deeplink-widget" }, widget));
};

var isDefined = function (maybe) { return maybe != null; };

var shouldNeverHappen = function (message) { return message + " THIS SHOULD NEVER HAPPEN."; };

/**
 * Component responsible for rendering a button to trigger the current fallback method.
 */
var FallbackButton = function (_a) {
    var client = _a.client, fallbackType = _a.fallbackType, canScan = _a.canScan, nextFallback = _a.nextFallback, setFallbackError = _a.setFallbackError, userInfo = _a.userInfo, presentationRequest = _a.presentationRequest, sendEmail = _a.sendEmail, sendSms = _a.sendSms, sendPushNotification = _a.sendPushNotification, goToLogin = _a.goToLogin;
    if (!fallbackType) {
        return null;
    }
    // only login fallback is available on mobile
    if (!canScan && fallbackType !== 'LOGIN') {
        return null;
    }
    var handleClick = function () {
        switch (fallbackType) {
            case 'EMAIL':
                actuallySendEmail();
                break;
            case 'SMS':
                actuallySendSms();
                break;
            case 'PUSH':
                actuallySendPush();
                break;
            case 'LOGIN': {
                if (goToLogin) {
                    goToLogin();
                }
                break;
            }
            default:
                console.log('invalid fallback type');
                break;
        }
        nextFallback();
    };
    // Button text for each fallback type.
    var loginText = React__default["default"].createElement(React__default["default"].Fragment, null, "Log in for more verification options.");
    var emailText = React__default["default"].createElement(React__default["default"].Fragment, null, "Get an email instead.");
    var smsText = React__default["default"].createElement(React__default["default"].Fragment, null, "Get an SMS instead.");
    var pushText = React__default["default"].createElement(React__default["default"].Fragment, null, "Get a push notification instead.");
    /**
     * Returns the correct button text depending on the fallback type.
     */
    var renderFallbackText = function () {
        switch (fallbackType) {
            case 'EMAIL':
                return emailText;
            case 'SMS':
                return smsText;
            case 'PUSH':
                return pushText;
            case 'LOGIN': {
                return loginText;
            }
            default:
                console.log('invalid fallback type');
                return null;
        }
    };
    /**
     * Sends a deeplink via email.
     * Uses a custom sendEmail function if availiable
     * Otherwise uses the default provided by the UnumIDClient.
     */
    var actuallySendEmail = function () { return __awaiter(void 0, void 0, void 0, function () {
        var deeplink, options, e_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Clear any previous fallback error message.
                    setFallbackError(undefined);
                    if (!userInfo || !userInfo.email) {
                        // We can't send the user an email if we don't have the user's email address.
                        console.log('email fallback not available');
                        return [2 /*return*/];
                    }
                    deeplink = presentationRequest.deeplink;
                    invariant(isDefined(deeplink), shouldNeverHappen('deeplink is missing.'));
                    options = {
                        to: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email,
                        deeplink: deeplink,
                    };
                    if (!sendEmail) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sendEmail(options)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log('error sending email', e_1);
                    setFallbackError("Error sending email to " + userInfo.email + ".");
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!client) return [3 /*break*/, 9];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, client.sendEmail(options)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_2 = _a.sent();
                    console.log('error sending email', e_2);
                    setFallbackError("Error sending email to " + userInfo.email + ".");
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    /**
   * Sends a deeplink via sms.
   * Uses a custom sendSMS function if availiable
   * Otherwise uses the default provided by the UnumIDClient.
   */
    var actuallySendSms = function () { return __awaiter(void 0, void 0, void 0, function () {
        var deeplink, options, e_3, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Clear any previous fallback error message.
                    setFallbackError(undefined);
                    if (!userInfo || !userInfo.phone) {
                        // We can't send the user an SMS if we don't have their mobile phone number.
                        console.log('sms fallback not available');
                        return [2 /*return*/];
                    }
                    deeplink = presentationRequest.deeplink;
                    invariant(isDefined(deeplink), shouldNeverHappen('deeplink is missing.'));
                    options = {
                        to: userInfo.phone,
                        deeplink: deeplink,
                    };
                    if (!sendSms) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sendSms(options)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log('error sending sms', e_3);
                    setFallbackError("Error sending sms to " + userInfo.phone + ".");
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!client) return [3 /*break*/, 9];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, client.sendSms(options)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_4 = _a.sent();
                    console.log('error sending sms', e_4);
                    setFallbackError("Error sending sms to " + userInfo.phone + ".");
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    /**
   * Sends a deeplink via push notification (APNS or FCM).
   * Uses a custom sendPushNotification function if availiable
   * Otherwise uses the default provided by the UnumIDClient.
   */
    var actuallySendPush = function () { return __awaiter(void 0, void 0, void 0, function () {
        var pushToken, deeplink, holderAppUuid, options, e_5, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Clear any previous fallback error message.
                    setFallbackError(undefined);
                    if (!userInfo) {
                        // we can't send the user a push notification if we don't know who they are
                        console.log('push fallback not available.');
                        return [2 /*return*/];
                    }
                    pushToken = userInfo.pushToken;
                    if (!pushToken) {
                        // we can't send the user a push notification if we don't have their device token.
                        console.log('push fallback not available.');
                        return [2 /*return*/];
                    }
                    if (Array.isArray(pushToken) && pushToken.length === 0) {
                        // we can't send a push notification to an empty array
                        console.log('push fallback not available.');
                        return [2 /*return*/];
                    }
                    deeplink = presentationRequest.deeplink, holderAppUuid = presentationRequest.presentationRequest.holderAppUuid;
                    invariant(isDefined(deeplink), shouldNeverHappen('deeplink is missing.'));
                    options = {
                        token: pushToken,
                        deeplink: deeplink,
                        holderAppUuid: holderAppUuid,
                    };
                    if (!sendPushNotification) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sendPushNotification(options)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    console.log('error sending push notification', e_5);
                    setFallbackError('Error sending push notification.');
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!client) return [3 /*break*/, 9];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, client.sendPushNotification(options)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_6 = _a.sent();
                    console.log('error sending push notification', e_6);
                    setFallbackError('Error sending push notification.');
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    return (React__default["default"].createElement("div", { className: "fallback-button" },
        React__default["default"].createElement(LinkButton, { onClick: handleClick }, renderFallbackText())));
};

var useTimeout = function (callback) {
    var _a = React.useState(false), isActive = _a[0], setIsActive = _a[1];
    var timeout;
    var start = function (delay) {
        if (!isActive) {
            setIsActive(true);
            setTimeout(callback, delay);
        }
    };
    var stop = function () {
        if (isActive) {
            clearTimeout(timeout);
            setIsActive(false);
        }
    };
    return [start, stop];
};

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = ms;
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

var common = setup;

var browser$1 = createCommonjsModule(function (module, exports) {
/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = common(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};
});

var hasFlag = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os__default["default"].release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

var supportsColor_1 = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty__default["default"].isatty(1))),
	stderr: translateLevel(supportsColor(true, tty__default["default"].isatty(2)))
};

var node = createCommonjsModule(function (module, exports) {
/**
 * Module dependencies.
 */




/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util__default["default"].deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = supportsColor_1;

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty__default["default"].isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util__default["default"].format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = common(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util__default["default"].inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util__default["default"].inspect(v, this.inspectOpts);
};
});

var src = createCommonjsModule(function (module) {
/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = browser$1;
} else {
	module.exports = node;
}
});

var debug;

var debug_1 = function () {
  if (!debug) {
    try {
      /* eslint global-require: off */
      debug = src("follow-redirects");
    }
    catch (error) { /* */ }
    if (typeof debug !== "function") {
      debug = function () { /* */ };
    }
  }
  debug.apply(null, arguments);
};

var URL = url__default["default"].URL;


var Writable = Stream__default["default"].Writable;



// Create handlers that pass events from native requests
var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
var eventHandlers = Object.create(null);
events.forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

RedirectableRequest.prototype.abort = function () {
  abortRequest(this._currentRequest);
  this.emit("abort");
};

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this;

  // Destroys the socket on timeout
  function destroyOnTimeout(socket) {
    socket.setTimeout(msecs);
    socket.removeListener("timeout", socket.destroy);
    socket.addListener("timeout", socket.destroy);
  }

  // Sets up a timer to trigger a timeout event
  function startTimer(socket) {
    if (self._timeout) {
      clearTimeout(self._timeout);
    }
    self._timeout = setTimeout(function () {
      self.emit("timeout");
      clearTimer();
    }, msecs);
    destroyOnTimeout(socket);
  }

  // Stops a timeout from triggering
  function clearTimer() {
    // Clear the timeout
    if (self._timeout) {
      clearTimeout(self._timeout);
      self._timeout = null;
    }

    // Clean up all attached listeners
    self.removeListener("abort", clearTimer);
    self.removeListener("error", clearTimer);
    self.removeListener("response", clearTimer);
    if (callback) {
      self.removeListener("timeout", callback);
    }
    if (!self.socket) {
      self._currentRequest.removeListener("socket", startTimer);
    }
  }

  // Attach callback if passed
  if (callback) {
    this.on("timeout", callback);
  }

  // Start the timer if or when the socket is opened
  if (this.socket) {
    startTimer(this.socket);
  }
  else {
    this._currentRequest.once("socket", startTimer);
  }

  // Clean up on events
  this.on("socket", destroyOnTimeout);
  this.on("abort", clearTimer);
  this.on("error", clearTimer);
  this.on("response", clearTimer);

  return this;
};

// Proxy all other public ClientRequest methods
[
  "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.slice(0, -1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request and set up its event handlers
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  request._redirectable = this;
  for (var event of events) {
    request.on(event, eventHandlers[event]);
  }

  // RFC7230§5.3.1: When making a request directly to an origin server, […]
  // a client MUST send only the absolute path […] as the request-target.
  this._currentUrl = /^\//.test(this._options.path) ?
    url__default["default"].format(this._options) :
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._currentUrl = this._options.path;

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.

  // If the response is not a redirect; return it as-is
  var location = response.headers.location;
  if (!location || this._options.followRedirects === false ||
      statusCode < 300 || statusCode >= 400) {
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
    return;
  }

  // The response is a redirect, so abort the current request
  abortRequest(this._currentRequest);
  // Discard the remainder of the response to avoid waiting for data
  response.destroy();

  // RFC7231§6.4: A client SHOULD detect and intervene
  // in cyclical redirections (i.e., "infinite" redirection loops).
  if (++this._redirectCount > this._options.maxRedirects) {
    this.emit("error", new TooManyRedirectsError());
    return;
  }

  // Store the request headers if applicable
  var requestHeaders;
  var beforeRedirect = this._options.beforeRedirect;
  if (beforeRedirect) {
    requestHeaders = Object.assign({
      // The Host header was set by nativeProtocol.request
      Host: response.req.getHeader("host"),
    }, this._options.headers);
  }

  // RFC7231§6.4: Automatic redirection needs to done with
  // care for methods not known to be safe, […]
  // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
  // the request method from POST to GET for the subsequent request.
  var method = this._options.method;
  if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
      // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
    this._options.method = "GET";
    // Drop a possible entity and headers related to it
    this._requestBodyBuffers = [];
    removeMatchingHeaders(/^content-/i, this._options.headers);
  }

  // Drop the Host header, as the redirect might lead to a different host
  var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

  // If the redirect is relative, carry over the host of the last request
  var currentUrlParts = url__default["default"].parse(this._currentUrl);
  var currentHost = currentHostHeader || currentUrlParts.host;
  var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
    url__default["default"].format(Object.assign(currentUrlParts, { host: currentHost }));

  // Determine the URL of the redirection
  var redirectUrl;
  try {
    redirectUrl = url__default["default"].resolve(currentUrl, location);
  }
  catch (cause) {
    this.emit("error", new RedirectionError(cause));
    return;
  }

  // Create the redirected request
  debug_1("redirecting to", redirectUrl);
  this._isRedirect = true;
  var redirectUrlParts = url__default["default"].parse(redirectUrl);
  Object.assign(this._options, redirectUrlParts);

  // Drop confidential headers when redirecting to a less secure protocol
  // or to a different domain that is not a superdomain
  if (redirectUrlParts.protocol !== currentUrlParts.protocol &&
     redirectUrlParts.protocol !== "https:" ||
     redirectUrlParts.host !== currentHost &&
     !isSubdomain(redirectUrlParts.host, currentHost)) {
    removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
  }

  // Evaluate the beforeRedirect callback
  if (typeof beforeRedirect === "function") {
    var responseDetails = {
      headers: response.headers,
      statusCode: statusCode,
    };
    var requestDetails = {
      url: currentUrl,
      method: method,
      headers: requestHeaders,
    };
    try {
      beforeRedirect(this._options, responseDetails, requestDetails);
    }
    catch (err) {
      this.emit("error", err);
      return;
    }
    this._sanitizeOptions(this._options);
  }

  // Perform the redirected request
  try {
    this._performRequest();
  }
  catch (cause) {
    this.emit("error", new RedirectionError(cause));
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = url__default["default"].parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      require$$0__default["default"].equal(options.protocol, protocol, "protocol mismatch");
      debug_1("options", options);
      return new RedirectableRequest(options, callback);
    }

    // Executes a GET request, following redirects
    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    }

    // Expose the properties on the wrapped protocol
    Object.defineProperties(wrappedProtocol, {
      request: { value: request, configurable: true, enumerable: true, writable: true },
      get: { value: get, configurable: true, enumerable: true, writable: true },
    });
  });
  return exports;
}

/* istanbul ignore next */
function noop() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return (lastValue === null || typeof lastValue === "undefined") ?
    undefined : String(lastValue).trim();
}

function createErrorType(code, defaultMessage) {
  function CustomError(cause) {
    Error.captureStackTrace(this, this.constructor);
    if (!cause) {
      this.message = defaultMessage;
    }
    else {
      this.message = defaultMessage + ": " + cause.message;
      this.cause = cause;
    }
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

function abortRequest(request) {
  for (var event of events) {
    request.removeListener(event, eventHandlers[event]);
  }
  request.on("error", noop);
  request.abort();
}

function isSubdomain(subdomain, domain) {
  const dot = subdomain.length - domain.length - 1;
  return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
}

// Exports
var followRedirects = wrap({ http: http__default["default"], https: https__default["default"] });
var wrap_1 = wrap;
followRedirects.wrap = wrap_1;

var name = "axios";
var version = "0.21.4";
var description = "Promise based HTTP client for the browser and node.js";
var main = "index.js";
var scripts = {
	test: "grunt test",
	start: "node ./sandbox/server.js",
	build: "NODE_ENV=production grunt build",
	preversion: "npm test",
	version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
	postversion: "git push && git push --tags",
	examples: "node ./examples/server.js",
	coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
	fix: "eslint --fix lib/**/*.js"
};
var repository = {
	type: "git",
	url: "https://github.com/axios/axios.git"
};
var keywords = [
	"xhr",
	"http",
	"ajax",
	"promise",
	"node"
];
var author = "Matt Zabriskie";
var license = "MIT";
var bugs = {
	url: "https://github.com/axios/axios/issues"
};
var homepage = "https://axios-http.com";
var devDependencies = {
	coveralls: "^3.0.0",
	"es6-promise": "^4.2.4",
	grunt: "^1.3.0",
	"grunt-banner": "^0.6.0",
	"grunt-cli": "^1.2.0",
	"grunt-contrib-clean": "^1.1.0",
	"grunt-contrib-watch": "^1.0.0",
	"grunt-eslint": "^23.0.0",
	"grunt-karma": "^4.0.0",
	"grunt-mocha-test": "^0.13.3",
	"grunt-ts": "^6.0.0-beta.19",
	"grunt-webpack": "^4.0.2",
	"istanbul-instrumenter-loader": "^1.0.0",
	"jasmine-core": "^2.4.1",
	karma: "^6.3.2",
	"karma-chrome-launcher": "^3.1.0",
	"karma-firefox-launcher": "^2.1.0",
	"karma-jasmine": "^1.1.1",
	"karma-jasmine-ajax": "^0.1.13",
	"karma-safari-launcher": "^1.0.0",
	"karma-sauce-launcher": "^4.3.6",
	"karma-sinon": "^1.0.5",
	"karma-sourcemap-loader": "^0.3.8",
	"karma-webpack": "^4.0.2",
	"load-grunt-tasks": "^3.5.2",
	minimist: "^1.2.0",
	mocha: "^8.2.1",
	sinon: "^4.5.0",
	"terser-webpack-plugin": "^4.2.3",
	typescript: "^4.0.5",
	"url-search-params": "^0.10.0",
	webpack: "^4.44.2",
	"webpack-dev-server": "^3.11.0"
};
var browser = {
	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
};
var jsdelivr = "dist/axios.min.js";
var unpkg = "dist/axios.min.js";
var typings = "./index.d.ts";
var dependencies = {
	"follow-redirects": "^1.14.0"
};
var bundlesize = [
	{
		path: "./dist/axios.min.js",
		threshold: "5kB"
	}
];
var _resolved = "https://registry.npmjs.org/axios/-/axios-0.21.4.tgz";
var _integrity = "sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==";
var _from = "axios@0.21.4";
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
	scripts: scripts,
	repository: repository,
	keywords: keywords,
	author: author,
	license: license,
	bugs: bugs,
	homepage: homepage,
	devDependencies: devDependencies,
	browser: browser,
	jsdelivr: jsdelivr,
	unpkg: unpkg,
	typings: typings,
	dependencies: dependencies,
	bundlesize: bundlesize,
	_resolved: _resolved,
	_integrity: _integrity,
	_from: _from
};

var httpFollow = followRedirects.http;
var httpsFollow = followRedirects.https;






var isHttps = /https:?/;

/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */
function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location;

  // Basic proxy authorization
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  }

  // If a proxy is used, any redirects must also pass through the proxy
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}

/*eslint consistent-return:0*/
var http_1 = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };
    var reject = function reject(value) {
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // See https://github.com/axios/axios/issues/69
    if ('User-Agent' in headers || 'user-agent' in headers) {
      // User-Agent is specified; handle case where no UA header is desired
      if (!headers['User-Agent'] && !headers['user-agent']) {
        delete headers['User-Agent'];
        delete headers['user-agent'];
      }
      // Otherwise, use specified value
    } else {
      // Only set header if it hasn't been set in config
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url__default["default"].parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url__default["default"].parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https__default["default"] : http__default["default"];
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib__default["default"].createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        var totalResponseBytes = 0;
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
              responseData = utils.stripBOM(responseData);
            }
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
      var timeout = parseInt(config.timeout, 10);

      if (isNaN(timeout)) {
        reject(createError(
          'error trying to parse `config.timeout` to int',
          config,
          'ERR_PARSE_TIMEOUT',
          req
        ));

        return;
      }

      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError(
          'timeout of ' + timeout + 'ms exceeded',
          config,
          config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
          req
        ));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = http_1;
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  var context = this || defaults_1;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

var validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

var validator = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators$1
};

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
var isAxiosError = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios$1 = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios$1.Axios = Axios_1;

// Factory for creating new instances
axios$1.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios$1.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios$1.Cancel = Cancel_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel;

// Expose all/spread
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;

// Expose isAxiosError
axios$1.isAxiosError = isAxiosError;

var axios_1 = axios$1;

// Allow use of default import syntax in TypeScript
var _default = axios$1;
axios_1.default = _default;

var axios = axios_1;

var UnumIDClient = /** @class */ (function () {
    function UnumIDClient(saasUrl, apiKey) {
        this.axiosInstance = axios.create({
            baseURL: saasUrl,
            headers: { Authorization: "Bearer " + apiKey },
        });
    }
    UnumIDClient.prototype.makeSaasCall = function (path, method, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.axiosInstance({
                        url: path,
                        method: method,
                        data: data,
                    })];
            });
        });
    };
    UnumIDClient.prototype.sendPushNotification = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.makeSaasCall('/pushNotification', 'POST', options)];
                }
                catch (e) {
                    console.log('Error sending push notification', e);
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    UnumIDClient.prototype.sendEmail = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.makeSaasCall('/email', 'POST', options)];
                }
                catch (e) {
                    console.log('error sending email', e);
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    UnumIDClient.prototype.sendSms = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.makeSaasCall('/sms', 'POST', options)];
                }
                catch (e) {
                    console.log('error sending sms', e);
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    return UnumIDClient;
}());

var css_248z$1 = ".unumid-web-sdk-widget {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  line-height: 1.5;\n  min-height: 360px;\n}\n\n@media screen and (max-width: 530px) {\n  .unumid-web-sdk-widget {\n    width: unset;\n    min-height: 150px;\n  }\n}\n";
styleInject(css_248z$1);

var css_248z = ".error-message {\n  font-weight: 700;\n  color: #ff0000\n}\n";
styleInject(css_248z);

/**
 * A simple component for displaying error messages.
 * Applies error styling to its children.
 */
var ErrorMessage = function (_a) {
    var children = _a.children;
    return React__default["default"].createElement("div", { className: "error-message" }, children);
};

/**
 * Component responsible for showing the result of sending a deep link via a fallback method.
 */
var FallbackResult = function (_a) {
    var userInfo = _a.userInfo, fallbackType = _a.fallbackType, error = _a.error;
    // Text for each fallback type.
    var pushText = React__default["default"].createElement(React__default["default"].Fragment, null, "We sent a push notification to your device.");
    var smsText = React__default["default"].createElement(React__default["default"].Fragment, null,
        "We texted a link to ", userInfo === null || userInfo === void 0 ? void 0 :
        userInfo.phone,
        ".");
    var emailText = React__default["default"].createElement(React__default["default"].Fragment, null,
        "We emailed a link to ", userInfo === null || userInfo === void 0 ? void 0 :
        userInfo.email,
        ".");
    // Renders text according to the fallback type.
    var renderFirstLine = function () {
        switch (fallbackType) {
            case 'EMAIL':
                return emailText;
            case 'SMS':
                return smsText;
            case 'PUSH':
                return pushText;
            default:
                console.log('invalid fallback type');
                return null;
        }
    };
    return (React__default["default"].createElement("div", { className: "fallback-result" }, error
        ? (React__default["default"].createElement(ErrorMessage, null, error))
        : (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement("div", null, renderFirstLine()),
            React__default["default"].createElement("div", { style: { fontWeight: 'bold' } }, "Please click it to continue.")))));
};

/**
 * Our top-level component exported from this SDK.
 * It manages much of the SDK's state and determines which other components should be rendered.
 */
var UnumIDWidget = function (_a) {
    var _b;
    var apiKey = _a.apiKey, env = _a.env, createPresentationRequest = _a.createPresentationRequest, sendEmail = _a.sendEmail, sendSms = _a.sendSms, sendPushNotification = _a.sendPushNotification, goToLogin = _a.goToLogin, userInfo = _a.userInfo, presentationRequestProp = _a.presentationRequest, _c = _a.createInitialPresentationRequest, createInitialPresentationRequest = _c === void 0 ? !presentationRequestProp : _c, userCode = _a.userCode, _d = _a.notUsingUnumWebWalletHolderApp, notUsingUnumWebWalletHolderApp = _d === void 0 ? false : _d;
    // determines whether to initially show a qr code or a button
    var canScan = React.useState(!/Mobi|Android|iPhone/i.test(navigator.userAgent))[0];
    var _e = React.useState('DEEPLINK'), currentWidget = _e[0], setCurrentWidget = _e[1];
    // The PresentationRequest to display
    var _f = React.useState(presentationRequestProp), presentationRequest = _f[0], setPresentationRequest = _f[1];
    var _g = React.useState([]), fallbackOptions = _g[0], setFallbackOptions = _g[1];
    var _h = React.useState(), fallbackResultType = _h[0], setFallbackResultType = _h[1];
    var _j = React.useState(), fallbackError = _j[0], setFallbackError = _j[1];
    var _k = React.useState((presentationRequestProp === null || presentationRequestProp === void 0 ? void 0 : presentationRequestProp.deeplink) || ''), deeplink = _k[0], setDeeplink = _k[1];
    var _l = React.useState((presentationRequestProp === null || presentationRequestProp === void 0 ? void 0 : presentationRequestProp.qrCode) || ''), qrCode = _l[0], setQrCode = _l[1];
    var unumIdClient = React.useState((apiKey && env) ? new UnumIDClient(saasUrls[env], apiKey) : undefined)[0];
    var _m = React.useState(!!(presentationRequestProp && !userCode)), isReady = _m[0], setIsReady = _m[1];
    // destructure userInfo properties so we can pass them to a useEffect dependency array
    // without worrying about object equality
    var pushToken = userInfo === null || userInfo === void 0 ? void 0 : userInfo.pushToken;
    var email = userInfo === null || userInfo === void 0 ? void 0 : userInfo.email;
    var phone = userInfo === null || userInfo === void 0 ? void 0 : userInfo.phone;
    var isLoggedIn = !!userInfo;
    // Set up our queue of available fallback options
    // based on the information we have about the user.
    React.useEffect(function () {
        var queue = [];
        if (pushToken && (sendPushNotification || unumIdClient)) {
            // it's a single token
            if (!Array.isArray(pushToken)) {
                queue.push('PUSH');
            }
            // it's an array containing at least one token
            if (Array.isArray(pushToken) && pushToken.length > 0) {
                queue.push('PUSH');
            }
        }
        if (phone && (sendSms || unumIdClient)) {
            queue.push('SMS');
        }
        if (email && (sendEmail || unumIdClient)) {
            queue.push('EMAIL');
        }
        if (!isLoggedIn && goToLogin) {
            queue.push('LOGIN');
        }
        setFallbackOptions(queue);
    }, [
        pushToken,
        phone,
        email,
        isLoggedIn,
        goToLogin,
        unumIdClient,
        sendPushNotification,
        sendEmail,
        sendSms,
    ]);
    var nextFallback = function () {
        if (fallbackOptions.length === 0) {
            return;
        }
        setCurrentWidget('FALLBACK_RESULT');
        setFallbackResultType(fallbackOptions[0]);
        var updatedFallbackQueue = fallbackOptions.slice(1);
        setFallbackOptions(updatedFallbackQueue);
    };
    /**
     * Calls the provided createPresentationRequest function.
     * If a value is returned, it will be set as the current presentationRequest to display.
     * If not, an updated presentationRequest prop must be provided when the function completes.
     */
    var triggerPresentationRequestCreation = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // If no createPresentationRequest function was provided, this function effectively does nothing
                    if (!createPresentationRequest)
                        return [2 /*return*/];
                    return [4 /*yield*/, createPresentationRequest()];
                case 1:
                    response = _a.sent();
                    if (response) {
                        setPresentationRequest(response);
                        if (!userCode) {
                            setDeeplink(response.deeplink || '');
                            setQrCode(response.qrCode || '');
                            setIsReady(true);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    // A memoized version of triggerPresentationRequestCreation
    // that will not be redefined when this component re-renders
    // and can be reliably passed to other hooks.
    var memoizedTriggerPresentationRequestCreation = React.useCallback(triggerPresentationRequestCreation, [createPresentationRequest, userCode]);
    // Determine the delay after which a new presentationRequest should be created,
    // to ensure that an expired request is never displayed to the user.
    var expiresAt = (_b = presentationRequest === null || presentationRequest === void 0 ? void 0 : presentationRequest.presentationRequest) === null || _b === void 0 ? void 0 : _b.expiresAt;
    var timeUntilExpiration = presentationRequest
        && new Date(expiresAt).getTime() - new Date().getTime();
    var oneMinuteBeforeExpiration = timeUntilExpiration && (timeUntilExpiration - 60 * 1000);
    var nineMinutesFromNow = 9 * 60 * 1000;
    var delay = oneMinuteBeforeExpiration || nineMinutesFromNow;
    var _o = useTimeout(memoizedTriggerPresentationRequestCreation), startTimeout = _o[0], stopTimeout = _o[1];
    React.useEffect(function () {
        if (presentationRequestProp) {
            // When this component is rendered with a new presentationRequest prop,
            // update the presentationRequest state.
            setPresentationRequest(presentationRequestProp);
            if (!userCode) {
                setDeeplink(presentationRequestProp.deeplink || '');
                setQrCode(presentationRequestProp.qrCode || '');
                setIsReady(true);
            }
        }
        else if (createInitialPresentationRequest) {
            // When this component is rendered without a presentationRequest prop,
            // trigger presentationRequest creation if the createInitialPresentationRequest prop is true.
            memoizedTriggerPresentationRequestCreation();
        }
    }, [
        presentationRequestProp,
        memoizedTriggerPresentationRequestCreation,
        createInitialPresentationRequest,
        userCode,
    ]);
    React.useEffect(function () {
        // Stop any previously set timeout.
        stopTimeout();
        // Schedule a new presentationRequest to be created after a delay.
        // (To ensure that the current one is replaced before it expires.)
        startTimeout(delay);
        // Stop the excurrent timeout when this component is unmounted.
        return stopTimeout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [presentationRequest]);
    // if a userCode is provided, add it to the deeplink from the presentationRequest as a query param
    // and generate a new qr code from the updated deeplink
    React.useEffect(function () {
        var addUserCodeToDeeplinkAndQr = function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedDeeplink, updatedQrCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(presentationRequest && userCode)) return [3 /*break*/, 3];
                        updatedDeeplink = presentationRequest.deeplink + "?userCode=" + userCode;
                        setDeeplink(updatedDeeplink);
                        if (!canScan) return [3 /*break*/, 2];
                        return [4 /*yield*/, lib.toDataURL(updatedDeeplink, { color: { light: '#0000' } })];
                    case 1:
                        updatedQrCode = _a.sent();
                        setQrCode(updatedQrCode);
                        _a.label = 2;
                    case 2:
                        setIsReady(true);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        addUserCodeToDeeplinkAndQr();
    }, [presentationRequest, userCode, canScan]);
    // display a spinner if the widget isn't ready yet
    if (!isReady) {
        return (React__default["default"].createElement("div", { className: "unumid-web-sdk-widget" },
            React__default["default"].createElement(Spinner, null)));
    }
    // the presentationRequest should be defined at this point
    invariant(isDefined(presentationRequest), shouldNeverHappen('Missing presentationRequest'));
    // throw if the presentationRequest does not contain holderApp info
    // this should never happen, but the holderApp property is technically optional
    // on the PresentationRequestDto type
    invariant(isDefined(presentationRequest.holderApp), 'Missing presentationRequest holder app info. THIS SHOULD NEVER HAPPEN.');
    return (React__default["default"].createElement("div", { className: "unumid-web-sdk-widget" },
        (currentWidget === 'DEEPLINK') && (React__default["default"].createElement(DeeplinkWidget, { holderApp: presentationRequest === null || presentationRequest === void 0 ? void 0 : presentationRequest.holderApp, deeplink: deeplink, qrCode: qrCode, canScan: canScan, env: env, presentationRequestId: presentationRequest === null || presentationRequest === void 0 ? void 0 : presentationRequest.presentationRequest.id, userCode: userCode, notUsingUnumWebWalletHolderApp: notUsingUnumWebWalletHolderApp })),
        currentWidget === 'FALLBACK_RESULT' && fallbackResultType && (React__default["default"].createElement(FallbackResult, { userInfo: userInfo, fallbackType: fallbackResultType, error: fallbackError })),
        React__default["default"].createElement(FallbackButton, { client: unumIdClient, fallbackType: fallbackOptions[0], canScan: canScan, nextFallback: nextFallback, setFallbackError: setFallbackError, userInfo: userInfo, presentationRequest: presentationRequest, sendEmail: sendEmail, sendSms: sendSms, sendPushNotification: sendPushNotification, goToLogin: goToLogin }),
        currentWidget !== 'DEEPLINK' && (React__default["default"].createElement(LinkButton, { onClick: function () { return setCurrentWidget('DEEPLINK'); } },
            "Back to ",
            canScan ? 'QR Code' : 'Verification button',
            "."))));
};

module.exports = UnumIDWidget;
//# sourceMappingURL=index.js.map
