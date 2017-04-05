Salesloft.Models.Piece = Backbone.Model.extend({
    initialize: function()
    {
      // Javascript Model Initialization for a Game.
      // If we have to do any kind of changes to Game properties, this is where to do it.
    },

    url: function()
    {
      // Server endpoint
        return '/game';
    }
});
