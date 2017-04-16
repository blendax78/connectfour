Salesloft.Models.Game = Backbone.Model.extend({
    initialize: function()
    {
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
      var newTile = null;
      var horz = this.getHorz();
      var vert = this.getVert();

      // Computer 'AI'
      setTimeout(function() {

        if ((horz.empty.length > 0 && horz.opponent.length > 1 && _this.board.checkForSequential(horz.opponent.pluck('y'))) 
          || (vert.empty.length > 0 && vert.opponent.length > 1 && _this.board.checkForSequential(vert.opponent.pluck('x')))) {
          options = (horz.opponent.length > vert.opponent.length) ? options = horz.empty.where({ is_selected: 0}) : vert.empty.where({ is_selected: 0});;
        } else {
          options = _this.pieces.where({ is_selected: 0});
        }

        newTile = options[Math.floor(Math.random() * 100 % options.length)];

        if (newTile && newTile.get)
        _this.dropTile($('#tile' + newTile.get('id').toString())[0], true);
      }, 1000);
    }
});
