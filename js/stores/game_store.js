var Store = require('flux/utils').Store;
var AppDispatcher = require('./../dispatcher/dispatcher');
var BoardStore = require('./board_store');
var PieceStore = require('./piece_store');
var Pieces = require('./../util/pieces_util');
var ScoreBoardActions = require('./../actions/score_board_actions');

var GameStore = new Store(AppDispatcher);

var _rowsCleared = 0,
    _points = 0;

GameStore.__onDispatch = function () {

};

GameStore.fetchGameBoard = function () {
  return BoardStore.fetchGameBoard();
};

GameStore.wipeGameBoard = function (gameBoard) {
  gameBoard.forEach(function(row, rowIndex) {
    row.forEach(function(el, elIndex) {
      if (!!el.type && !el.locked) {
        el.type = "";
        el.empty = true;
      }
    });
  });
};

GameStore.paintGameBoard = function (gameBoard) {
  currentPiece = PieceStore.fetchCurrentPiece();
  currentPosition = currentPiece.currentPosition;
  orientation = currentPiece.orientation;
  piece = currentPiece.piece[orientation];
  piece.forEach(function(row, rowIndex) {
    row.forEach(function(el, elIndex) {
      if (el && gameBoard[currentPosition[0] + rowIndex][currentPosition[1] + elIndex]) {
        gameBoard[currentPosition[0] + rowIndex][currentPosition[1] + elIndex].type = currentPiece.piece.type;
        gameBoard[currentPosition[0] + rowIndex][currentPosition[1] + elIndex].empty = false;
      }
    });
  });
};

GameStore.lockPiece = function (gameBoard) {
  currentPiece = PieceStore.fetchCurrentPiece();
  currentPosition = currentPiece.currentPosition;
  orientation = currentPiece.orientation;
  piece = currentPiece.piece[orientation];
  piece.forEach(function(row, rowIndex) {
    row.forEach(function(el, elIndex) {
      if (el && gameBoard[currentPosition[0] + rowIndex][currentPosition[1] + elIndex]) {
        gameBoard[currentPosition[0] + rowIndex][currentPosition[1] + elIndex].locked = true;
      }
    });
  });
  PieceStore.newPiece();
};

GameStore.fullRow = function (row) {
  if (row) {
    return row.slice(1,11).every(function (el) {
      return el.locked && !!el.type;
    });
  }
};

GameStore.clearRows = function (gameBoard) {
  for (var i = 0; i < gameBoard.length; i++) {
    if (GameStore.fullRow(gameBoard[i])) {
      GameStore.clearRow(gameBoard, i);
    }
  }
};

GameStore.clearRow = function (gameBoard, idx) {
  gameBoard.splice(idx, 1);
  BoardStore.addGameBoardRowToTop(gameBoard);
  ScoreBoardActions.addLines(1);
  ScoreBoardActions.addPoints(10);
};

GameStore.fetchRowsCleared = function () {
  return _rowsCleared;
};

GameStore.fetchPoints = function () {
  return _points;
};

GameStore.updateGameBoard = function (gameBoard) {
  GameStore.wipeGameBoard(gameBoard);
  GameStore.paintGameBoard(gameBoard);
  if (BoardStore.lockedPiece(piece, currentPosition, orientation)) {
    GameStore.lockPiece(gameBoard);
  }
  GameStore.clearRows(gameBoard);
};

module.exports = GameStore;
