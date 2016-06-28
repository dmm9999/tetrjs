var React = require('react');

var GameStore = require('./../stores/game_store');
var BoardStore = require('./../stores/board_store');
var PieceStore = require('./../stores/piece_store');
var PointsStore = require('./../stores/points_store');

var ScoreBoard = React.createClass({

  getInitialState: function () {
    return( { lines : PointsStore.fetchLines(), points : PointsStore.fetchPoints() } );
  },

  componentDidMount: function () {
    this.listener = PieceStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _onChange: function () {
    var gameBoard = GameStore.fetchGameBoard();
    gameBoard = GameStore.updateGameBoard(gameBoard);
    this.setState( { lines : gameBoard.lines, points : gameBoard.points } );
  },

  render: function () {

    var lines = "Lines: " + this.state.lines;
    var points = "Points: " + this.state.points;

    return (
      <div className="scoreboard">
        <div className="lines">{lines}</div><br/>
        <div className="points">{points}</div>
      </div>
    )

  }

});

module.exports = ScoreBoard;
