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
        _.bindAll(this, 'render', 'dropTile', 'renderPlayer');
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
      console.log('rp');
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
      var $elem = $(e.currentTarget);

      if ($elem.data() && $elem.data().selected !== '') {
        // Already selected
        return;
      }
      var tile = this.collection.models[0].get('pieces').get($elem.data().id);
      var currentPlayer = this.collection.models[0].get('players').get(parseInt($('#currentPlayer').val()));
      var nextPlayer = this.collection.models[0].get('players').get(parseInt($('#nextPlayer').val()));

      $elem.data('selected', '1');

      if (currentPlayer.get('id') === 1) {
        tile.set('color', 'red');
      } else {
        tile.set('color', 'blue');
      }

      currentPlayer.set('is_active', 0);
      nextPlayer.set('is_active', 1);

      console.log($elem.data(), currentPlayer);
      console.log(tile);
      this.render();
    }
});
