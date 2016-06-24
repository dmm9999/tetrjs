var React = require('react');

var PieceStore = require('./../stores/piece_store');
var BoardStore = require('./../stores/board_store');

var StoredPiece = React.createClass({

    getInitialState: function () {
      return ( { piece : PieceStore.fetchStoredPiece(), grid : BoardStore.createStoredPieceGrid() } );
    },

    componentDidMount: function () {
      this.listener = PieceStore.addListener(this._onChange);
    },

    componentWillUnmount: function () {
      this.listener.remove();
    },

    _onChange: function () {
      this.setState( { piece : PieceStore.fetchStoredPiece() } );
    },

    render: function () {

      var piece = this.state.piece;
      var grid = this.state.grid;

      var rows, row;

      if (piece) {
        rows = piece[0].map(function(row, rowIndex) {

        row =  row.map(function(el, elIndex) {
            if (!el) {
              var className = "block";
            } else {
              var className = "block" + " " + piece.type;
            }
            return <td key={elIndex} className={className}></td>
          });
          return <tr key={rowIndex}>
                  {row}
                 </tr>
        })
      } else {
        rows = [0,1,2,3].map(function(row, rowIndex) {

        row =  [0,1,2,3].map(function(el, elIndex) {

              return <td key={elIndex} className="block"></td>
          });
          return <tr key={rowIndex}>
                  {row}
                 </tr>
          })
      }

    return (
      <table className="storedpiece">
        <tbody>
          {rows}
        </tbody>
      </table>
    );

  }

});

module.exports = StoredPiece;
