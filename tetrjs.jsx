var React = require('react');
var ReactDOM = require('react-dom');

var GameBoard = require('./js/components/gameboard');
var StoredPiece = require('./js/components/stored_piece');
var ScoreBoard = require('./js/components/score_board');
var Instructions = require('./js/components/instructions');
var Title = require('./js/components/title');
var NextPiece = require('./js/components/next_piece');

var Tetrjs = React.createClass({

  render: function () {

    return (
      <div className="tetrjs">
        <Title/>
        <section className="content group">
        <Instructions/>
        <StoredPiece/>
        <GameBoard/>
        <NextPiece/>
        </section>
      </div>
    )

  }

});

ReactDOM.render(
  <Tetrjs/>,
  document.getElementById('tetrjs')
);
