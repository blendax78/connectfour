Salesloft.Views.IndexView = Backbone.View.extend({
    // Main container for Index View
    // NOTE: Backbone Object's save() method automatically sends data back to server via REST call.

    el: '#salesloft-container',

    events:
    {
        // Declare DOM events for main Index View
        'click .link': 'clickLink'
    },

    initialize: function(options)
    {
        // Set up for Index View
        // Vars: options is an object with properties necessary for this view.
        this.collection = options.collection;
        _.bindAll(this, 'render', 'clickLink');
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
        // Renders ICanHaz template and adds it to DOM

        var template = ich.game_template({
            board: board,
            players: board.players.toJSON(),
            pieces: board.pieces.getGrid()
        });

        this.$el.html(template);
    },

    clickLink: function(e)
    {
        // Handles event for clicking on a URL link
        // Vars: Event object
        // e.preventDefault();

        // var $elem = $(e.currentTarget);
        // var bookmark = this.collection.get($elem.data().id);
        // var clicks = bookmark.get('click_count');

        // bookmark.set('click_count', clicks + 1);
        // bookmark.save();

        // // Open clicked URL in new tab/window.
        // window.open(bookmark.get('url'), '_blank');
    }
});
