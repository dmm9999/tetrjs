var AppDispatcher = require('./../dispatcher/dispatcher');
var ScoreBoardConstants = require('./../constants/score_board_constants');

var ScoreBoardActions = {
  addPoints : function (points) {
    AppDispatcher.dispatch({
      actionType : ScoreBoardConstants.ADD_POINTS,
      points : points
    });
  },

  addLines: function (lines) {
    AppDispatcher.dispatch({
      actionType : ScoreBoardConstants.ADD_LINES,
      lines : lines
    });
  }
};

module.exports = ScoreBoardActions;
