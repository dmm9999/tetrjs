var Store = require('flux/utils').Store;
var AppDispatcher = require('./../dispatcher/dispatcher');

var PieceQueue = require('./../util/piece_queue_utils');
var BoardStore = require('./board_store');
var GameBoard = require('./../components/gameboard');

var PieceStore = new Store(AppDispatcher);

var _piece, _nextPiece, _initialPosition, _currentPosition, _orientation, _stored, _newPosition;

var _initialPosition = [0,1];

// PieceStore.__onDispatch = function (payload) {
//   switch (payload.actionType) {
//     case "MOVE_LEFT":
//       _moveLeft();
//       PieceStore.__emitChange();
//       break;
//     case "MOVE_RIGHT":
//       _moveRight();
//       PieceStore.__emitChange();
//       break;
//     case "MOVE_DOWN":
//       _moveDown();
//       PieceStore.__emitChange();
//       break;
//     case "HARD_DROP":
//       _hardDrop();
//       PieceStore.__emitChange();
//       break;
//     case "ROTATE":
//       _rotate();
//       PieceStore.__emitChange();
//       break;
//     case "STORE_PIECE":
//       _storePiece();
//       PieceStore.__emitChange();
//       break;
//     case "TOGGLE_PAUSE":
//       _togglePause();
//       PieceStore.__emitChange();
//       break;
//   }
// };

_dispatchToken = PieceStore.getDispatchToken();

PieceStore.fetchDispatchToken = function () {
  return _dispatchToken;
};

PieceStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "MOVE_LEFT":
      _moveLeft();
      PieceStore.__emitChange();
      break;
    case "MOVE_RIGHT":
      _moveRight();
      PieceStore.__emitChange();
      break;
    case "MOVE_DOWN":
      _moveDown();
      PieceStore.__emitChange();
      break;
    case "HARD_DROP":
      _hardDrop();
      PieceStore.__emitChange();
      break;
    case "ROTATE":
      _rotate();
      PieceStore.__emitChange();
      break;
    case "STORE_PIECE":
      _storePiece();
      PieceStore.__emitChange();
      break;
  }
};

PieceStore.fetchCurrentPiece = function () {
  return {
      piece : _piece,
      orientation : _orientation,
      currentPosition : _currentPosition
  };
};

PieceStore.nextPiece = function () {
  if (PieceQueue.returnPieceQueue().length === 0) {
    PieceQueue.createPieceArray();
  }
  _nextPiece = PieceQueue.getPiece();
};

PieceStore.newPiece = function (piece) {

  if (piece) {
    _piece = piece;
    _currentPosition = _initialPosition;
    _orientation = 0;
  } else {
    _piece = _nextPiece;
    _currentPosition = _initialPosition;
    _orientation = 0;
  }
    if (!BoardStore.validPosition(_piece, _initialPosition, _orientation)) {
      debugger
      GameBoard.gameOver();
  }

  PieceStore.nextPiece();
};

_moveLeft = function () {
  _newPosition = _currentPosition.slice();
  _newPosition[1] = _newPosition[1] - 1;
  if (BoardStore.validPosition(_piece, _newPosition, _orientation)) {
    _currentPosition = _newPosition;
  }
};

_moveRight = function () {
  _newPosition = _currentPosition.slice();
  _newPosition[1] = _newPosition[1] + 1;
  if (BoardStore.validPosition(_piece, _newPosition, _orientation)) {
    _currentPosition = _newPosition;
  }
};

_moveDown = function () {
  _newPosition = _currentPosition.slice();
  _newPosition[0] = _newPosition[0] + 1;
  if (BoardStore.validPosition(_piece, _newPosition, _orientation)) {
    _currentPosition = _newPosition;
  }
};

_hardDrop = function () {
  _newPosition = _currentPosition;
    while (BoardStore.validPosition(_piece, _newPosition, _orientation)) {
        _currentPosition[0] = _currentPosition[0] + 1;
    }
    _currentPosition[0] = _currentPosition[0] - 1;
};

_rotate = function () {
  _newOrientation = _orientation;
  _newOrientation = (_newOrientation + 1) % 4;
  if (BoardStore.validPosition(_piece, _newPosition, _orientation)) {
    _orientation = _newOrientation;
  }
};

_storePiece = function () {
  if (_stored) {
    _unstored = _stored;
    _stored = _piece;
    PieceStore.newPiece(_unstored);
  } else {
    _stored = _piece;
    PieceStore.newPiece();
  }
};

PieceStore.fetchStoredPiece = function () {
  return _stored;
};

PieceStore.fetchNextPiece = function () {
  return _nextPiece;
};

PieceStore.nextPiece();
PieceStore.newPiece();

module.exports = PieceStore;
