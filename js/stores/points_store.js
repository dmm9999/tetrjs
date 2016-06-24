var Store = require('flux/utils').Store;
var AppDispatcher = require('./../dispatcher/dispatcher');
var ScoreBoardConstants = require('./../constants/score_board_constants');

var PointsStore = new Store(AppDispatcher);

var _points = 0,
    _lines = 0;

PointsStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "ADD_POINTS":
      _addPoints(payload.points);
      PointsStore.__emitChange();
      break;
    case "ADD_LINES":
      _addLines(payload.lines);
      PointsStore.__emitChange();
      break;
  }
};

_addPoints = function (points) {
  return _points + points;
};

_addLines = function (lines) {
  return _lines + lines;
};

PointsStore.fetchLines = function () {
  return _lines;
};

PointsStore.fetchPoints = function () {
  return _points;
};

module.exports = PointsStore;
