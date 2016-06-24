var Store = require('flux/utils').Store;
var AppDispatcher = require('./../dispatcher/dispatcher');
var GameBoardConstants = require('./../constants/gameboard_constants');

var BoardStore = new Store(AppDispatcher);

BoardStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "":
      break;
  }
};

BoardStore.createGameBoard = function () {
  var gameboardRows = Array(GameBoardConstants.GAMEBOARD_HEIGHT);
  for (var i = 0; i < gameboardRows.length; i++) {
    gameboardRows[i] = _createGameBoardRow();
  }
  gameboardRows[gameboardRows.length] = _createGameBoardLockedRow();
  return gameboardRows;
};

_createGameBoardRow = function () {
  var gameBoardRow = Array(GameBoardConstants.GAMEBOARD_WIDTH);
  console.log('row created');
  for (var i = 0; i < 10; i++) {
    gameBoardRow[i] = {empty: true, type: "", locked: false};
  }
  gameBoardRow.unshift({empty: true, type: "", locked: true});
  gameBoardRow.push({empty: true, type: "", locked: true});
  return gameBoardRow;
};

BoardStore.addGameBoardRowToTop = function (gameBoard) {
  gameBoard.unshift(_createGameBoardRow());
  console.log('replacement row added');
};

_createGameBoardLockedRow = function () {
  var gameBoardLockedRow = Array(GameBoardConstants.GAMEBOARD_WIDTH);
  console.log('locked row created');
  for (var i = 0; i < 12; i++) {
    gameBoardLockedRow[i] = {empty: true, type: "", locked: true};
  }
  return gameBoardLockedRow;
};

var _gameBoard = BoardStore.createGameBoard();

BoardStore.validPosition = function (piece, position, orientation) {
  for (var i = 0; i < piece[orientation].length; i++) {
    for (var j = 0; j < piece[orientation][i].length; j++) {
      if (piece[orientation][i][j] &&
          !!_gameBoard[position[0] + i][position[1] + j] &&
          _gameBoard[position[0] + i][position[1] + j].locked) {
            console.log('invalid 1');
            return false;
      } else if (piece[orientation][i][j] &&
                !!_gameBoard[position[0] + i][position[1] + j] &&
                _gameBoard[position[0] + i][position[1] + j].locked) {
                  console.log('invalid 3');
            return false;
      }
    }
  }
  return true;
};

BoardStore.lockedPiece = function (piece, position, orientation) {
  for (var i = 0; i < piece.length; i++) {
    for (var j = 0; j < piece[i].length; j++) {
      if (piece[i][j] &&
          _gameBoard[position[0] + i + 1][position[1] + j] &&
          _gameBoard[position[0] + i + 1][position[1] + j].locked) {
          return true;
      }
    }
  }
  return false;
};

BoardStore.fetchGameBoard = function () {
  return _gameBoard;
};

_createStoredPieceRow = function () {
  var row = Array(4);

  for (var i = 0; i < row; i++) {
    row[i] = {empty: true, type: "", locked: false};
  }

  return row;
};

BoardStore.createStoredPieceGrid = function () {
  var grid = Array(4);

  for (var i = 0; i < grid; i++) {
    grid[i] = _createStoredPieceRow();
  }

  return grid;
};

var _storedPieceGrid = BoardStore.createStoredPieceGrid();

BoardStore.fetchedStoredPiece = function () {
  return _storedPieceGrid;
};

module.exports = BoardStore;
