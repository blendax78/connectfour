Salesloft.Views.IndexView = Backbone.View.extend({
    // Main container for Index View
    // NOTE: Backbone Object's save() method automatically sends data back to server via REST call.

    el: '#salesloft-container',

    events: {
      'click .c4-tile': 'dropTile'
    },

    initialize: function(options)
    {
        // Set up for Index View
        // Vars: options is an object with properties necessary for this view.
        this.collection = options.collection;
        this.pieces = null;
        this.board = null;
        this.players = null;
        this.matches = new Salesloft.Collections.Matches();

        _.bindAll(this, 'render', 'dropTile', 'renderPlayer', 'computerTurn', 'checkForWin', 'checkForFall', 'getHorz', 'getVert');
        var _this = this;

        var renderArray = [
            'sync',
            'change'
        ];

        $.each(renderArray, function(index, value) {
            // Since multiple events call the render() function, we
            // cycle through an array of events in order to bind them.
            _this.collection.on(value, function() {
              _this.board = _this.collection.models[0];
              _this.pieces = _this.board.get('pieces');
              _this.players = _this.board.get('players');

              _this.render();
            });
        });

        $.each(renderArray, function(index, value) {

          _this.matches.on(value, function() {
            _this.renderMatches();
          });
        });

        this.currentTile = null;
        this.win = false;

        this.matches.fetch();
        this.collection.fetch();
    },

    renderPlayer: function()
    {
      var playerTemplate = ich.player_template({
        currentPlayer: this.players.where({ is_active: 1 })[0].attributes,
        nextPlayer: this.players.where({ is_active: 0 })[0].attributes,
        winner: this.win
      });

      $('#player-container').html(playerTemplate)
    },

    renderMatches: function()
    {
      var matchTemplate = ich.match_template({
        matches: this.matches.toJSON()
      });

      $('#matches-container').html(matchTemplate);
    },

    render: function()
    {
      // Renders ICanHaz template and adds it to DOM
      var boardTemplate = ich.game_template({
          board: this.board,
          pieces: this.pieces.getGrid()
      });

      this.renderPlayer();
      this.$el.html(boardTemplate);
    },

    dropTile: function(e, computerTurn)
    {
      // Handles event for clicking on a 'tile'

      var $elem = (e.currentTarget) ? $(e.currentTarget) : $(e);

      var currentPlayer = this.players.get(parseInt($('#currentPlayer').val()));

      if ((($elem.data() && $elem.data().selected !== 0) || (currentPlayer.get('is_human') === 0 && !computerTurn)) || this.win) {
        // Already selected
        return;
      }
      this.currentTile = this.pieces.get($elem.data().id);
      this.checkForFall();

      var nextPlayer = this.players.get(parseInt($('#nextPlayer').val()));

      $elem.data('selected', 1);

      if (currentPlayer.get('is_human') === 1) {
        this.currentTile.set('color', 'red');
      } else {
        this.currentTile.set('color', 'yellow');
      }

      this.currentTile.set('is_selected', 1);
      this.currentTile.set('selected_by', currentPlayer.get('id'));

      this.checkForWin();

      if (!this.win) {
        currentPlayer.set('is_active', 0);
        nextPlayer.set('is_active', 1);

        if (nextPlayer.get('is_human') === 0) {
          // Computer's turn.
          this.computerTurn();
        }
      } else {
        var newWinner = new Salesloft.Models.Match({ name: currentPlayer.get('name') });
        newWinner.save();
        this.matches.add(newWinner);
      }

      this.render();
    },

    checkForFall: function()
    {
      // Checks if there are any available slots below the one selected.
      var x = this.currentTile.get('x');
      var y = this.currentTile.get('y');
      var lowestTile = null;

      // Just so we don't have to search through all the available slots again.
      var col = this.collection.models[0].get('pieces').where({ x: x });
      
      if (y === 5) {
        // Bottom row. Nothing to do.
        return;
      }

      for (var i = 5; i >= 0; i--) {
        lowestTile = _.find(col, function(lower) {
          return lower.get('y') === i && lower.get('is_selected') === 0;
        });

        if (lowestTile ) {
          this.currentTile = lowestTile;
          break;
        }
      }
    },

    checkForWin: function()
    {
      this.board.checkForWin.call(this);
    },

    computerTurn: function()
    {
      this.board.computerTurn.call(this);
    },

    getHorz: function()
    {
      return {
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
    },

    getVert: function()
    {
      return {
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
    }
});
