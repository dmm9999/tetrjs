var React = require('react');
var ReactDOM = require('react-dom');

var GameBoard = require('./js/components/gameboard');
var StoredPiece = require('./js/components/stored_piece');
var ScoreBoard = require('./js/components/score_board');

var Tetrjs = React.createClass({

  render: function () {

    return (
      <div>
        <GameBoard/>
        <StoredPiece/>
        <ScoreBoard/>
      </div>
    )

  }

});

ReactDOM.render(
  <Tetrjs/>,
  document.getElementById('tetrjs')
);
