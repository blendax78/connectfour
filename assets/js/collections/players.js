Salesloft.Collections.Players = Backbone.Collection.extend({
    model: Salesloft.Models.Player,

    initialize: function ()
    {
      // Javascript Collection Initialization for a Users.
      // If we have to do any kind of changes to Users properties, this is where to do it.
    },

    url: function ()
    {
        // Server endpoint
        return '/player';
    }
});
