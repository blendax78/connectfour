Salesloft.Models.Game = Backbone.Model.extend({
    initialize: function()
    {
      // Javascript Model Initialization for a Game.
      // If we have to do any kind of changes to Game properties, this is where to do it.
      // var pieces = new Salesloft.Collections.Players(this.get('players'))
    },

    url: function()
    {
      // Server endpoint
        return '/game';
    },

    AIChoose: function(horz, vert, currentTile) {
      var pieces = this.get('pieces');

      console.log(horz, vert);
      // Convert to backbone objects.
      // horz = new Salesloft.Collections.Pieces(horz);
      // vert = new Salesloft.Collections.Pieces(vert);
      // console.log('here', pieces, horz.pluck('y'), vert.pluck('x'), currentTile);
      return null;
    },

    checkForWin: function() {
      // Checks for wins for current player.
      var playerPieces = this.pieces.where({is_selected: 1, selected_by: this.players.where({ is_active: 1 })[0].get('id')});
      var currentPlayer = this.players.where({ is_active: 1 })[0].attributes

      // var horz = { selected: [], empty: [] };
      // var vert = { selected: [], empty: [] };

      // _.each(playerPieces, function(playerPiece) {
        // if (this.currentTile.get('x') === playerPiece.get('x') && playerPiece.get('is_selected') === 1) {
        //   horz.selected.push(playerPiece);
        // }

      //   if (this.currentTile.get('y') === playerPiece.get('y')) {
      //     vert.selected.push(playerPiece); 
      //   } else if (this.currentTile.get('y') === playerPiece.get('y') && playerPiece.get('is_selected') === 0) {
      //     vert.empty.push(playerPiece);
      //   }

      // }, this);

      var horz = {
        selected: this.pieces.where({is_selected: 1, x: this.currentTile.get('x'), selected_by: this.players.where({ is_active: 1 })[0].get('id')}),
        empty: this.pieces.where({is_selected: 0, x: this.currentTile.get('x')})
      };

      var vert = {
        selected: this.pieces.where({is_selected: 1, y: this.currentTile.get('y'), selected_by: this.players.where({ is_active: 1 })[0].get('id')}),
        empty: this.pieces.where({is_selected: 0, y: this.currentTile.get('y')})
      };

      if (horz.selected.length >= 4 || vert.selected.length >= 4) {
        // This isn't ideal. It doesn't check for diagonals or sequential colors.
        this.win = true;
      } else if (currentPlayer.is_human === 1) {
        // AI's turn.
        this.board.AIChoose(horz, vert, this.currentTile);
      }
    }
});
