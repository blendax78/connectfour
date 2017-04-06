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
        _.bindAll(this, 'render', 'dropTile', 'renderPlayer', 'checkTiles', 'computerTurn');
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

    dropTile: function(e)
    {
      // Handles event for clicking on a 'tile'
      var $elem = (e.currentTarget) ? $(e.currentTarget) || $(e);
      var currentPlayer = this.collection.models[0].get('players').get(parseInt($('#currentPlayer').val()));

      if (($elem.data() && $elem.data().selected !== 0) || currentPlayer.get('is_human') === 0) {
        // Already selected
        return;
      }
      var tile = this.collection.models[0].get('pieces').get($elem.data().id);
      var nextPlayer = this.collection.models[0].get('players').get(parseInt($('#nextPlayer').val()));

      $elem.data('selected', 1);

      if (currentPlayer.get('is_human') === 1) {
        tile.set('color', 'red');
      } else {
        tile.set('color', 'yellow');
      }

      tile.set('is_selected', 1);

      currentPlayer.set('is_active', 0);
      nextPlayer.set('is_active', 1);

      if (nextPlayer.get('is_human') === 0) {
        // Computer's turn.
        this.computerTurn();
      }

      this.render();
    },

    checkTiles: function()
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

        _this.dropTile(randomTile.get('id').toString())[0];
      }, 1000);
    }
});
