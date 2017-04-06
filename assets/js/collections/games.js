Salesloft.Collections.Games = Backbone.Collection.extend({
    model: Salesloft.Models.Game,

    initialize: function ()
    {
      // Javascript Collection Initialization for a Games.
      // If we have to do any kind of changes to Games properties, this is where to do it.
    },

    url: function ()
    {
        // Server endpoint
        return '/game';
    },

    parse: function(response) {
        var pieces = new Salesloft.Collections.Pieces(response.board.pieces);
        var players = new Salesloft.Collections.Players(response.players);

        var game = new Salesloft.Models.Game(response.board);
        game.set('pieces', pieces);
        game.set('players', players);

        return game;
    }
});
