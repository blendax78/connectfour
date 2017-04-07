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
        _.bindAll(this, 'render', 'dropTile', 'renderPlayer', 'computerTurn', 'checkForWin', 'checkForFall');
        var _this = this;

        var renderArray = [
            'sync',
            'change'
        ];

        $.each(renderArray, function(index, value) {
            // Since multiple events call the render() function, we
            // cycle through an array of events in order to bind them.
            _this.collection.on(value, function() {
                _this.render();
            });
        });

        this.currentTile = null;

        this.collection.fetch();
    },

    renderPlayer: function(board)
    {
      var players = board.players;
      var playerTemplate = ich.player_template({
        currentPlayer: players.where({ is_active: 1 })[0].attributes,
        nextPlayer: players.where({ is_active: 0 })[0].attributes
      });

      $('#player-container').html(playerTemplate)
    },

    render: function()
    {
      var board = this.collection.models[0].toJSON();

      // Renders ICanHaz template and adds it to DOM
      var boardTemplate = ich.game_template({
          board: board,
          pieces: board.pieces.getGrid()
      });

      this.renderPlayer(board);
      this.$el.html(boardTemplate);
    },

    dropTile: function(e, computerTurn)
    {
      // Handles event for clicking on a 'tile'

      var $elem = (e.currentTarget) ? $(e.currentTarget) : $(e);

      var currentPlayer = this.collection.models[0].get('players').get(parseInt($('#currentPlayer').val()));

      if (($elem.data() && $elem.data().selected !== 0) || (currentPlayer.get('is_human') === 0 && !computerTurn)) {
        // Already selected
        return;
      }
      this.currentTile = this.collection.models[0].get('pieces').get($elem.data().id);
      this.checkForFall();

      var nextPlayer = this.collection.models[0].get('players').get(parseInt($('#nextPlayer').val()));

      $elem.data('selected', 1);

      if (currentPlayer.get('is_human') === 1) {
        this.currentTile.set('color', 'red');
      } else {
        this.currentTile.set('color', 'yellow');
      }

      this.currentTile.set('is_selected', 1);

      currentPlayer.set('is_active', 0);
      nextPlayer.set('is_active', 1);

      if (nextPlayer.get('is_human') === 0) {
        // Computer's turn.
        this.computerTurn();
      }

      this.render();
    },

    checkForFall: function()
    {
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
      // Checks for wins.
    },

    computerTurn: function()
    {
      var _this = this;
      var options = null;
      var randomTile = null;

      // Computer 'AI'
      setTimeout(function() {
        options = _this.collection.models[0].get('pieces').where({ is_selected: 0});
        randomTile = options[Math.floor(Math.random() * 100 % options.length)];

        _this.dropTile($('#tile' + randomTile.get('id').toString())[0], true);
      }, 1000);
    }
});
