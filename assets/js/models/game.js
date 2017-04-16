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

      // console.log(horz, vert);

      return null;
    },

    checkForSequential(playerList, opponentList) {
      var seqCount = 1;
      var last = 0;
      var start = 0;

      if (_.max(playerList) - _.min(playerList) === playerList.length - 1) {
        // Return true if the list is sequential
        result = true;
      } else {
        for (var i = 0; i < playerList.length; i++) {
          if (i === 0) {
            start = i;
            console.log('36', seqCount, playerList[i]);
            console.log('37', playerList[i], playerList[start], playerList[i] - playerList[start], i - start, i - start > 0 && playerList[i] - playerList[start] === i - start);
          } else {
            if (playerList[i] - playerList[start] === i - start) {
              seqCount++;
              // if (seqCount === 4)
              console.log('42', seqCount, playerList[i]);
              console.log('43', playerList[i], playerList[start], playerList[i] - playerList[start], i - start, i - start > 0 && playerList[i] - playerList[start] === i - start);
            } else {
              console.log('44', seqCount, playerList[i]);
              console.log('45', playerList[i], playerList[start], playerList[i] - playerList[start], i - start, i - start > 0 && playerList[i] - playerList[start] === i - start);
              start = i;
              seqCount = 1;
            }
          }
        }
        // $.each(playerList,
        //   // _.sortBy(
        //     // _.union(playerList, opponentList), function(num) {
        //     //   // Sort the combined lists
        //     //   return num;
        //     // }), 
        //   function(index, pos) {
        //     console.log('pos', index, pos, last, pos - last);
        //     if (index > 0 && pos - last === 1) {
        //       console.log('42');
        //       // Is sequential
        //       seqCount++;
        //       result = true;
        //     } else if (index > 0 && pos - last !== 1) {
        //       console.log('47');
        //       // Not sequential
        //       seqCount = 1;
        //     } else {
        //       seqCount = 1;
        //     }

        //     last = pos;

        //     if (seqCount === 4) {
        //       result = true;
        //       // break from loop
        //       return false;
        //     }
        //     console.log('seqCount', seqCount, result);
        // });
      }
      // return { p: playerList, o: opponentList};
      return result;
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
        ),
        opponent: new Salesloft.Collections.Pieces(
          this.pieces.where({is_selected: 1, x: this.currentTile.get('x'), selected_by: this.players.where({ is_active: 0 })[0].get('id')})
        )
      };

      var vert = {
        selected: new Salesloft.Collections.Pieces(
          this.pieces.where({is_selected: 1, y: this.currentTile.get('y'), selected_by: this.players.where({ is_active: 1 })[0].get('id')})
        ),
        empty: new Salesloft.Collections.Pieces(
          this.pieces.where({is_selected: 0, y: this.currentTile.get('y')})
        ),
        opponent: new Salesloft.Collections.Pieces(
          this.pieces.where({is_selected: 1, y: this.currentTile.get('y'), selected_by: this.players.where({ is_active: 0 })[0].get('id')})
        )
      };

      if (currentPlayer.id === 1) {
        console.log('horz');
        this.board.checkForSequential(horz.selected.pluck('y'), horz.opponent.pluck('y'));
        console.log('vert');
        this.board.checkForSequential(vert.selected.pluck('x'), horz.opponent.pluck('x'));
      }

      if (horz.selected.length >= 4 || vert.selected.length >= 4) {
        // This isn't ideal. It doesn't check for diagonals or sequential colors.
        // this.win = true;
      } else if (currentPlayer.is_human === 1) {
        // AI's turn.
        this.board.AIChoose(horz, vert, this.currentTile);
      }
    }
});
