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

    AIChoose: function(horz, vert) {
      var pieces = this.get('pieces');
      console.log('here', pieces, horz, vert);
      return null;
    },

    checkForWin: function() {
      // Checks for wins for current player.
      var allSelected = this.pieces.where({is_selected: 1, selected_by: this.players.where({ is_active: 1 })[0].get('id')});
      var currentPlayer = this.players.where({ is_active: 1 })[0].attributes

      var horz = [];
      var vert = [];

      _.each(allSelected, function(selected) {
        if (this.currentTile.get('x') === selected.get('x')) {
          horz.push(selected);
        }

        if (this.currentTile.get('y') === selected.get('y')) {
          vert.push(selected); 
        }
      }, this);

      if (horz.length >= 4 || vert.length >= 4) {
        // This isn't ideal. It doesn't check for diagonals or sequential colors.
        this.win = true;
      } else if (currentPlayer.is_human === 1) {
        // AI's turn.
        this.board.AIChoose(horz, vert);
      }
    }
});
