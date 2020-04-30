(function(e, a) { for(var i in a) e[i] = a[i]; }( /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/workers/bfs.worker/bfs.ts":
/*!*******************************************!*\
  !*** ./src/app/workers/bfs.worker/bfs.ts ***!
  \*******************************************/
/*! exports provided: default, ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return bfs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ1", function() { return ɵ1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ2", function() { return ɵ2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ3", function() { return ɵ3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ4", function() { return ɵ4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ5", function() { return ɵ5; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/app/workers/bfs.worker/types.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var DIRECTIONS = [
    _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Right,
    _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Down,
    _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Left,
    _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Up
];
var generateStepsMatrix = function (map) {
    return map.map(function (row) { return row.map(function (field) {
        switch (field) {
            case _types__WEBPACK_IMPORTED_MODULE_0__["Field"].Blocked:
                return { index: -1, from: _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Unknown };
            case _types__WEBPACK_IMPORTED_MODULE_0__["Field"].Start:
                return { index: 1, from: _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Unknown };
            default:
                return { index: 0, from: _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Unknown };
        }
    }); });
};
var ɵ0 = generateStepsMatrix;
var ɵ1 = function (map, _a) {
    var x = _a.x, y = _a.y;
    return (x += 1, [map[y][x], { x: x, y: y }]);
}, ɵ2 = function (map, _a) {
    var x = _a.x, y = _a.y;
    return (y += 1, [map[y][x], { x: x, y: y }]);
}, ɵ3 = function (map, _a) {
    var x = _a.x, y = _a.y;
    return (x -= 1, [map[y][x], { x: x, y: y }]);
}, ɵ4 = function (map, _a) {
    var x = _a.x, y = _a.y;
    return (y -= 1, [map[y][x], { x: x, y: y }]);
};
var stepTo = {
    Right: ɵ1,
    Down: ɵ2,
    Left: ɵ3,
    Up: ɵ4
};
var getOppositeDirection = function (direction) {
    switch (direction) {
        case _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Up:
            return _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Down;
        case _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Down:
            return _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Up;
        case _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Left:
            return _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Right;
        case _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Right:
            return _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Left;
        case _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Unknown:
            return _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Unknown;
    }
};
var ɵ5 = getOppositeDirection;
function bfs(matrix, start, target) {
    var path = [];
    var stepsMatrix = generateStepsMatrix(matrix);
    var queue = [start];
    var cursor;
    var passed = false;
    while (queue.length !== 0) {
        cursor = queue.shift();
        if (cursor.x === target.x && cursor.y === target.y) {
            passed = true;
            break;
        }
        DIRECTIONS.forEach(function (direction) {
            var _a = stepTo[_types__WEBPACK_IMPORTED_MODULE_0__["Direction"][direction]](stepsMatrix, cursor), nextCursor = _a[0], nextPosition = _a[1];
            if (nextCursor.index === 0) {
                nextCursor.index = stepsMatrix[cursor.y][cursor.x].index + 1;
                nextCursor.from = getOppositeDirection(direction);
                queue.push(nextPosition);
            }
        });
    }
    var prevDirection = _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Unknown;
    while (true) {
        path.unshift(__assign({}, cursor, { from: stepsMatrix[cursor.y][cursor.x].from, to: getOppositeDirection(prevDirection) }));
        if (cursor.x === start.x && cursor.y === start.y) {
            break;
        }
        prevDirection = stepsMatrix[cursor.y][cursor.x].from;
        switch (prevDirection) {
            case _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Right:
                cursor.x += 1;
                break;
            case _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Down:
                cursor.y += 1;
                break;
            case _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Left:
                cursor.x -= 1;
                break;
            case _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Up:
                cursor.y -= 1;
                break;
        }
    }
    var commands = path
        .reduce(function (result, step) {
        if (step.to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Unknown) {
            return result;
        }
        if ((step.from === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Left && step.to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Up) ||
            (step.from === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Up && step.to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Right) ||
            (step.from === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Right && step.to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Down) ||
            (step.from === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Down && step.to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Left)) {
            result.push(_types__WEBPACK_IMPORTED_MODULE_0__["Command"].Left);
        }
        if ((step.from === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Up && step.to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Left) ||
            (step.from === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Right && step.to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Up) ||
            (step.from === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Down && step.to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Right) ||
            (step.from === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Left && step.to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Down)) {
            result.push(_types__WEBPACK_IMPORTED_MODULE_0__["Command"].Right);
        }
        result.push(_types__WEBPACK_IMPORTED_MODULE_0__["Command"].Forward);
        return result;
    }, []);
    if (path[0].to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Right) {
        commands.unshift(_types__WEBPACK_IMPORTED_MODULE_0__["Command"].Right);
    }
    else if (path[0].to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Left) {
        commands.unshift(_types__WEBPACK_IMPORTED_MODULE_0__["Command"].Left);
    }
    else if (path[0].to === _types__WEBPACK_IMPORTED_MODULE_0__["Direction"].Down) {
        commands.unshift(_types__WEBPACK_IMPORTED_MODULE_0__["Command"].Right, _types__WEBPACK_IMPORTED_MODULE_0__["Command"].Right);
    }
    return {
        passed: passed,
        path: path,
        commands: commands
    };
}



/***/ }),

/***/ "./src/app/workers/bfs.worker/types.ts":
/*!*********************************************!*\
  !*** ./src/app/workers/bfs.worker/types.ts ***!
  \*********************************************/
/*! exports provided: Field, Command, Direction, InvalidMatrixSizeError, InvalidMatrixFieldsError, InvalidFieldSetError, ExcessStartError, ExcessTargetError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return Field; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Command", function() { return Command; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return Direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidMatrixSizeError", function() { return InvalidMatrixSizeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidMatrixFieldsError", function() { return InvalidMatrixFieldsError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidFieldSetError", function() { return InvalidFieldSetError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcessStartError", function() { return ExcessStartError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcessTargetError", function() { return ExcessTargetError; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Field;
(function (Field) {
    Field["Walkable"] = ".";
    Field["Blocked"] = "#";
    Field["Start"] = "S";
    Field["Target"] = "T";
})(Field || (Field = {}));
var Command;
(function (Command) {
    Command["Forward"] = "f";
    Command["Left"] = "l";
    Command["Right"] = "r";
})(Command || (Command = {}));
var Direction;
(function (Direction) {
    Direction[Direction["Unknown"] = 0] = "Unknown";
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Down"] = 3] = "Down";
    Direction[Direction["Left"] = 4] = "Left";
})(Direction || (Direction = {}));
var InvalidMatrixSizeError = /** @class */ (function (_super) {
    __extends(InvalidMatrixSizeError, _super);
    function InvalidMatrixSizeError() {
        return _super.call(this) || this;
    }
    return InvalidMatrixSizeError;
}(Error));

var InvalidMatrixFieldsError = /** @class */ (function (_super) {
    __extends(InvalidMatrixFieldsError, _super);
    function InvalidMatrixFieldsError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidMatrixFieldsError;
}(Error));

var InvalidFieldSetError = /** @class */ (function (_super) {
    __extends(InvalidFieldSetError, _super);
    function InvalidFieldSetError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidFieldSetError;
}(Error));

var ExcessStartError = /** @class */ (function (_super) {
    __extends(ExcessStartError, _super);
    function ExcessStartError(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    return ExcessStartError;
}(Error));

var ExcessTargetError = /** @class */ (function (_super) {
    __extends(ExcessTargetError, _super);
    function ExcessTargetError(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    return ExcessTargetError;
}(Error));



/***/ }),

/***/ "./src/app/workers/bfs.worker/worker.ts":
/*!**********************************************!*\
  !*** ./src/app/workers/bfs.worker/worker.ts ***!
  \**********************************************/
/*! exports provided: LAZY_MODULE_MAP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LAZY_MODULE_MAP", function() { return LAZY_MODULE_MAP; });
/* harmony import */ var _bfs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bfs */ "./src/app/workers/bfs.worker/bfs.ts");

self.addEventListener('message', function (_a) {
    var data = _a.data, origin = _a.origin;
    var id = data[0], matrix = data[1], start = data[2], target = data[3];
    self.postMessage([id, Object(_bfs__WEBPACK_IMPORTED_MODULE_0__["default"])(matrix, start, target)]);
});
var LAZY_MODULE_MAP = {};


/***/ }),

/***/ 0:
/*!****************************************************!*\
  !*** multi ./src/app/workers/bfs.worker/worker.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Projects\angular\robby-robot\src\app\workers\bfs.worker\worker.ts */"./src/app/workers/bfs.worker/worker.ts");


/***/ })

/******/ })));
//# sourceMappingURL=main.js.map