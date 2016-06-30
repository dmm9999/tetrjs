var AppDispatcher = require('./../dispatcher/dispatcher');
var GameBoardConstants = require('./../constants/gameboard_constants');

var GameBoardActions = {

  moveLeft: function () {
    AppDispatcher.dispatch({
      actionType: GameBoardConstants.moves.MOVE_LEFT
    });
  },

  moveRight: function () {
    AppDispatcher.dispatch({
      actionType: GameBoardConstants.moves.MOVE_RIGHT
    });
  },

  moveDown: function () {
    AppDispatcher.dispatch({
      actionType: GameBoardConstants.moves.MOVE_DOWN
    });
  },

  hardDrop: function () {
    AppDispatcher.dispatch({
      actionType: GameBoardConstants.moves.HARD_DROP
    });
  },

  rotate: function () {
    AppDispatcher.dispatch({
      actionType: GameBoardConstants.moves.ROTATE
    });
  },

  storePiece: function () {
    AppDispatcher.dispatch({
      actionType: GameBoardConstants.moves.STORE_PIECE
    });
  },

  togglePause: function (paused) {
    AppDispatcher.dispatch({
      actionType: GameBoardConstants.moves.TOGGLE_PAUSE,
      paused : paused
    });
  },

};

module.exports = GameBoardActions;
