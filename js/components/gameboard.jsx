var React = require('react');

var GameBoardConstants = require('./../constants/gameboard_constants');
var GameStore = require('./../stores/game_store');
var GameBoardActions = require('./../actions/gameboard_actions');
var PieceStore = require('./../stores/piece_store');
var BoardStore = require('./../stores/board_store');
var PointsStore = require('./../stores/points_store');
var PieceQueue = require('./../util/piece_queue_utils');

var GameBoard = React.createClass({

  getInitialState: function () {
    return( { currentBoardState : GameStore.fetchGameBoard(), paused : true });
  },

  componentDidMount: function () {
    this.gameStoreListener = GameStore.addListener(this._onChange);
    this.pieceStoreListener = PieceStore.addListener(this._onChange);
    PieceQueue.createPieceArray();
    this.togglePause(this.state.paused);
  },

  componentWillUnmount: function () {
    this.gameStoreListener.remove();
    this.pieceStoreListener.remove();
  },

  _onChange: function () {
    var gameBoard = GameStore.fetchGameBoard();
    gameBoard = GameStore.updateGameBoard(gameBoard);
    this.setState( { currentBoardState : GameStore.fetchGameBoard() } )
  },

  togglePause: function (paused) {
    if (paused) {
      this.falling = setInterval(GameBoardActions.moveDown, 1000);
      document.removeEventListener("keyup", this.onPause);
      this.keyListener = document.addEventListener("keyup", this.onKeyPress);
      this.setState( { paused : false } );
    } else {
      clearInterval(this.falling);
      document.removeEventListener("keyup", this.onKeyPress);
      this.pauseListener = document.addEventListener("keyup", this.onPause);
      this.setState( { paused : true } )
    }
  },

  onKeyPress: function (e) {
    e.preventDefault();
    switch(e.code) {
      case "ArrowLeft":
        GameBoardActions.moveLeft();
        break;
      case "ArrowRight":
        GameBoardActions.moveRight();
        break;
      case "ArrowDown":
        GameBoardActions.moveDown();
        break;
      case "ArrowUp":
        GameBoardActions.rotate();
        break;
      case "Space":
        GameBoardActions.hardDrop();
        break;
      case "ShiftRight":
        GameBoardActions.storePiece();
        break;
      case "KeyP":
        this.togglePause(this.state.paused);
        break;
    }
  },

  onPause: function (e) {
    e.preventDefault();
    switch(e.code) {
    case "KeyP":
      this.togglePause(this.state.paused);
      break;
    }
  },

  render: function () {

    var rows = this.state.currentBoardState.map(function(row, i) {

      var row = row.map(function(el, j) {

        if (el.empty && !el.locked) {
          var className = "block";
        } else if (el.empty && el.locked) {
          var className = "";
        } else {
          var className = "block" + " " + el.type;
        }
        return (
          <td key={j} className={className}></td>
        );
      });

    return <tr key={i}>
            {row}
           </tr>
    });

    return (
      <table className="gameboard">
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

});

module.exports = GameBoard;
