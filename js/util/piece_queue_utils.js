var Pieces = require('./pieces_util');

var _pieceQueue = [];

var pieceQueue = {

  createPieceArray : function () {
    for (var i = 0; i < 2; i++) {
      for (var j in Pieces) {
        _pieceQueue.push(Pieces[j]);
      }
    }
    return _pieceQueue;
  },

  getPiece : function () {
    var length = _pieceQueue.length;
    var random = Math.random() * length;
    var randomInt = Math.floor(random);
    return _pieceQueue[randomInt];
  },

  returnPieceQueue : function () {
    return _pieceQueue;
  }

};

module.exports = pieceQueue;
