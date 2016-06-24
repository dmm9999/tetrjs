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
    this.setState( { lines : PointsStore.fetchLines(), points : PointsStore.fetchPoints() } );
  },

  render: function () {

    return (
      <div className="scoreboard">
        <div className="lines">{this.state.lines}</div><br/>
        <div className="points">{this.state.points}</div>
      </div>
    )

  }

});

module.exports = ScoreBoard;
