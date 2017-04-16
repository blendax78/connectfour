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


      return null;
    },

    checkForSequential(playerList) {
      var seqCount = 1;
      var last = 0;
      var start = 0;
      var result = false;

      if (_.max(playerList) - _.min(playerList) === playerList.length - 1) {
        // Return true if the list is sequential
        result = true;
      } else {
        for (var i = 0; i < playerList.length; i++) {
          if (i === 0) {
            start = i;
          } else {
            if (playerList[i] - playerList[start] === i - start) {
              seqCount++;
              if (seqCount === 4) {
                result = true;
                break;
              }
            } else {
              start = i;
              seqCount = 1;
            }
          }
        }
      }

      return result;
    },

    checkForWin: function() {
      // Checks for wins for current player.
      var playerPieces = this.pieces.where({is_selected: 1, selected_by: this.players.where({ is_active: 1 })[0].get('id')});
      var currentPlayer = this.players.where({ is_active: 1 })[0].attributes

      var horz = this.getHorz();
      var vert = this.getVert();

      if (horz.selected.length >= 4 && this.board.checkForSequential(horz.selected.pluck('y')) 
          || vert.selected.length >= 4 && this.board.checkForSequential(vert.selected.pluck('x'))) {
        this.win = true;
      } else if (currentPlayer.is_human === 1) {
        // AI's turn.
        this.board.AIChoose(horz, vert, this.currentTile);
      }
    },

    computerTurn: function()
    {
      var _this = this;
      var options = null;
      var randomTile = null;

      // Computer 'AI'
      setTimeout(function() {
        
        options = _this.pieces.where({ is_selected: 0});
        randomTile = options[Math.floor(Math.random() * 100 % options.length)];

        _this.dropTile($('#tile' + randomTile.get('id').toString())[0], true);
      }, 1000);
    }
});
