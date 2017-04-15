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
      // Need to check for a sequence of numbers (different function?), then check for an empty space before or
      // after sequence.

      console.log(horz, vert);

      return null;
    },

    checkForWin: function() {
      // Checks for wins for current player.
      var playerPieces = this.pieces.where({is_selected: 1, selected_by: this.players.where({ is_active: 1 })[0].get('id')});
      var currentPlayer = this.players.where({ is_active: 1 })[0].attributes

      var horz = {
        selected: new Salesloft.Collections.Pieces(
          this.pieces.where({is_selected: 1, x: this.currentTile.get('x'), selected_by: this.players.where({ is_active: 1 })[0].get('id')})
        ),
        empty: new Salesloft.Collections.Pieces(
          this.pieces.where({is_selected: 0, x: this.currentTile.get('x')})
        )
      };

      var vert = {
        selected: new Salesloft.Collections.Pieces(
          this.pieces.where({is_selected: 1, y: this.currentTile.get('y'), selected_by: this.players.where({ is_active: 1 })[0].get('id')})
        ),
        empty: new Salesloft.Collections.Pieces(
          this.pieces.where({is_selected: 0, y: this.currentTile.get('y')})
        )
      };

      if (horz.selected.models.length >= 4 || vert.selected.models.length >= 4) {
        // This isn't ideal. It doesn't check for diagonals or sequential colors.
        this.win = true;
      } else if (currentPlayer.is_human === 1) {
        // AI's turn.
        this.board.AIChoose(horz, vert, this.currentTile);
      }
    }
});
