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
        _.bindAll(this, 'render', 'dropTile');
        var _this = this;

        var renderArray = [
            'sync',
            'change',
            'remove'
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

    render: function()
    {
      var board = this.collection.models[0].toJSON();
      var players = board.players;

      // Renders ICanHaz template and adds it to DOM
      var playerTemplate = ich.player_template({
        currentPlayer: players.where({ is_active: 1 })[0].attributes,
        nextPlayer: players.where({ is_active: 0 })[0].attributes
      });

      var boardTemplate = ich.game_template({
          board: board,
          pieces: board.pieces.getGrid()
      });

      $('#player-container').html(playerTemplate)
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
      console.log($elem.data());
      console.log(tile);
      // var clicks = bookmark.get('click_count');

    }
});
