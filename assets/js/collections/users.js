Salesloft.Collections.Users = Backbone.Collection.extend({
    model: Salesloft.Models.Users,

    initialize: function ()
    {
      // Javascript Collection Initialization for a Users.
      // If we have to do any kind of changes to Users properties, this is where to do it.
    },

    url: function ()
    {
        // Server endpoint
        return '/user';
    }
});
