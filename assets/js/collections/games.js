Salesloft.Collections.Games = Backbone.Collection.extend({
    model: Salesloft.Models.Games,

    initialize: function ()
    {
      // Javascript Collection Initialization for a Games.
      // If we have to do any kind of changes to Games properties, this is where to do it.
    },

    url: function ()
    {
        // Server endpoint
        return '/game';
    }
});
