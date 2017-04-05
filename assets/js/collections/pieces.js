Salesloft.Collections.Pieces = Backbone.Collection.extend({
    model: Salesloft.Models.Pieces,

    initialize: function ()
    {
      // Javascript Collection Initialization for a Pieces.
      // If we have to do any kind of changes to Pieces properties, this is where to do it.
    },

    url: function ()
    {
        // Server endpoint
        return '/piece';
    }
});
