var React = require('react');

var Instructions = React.createClass({

  render : function () {

    return (
      <div className="instructions">
        <title className="instructions-title">How To Play</title><br/>
        <span className="instruction-line group">
        <span className="key">&larr;</span><span className="text">Move Piece Left</span>
        </span>
        <br/>
        <span className="instruction-line group">
        <span className="key">&rarr;</span><span className="text">Move Piece Right</span>
        </span>
        <br/>
        <span className="instruction-line group">
        <span className="key">&darr;</span><span className="text">Move Piece Down</span>
        </span>
        <br/>
        <span className="instruction-line group">
        <span className="key">&uarr;</span><span className="text">Rotate Piece</span>
        </span>
        <br/>
        <span className="instruction-line group">
        <span className="key space">SPACE</span><span className="text">Drop Piece</span>
        </span>
        <br/>
        <span className="instruction-line group">
        <span className="key shift">SHIFT</span><span className="text">Store Piece</span>
        </span>
        <br/>
        <span className="instruction-line group">
        <span className="key">P</span><span className="text">Pause Game</span>
        </span>
        <br/>
      </div>
    );

  }

});

module.exports = Instructions;
